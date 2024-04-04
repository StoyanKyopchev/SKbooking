import { useState, useEffect } from "react";
import { HotelType } from "../../../backend/src/models/hotel";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const Home = () => {
  const [error, setError] = useState<string>("");
  const [hotelData, setHotelData] = useState<HotelType[]>();

  async function fetchHotels() {
    try {
      const response = await fetch(`${SERVER_BASE_URL}/api/hotels`);

      if (!response.ok) {
        throw new Error("Error fetching hotels");
      }

      const data: HotelType[] = await response.json();
      setHotelData(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  useEffect(() => {
    fetchHotels();
  }, []);

  if (!hotelData || hotelData.length === 0) {
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

  return <></>;
};

export default Home;
