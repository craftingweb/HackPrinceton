const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = 5002;
const apiKey = process.env.API_KEY;

// Enable CORS for frontend to run locally to uncomment this
app.use(cors({ origin: "http://localhost:5173" }));
// to run on production to uncomment this one
// app.use(cors({ origin: "https://urgen-tcare.netlify.app" }));

// Helper function to calculate total open hours per day
const calculateOpenHours = (opening_hours) => {
  if (!opening_hours?.periods) return "Hours not available";

  // Check if it's open 24/7
  if (
    opening_hours.open_now &&
    opening_hours.periods.length === 1 &&
    opening_hours.periods[0].close === undefined
  ) {
    return "24 hours";
  }

  const hoursPerDay = opening_hours.periods.map((period) => {
    const open = new Date(
      `1970-01-01T${period.open.time.slice(0, 2)}:${period.open.time.slice(
        2
      )}:00`
    );
    const close = new Date(
      `1970-01-01T${period.close.time.slice(0, 2)}:${period.close.time.slice(
        2
      )}:00`
    );

    const hoursOpen = (close - open) / (1000 * 60 * 60); // Convert milliseconds to hours
    return `${hoursOpen} hours`;
  });

  // Return hours open for the first day or an average if desired
  return hoursPerDay[0];
};

// Main route to fetch nearby urgent care facilities with details, distance, and image information
app.get("/api/nearbyUrgentCares", async (req, res) => {
  const { latitude, longitude } = req.query;
  const location = `${latitude},${longitude}`;
  const radius = 5000;
  const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&keyword=urgent%20care&type=hospital&key=${apiKey}`;

  try {
    // Step 1: Fetch nearby urgent care facilities
    const nearbyResponse = await axios.get(nearbyUrl);
    const hospitals = nearbyResponse.data.results;

    // Step 2: Fetch additional details (phone, address, hours) and distance info for each facility
    const hospitalDataPromises = hospitals.map(async (hospital) => {
      const placeId = hospital.place_id;

      // Place Details API
      const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_phone_number,formatted_address,opening_hours,photos&key=${apiKey}`;
      const placeDetailsResponse = await axios.get(placeDetailsUrl);
      const placeDetails = placeDetailsResponse.data.result;

      // Distance Matrix API
      const destination = `${hospital.geometry.location.lat},${hospital.geometry.location.lng}`;
      const distanceMatrixUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${location}&destinations=${destination}&key=${apiKey}`;
      const distanceMatrixResponse = await axios.get(distanceMatrixUrl);
      const distanceInfo = distanceMatrixResponse.data.rows[0].elements[0];

      // Photo URL (if available)
      const photoReference = placeDetails.photos?.[0]?.photo_reference;
      const photoUrl = photoReference
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`
        : null;

      // Calculate open hours
      const openHours = calculateOpenHours(placeDetails.opening_hours);

      // Combine the data
      return {
        id: placeId,
        name: hospital.name,
        location: hospital.geometry.location,
        icon: hospital.icon, // Icon from the Nearby Search API
        image: photoUrl || hospital.icon, // Use photo URL if available, else fallback to icon
        rating: hospital.rating,
        user_ratings_total: hospital.user_ratings_total,
        address: placeDetails.formatted_address || "Address not available",
        phone: placeDetails.formatted_phone_number || "Not available",
        open_now: placeDetails.opening_hours?.open_now ?? false,
        open_hours: openHours, // Total open hours per day
        distance: distanceInfo.distance.text, // Distance in preferred units
        duration: distanceInfo.duration.text, // Travel time
      };
    });

    // Wait for all promises to resolve
    const detailedHospitalData = await Promise.all(hospitalDataPromises);

    // Send the combined data back to the frontend
    res.json(detailedHospitalData);
  } catch (error) {
    console.error("Error fetching hospital data:", error.message);
    res.status(500).json({ error: "Failed to fetch hospital data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
