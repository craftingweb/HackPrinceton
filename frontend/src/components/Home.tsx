/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Card } from "./home/Card";
import { HeroSection } from "./home/Hero";
import SearchBox from "./home/SearchBox";
import { IHomeProps, UrgentCareFacility } from "../interfaces";
import { CardSkeleton } from "./shared/CardSkeleton";
import { FaQuestionCircle } from "react-icons/fa";

function Home() {
  const [location, setLocation] = useState<IHomeProps>({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [hospitals, setHospitals] = useState<UrgentCareFacility[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  console.log(error);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchNearbyHospitals(latitude, longitude);
        },
        (error) => {
          setError(error.message);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);
  // https://server-o1cq.onrender.com  -- for the live
  // http://localhost:5002 -- for the local
  const fetchNearbyHospitals = async (latitude: number, longitude: number) => {
    const url = `http://localhost:5002/api/nearbyUrgentCares?latitude=${latitude}&longitude=${longitude}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      setHospitals(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hospital data:", error);
      setError("Failed to fetch hospital data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="h-[500px] md:h-[600px] px-4 md:px-8 bg-gradient-to-r from-teal-100 via-teal-50 to-teal-100 rounded-ee-3xl rounded-es-3xl">
        <HeroSection />
      </div>
      <div className="min-h-[500px] my-20 px-4 md:px-8">
        <section className="h-full w-full mt-10">
          <SearchBox />
        </section>
        {loading ? (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 6 }, (_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : hospitals.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {hospitals.map((d) => (
              <Card
                key={d?.id}
                data={d}
                destinationLat={location?.latitude as number}
                destinationLon={location.longitude as number}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5 h-96">
            <FaQuestionCircle size={60} className="text-gray-400" />
            <p className="text-gray-400">Not found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
