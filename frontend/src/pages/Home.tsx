import { useState, useEffect } from "react";
import { HotelType } from "../../../backend/src/models/hotel";
import LatestDestinationCard from "../components/LatestDestinationCard";

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

  const topRowHotels = hotelData?.slice(0, 2) || [];
  const bottomRowHotels = hotelData?.slice(2) || [];

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

  return (
    <div className="space-y-3 mb-5">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent destinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topRowHotels.map((hotel, index) => (
            <LatestDestinationCard hotel={hotel} key={index} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel, index) => (
            <LatestDestinationCard hotel={hotel} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
