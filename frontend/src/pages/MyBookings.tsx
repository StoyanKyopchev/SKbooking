import { useState, useEffect } from "react";
import { HotelType } from "../../../backend/src/models/hotel";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const MyBookings = () => {
  const [error, setError] = useState<string>("");
  const [myBookings, setMyBookings] = useState<HotelType[]>([]);

  async function fetchMyBookings() {
    try {
      setError("");

      const response = await fetch(`${SERVER_BASE_URL}/api/my-bookings`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Unable to find bookings");
      }
      const data: HotelType[] = await response.json();
      setMyBookings(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  useEffect(() => {
    fetchMyBookings();
  }, []);

  if (error !== "") {
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

export default MyBookings;
