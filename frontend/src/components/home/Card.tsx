/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  FaClock,
  FaDirections,
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import CustomModal from "../shared/CustomModal";
import { UrgentCareFacility } from "../../interfaces";
import { GiPathDistance } from "react-icons/gi";
import { MdAddHomeWork } from "react-icons/md";
import { TbCar } from "react-icons/tb";

interface ISelectedMonth {
  id: string;
  waitTime: number;
}
export const Card = ({
  data,
  destinationLat,
  destinationLon,
}: {
  data: UrgentCareFacility;
  destinationLat: number;
  destinationLon: number;
}) => {
  const [selectedTimes, setSelectedTimes] = useState<ISelectedMonth[]>(
    JSON.parse(localStorage.getItem("item") || "[]")
  );
  const [sTime, setTime] = useState<number | null>(30);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(selectedTimes));
  }, [selectedTimes]);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleSubmit = (time: number, id: string) => {
    if (id && time) {
      setSelectedTimes((prev) => {
        const exists = prev.some((t) => t.id === id);

        if (exists) {
          // Update the existing item with the new time
          return prev.map((t) => (t.id === id ? { ...t, waitTime: time } : t));
        } else {
          // Add new item if it doesn't exist
          return [...prev, { id, waitTime: time }];
        }
      });

      setIsOpen(false);
      setTime(null);
    }
  };

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${destinationLat},${destinationLon}`;
    window.open(url, "_blank"); // Opens Google Maps in a new tab
  };

  return (
    <div className="w-auto bg-white border border-gray-200 rounded-3xl ">
      <div className="overflow-hidden bg-cover bg-no-repeat rounded-t-3xl max-h-[350px] w-full object-cover">
        <img
          className="rounded-t-3xl hover:brightness-75 transition-all ease-in-out duration-500 hover:scale-110"
          src={
            data?.image
              ? data?.image
              : "https://img.freepik.com/free-photo/clinical-reception-with-waiting-room-facility-lobby-registration-counter-used-patients-with-medical-appointments-empty-reception-desk-health-center-checkup-visits_482257-51247.jpg"
          }
          alt={data.name || "Clinic"}
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-teal-500">{data.name}</h2>

        <div className="flex items-center mt-2">
          <p className="text-gray-700 font-semibold">{data.rating}</p>
          <div className="flex ml-2">
            {Array.from({ length: 5 }, (_, index) =>
              index < Math.floor(data.rating || 0) ? (
                <FaStar key={index} className="text-yellow-400" />
              ) : (
                <FaStarHalfAlt key={index} className="text-gray-300" />
              )
            )}
          </div>
          <p className="text-gray-600 ml-2">({data.user_ratings_total})</p>
        </div>

        <div className="flex items-center mt-4">
          <FaMapMarkerAlt className="text-teal-500 text-lg mr-2" />
          <p className="text-gray-600 text-sm">{data.address}</p>
        </div>

        <div className="flex items-center mt-2">
          <FaClock className="text-teal-500 mr-2" />
          <p className="text-gray-600 text-sm">
            Open {data?.open_hours}{" "}
            <span
              className={`${
                data.open_now ? "bg-green-500" : "bg-red-500"
              } text-[10px] text-white p-1 rounded-md`}
            >
              {data.open_now ? "Open Now" : "Closed"}
            </span>
          </p>
        </div>

        {/* Contact */}
        <div className="flex items-center mt-2">
          <FaPhone className="text-teal-500 mr-2" />
          <a
            href={`tel:${data.phone}`}
            className="text-teal-600 hover:underline text-sm"
          >
            {data.phone || "Not available"}
          </a>
        </div>

        <div className="flex items-center mt-2">
          <FaClock className="text-teal-500 mr-2" />
          <p className="text-gray-600 text-sm">
            Wait Time:{" "}
            {selectedTimes.length > 0
              ? selectedTimes.find((t) => t.id === data.id)?.waitTime ?? sTime
              : sTime}{" "}
            min
          </p>
        </div>

        <div className="flex items-center mt-2">
          <TbCar className="text-teal-500 mr-1 text-xl" />
          <p className="text-gray-600 text-sm">
            Driving Time: {data?.duration}
          </p>
        </div>

        <div className="flex items-center mt-2">
          <MdAddHomeWork className="text-teal-500 mr-2" />
          <p className="text-gray-600 text-sm">
            Total Time:{" "}
            <span className="bg-lime-500 text-white text-xs p-1 rounded-md">
              {selectedTimes.length > 0
                ? (selectedTimes.find((t) => t.id === data.id)?.waitTime ?? 0) +
                  (data.duration ? Number(data.duration.split(" ")[0]) : 0)
                : (sTime as number) + Number(data.duration.split(" ")[0])}
              min
            </span>
          </p>
        </div>

        <div className="flex items-center mt-2">
          <GiPathDistance className="text-teal-500 text-lg mr-2" />
          <p className="text-gray-600 text-sm">
            {data?.distance?.split(" ")[0]} miles
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClick}
            className="mt-4 w-full flex items-center justify-center gap-1.5 bg-teal-500 text-white py-2 rounded-lg shadow-md hover:bg-teal-600 transition-all duration-300 font-semibold"
          >
            Live wait
          </button>
          <button
            onClick={handleGetDirections}
            className="mt-4 w-full flex items-center justify-center gap-1.5 bg-teal-500 text-white py-2 rounded-lg shadow-md hover:bg-teal-600 transition-all duration-300 font-semibold"
          >
            Get Directions <FaDirections className="text-xl" />
          </button>
        </div>
      </div>
      {/* Open Modal  */}
      <CustomModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        header={<div></div>}
        modalContent={
          <div className="max-w-[400px] w-full h-fit px-10">
            <h2 className="text-center text-xl font-bold text-teal-500">
              What is a wait time?
            </h2>
            <p className="text-center text-teal-400 mb-5">(in minutes)</p>
            <div className="grid grid-cols-4 gap-4">
              {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120].map((d) => (
                <div
                  key={d}
                  onClick={() => setTime(d)}
                  className={`${
                    sTime === d
                      ? "bg-teal-500 text-white"
                      : "bg-white text-teal-500"
                  } border border-teal-400 text-teal-500 p-3 rounded-lg text-center hover:bg-teal-500 hover:text-white transition-all duration-300 cursor-pointer`}
                >
                  {d}
                </div>
              ))}
            </div>
          </div>
        }
        footer={
          <div className="flex items-center gap-3 mt-5 justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="px-6 font-semibold py-2 border border-teal-300 rounded-xl shadow text-teal-500"
            >
              Close
            </button>
            <button
              onClick={() => handleSubmit(sTime as number, data?.id as string)}
              className="px-6 font-semibold py-2 border border-teal-300 rounded-xl shadow text-white bg-teal-500"
            >
              Submit
            </button>
          </div>
        }
      />
    </div>
  );
};
