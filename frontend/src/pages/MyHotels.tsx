import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/models/hotel";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const MyHotels = () => {
  const [hotelData, setHotelData] = useState<HotelType[]>();
  const [error, setError] = useState<string>("");

  async function getMyHotels() {
    try {
      const response = await fetch(`${SERVER_BASE_URL}/api/my-hotels`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`An error occurred while loading the hotels`);
      }

      const data = await response.json();
      setHotelData(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  useEffect(() => {
    getMyHotels();
  }, []);

  if (!hotelData) {
    return (
      <div className="flex justify-center">
        {error && (
          <div className="rounded p-2 text-white font-bold bg-red-500 text-center">
            {error}
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="space-y-5 mb-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold text-sky-700">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex justify-center items-center h-10 bg-sky-800 text-white px-3 font-bold rounded hover:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-800"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-between border border-sky-800 rounded-lg p-8 gap-5"
            >
              <h2 className="text-2xl font-bold text-sky-700">{hotel.name}</h2>
              <div className="whitespace-pre-line">{hotel.description}</div>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-2">
                <div className="border border-sky-800 rounded-sm p-3 flex items-center justify-center">
                  <span className="mr-1">📍</span>
                  {hotel.city}, {hotel.country}
                </div>
                <div className="border border-sky-800 rounded-sm p-3 flex items-center justify-center">
                  <span className="mr-1">🏨</span>
                  {hotel.type}
                </div>
                <div className="border border-sky-800 rounded-sm p-3 flex items-center justify-center">
                  <span className="mr-1">💸</span>${hotel.pricePerNight} per
                  night
                </div>
                <div className="border border-sky-800 rounded-sm p-3 flex items-center justify-center">
                  <span className="mr-1 pb-1">🛏</span>
                  {hotel.adultCount} adults, {hotel.childCount} children
                </div>
                <div className="border border-sky-800 rounded-sm p-3 flex items-center justify-center">
                  <span className="mr-1">⭐</span>
                  {hotel.rating} Star Rating
                </div>
              </div>
              <span className="flex justify-end">
                <Link
                  to={`/edit-hotel/${hotel._id}`}
                  className="flex justify-center items-center h-10 bg-sky-800 text-white px-3 font-bold rounded hover:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-800"
                >
                  View Details
                </Link>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyHotels;
