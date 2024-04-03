import { useState, useEffect } from "react";
import { HotelType } from "../../../backend/src/models/hotel";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const MyBookings = () => {
  const [error, setError] = useState<string>("");
  const [hotelData, setHotelData] = useState<HotelType[]>();

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
      setHotelData(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  useEffect(() => {
    fetchMyBookings();
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
    <div className="space-y-5 mb-5">
      <h1 className="text-3xl font-bold text-sky-700">My Bookings</h1>
      {hotelData.map((hotel, index) => {
        return (
          <div
            className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-sky-800 rounded-lg p-8 max-sm:p-4 gap-5"
            key={index}
          >
            <div className="w-full h-[250px]">
              <img
                src={hotel.imageUrls[0]}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
              <div className="text-2xl font-bold">
                {hotel.name}
                <div className="text-xs font-normal">
                  {hotel.city}, {hotel.country}
                </div>
              </div>
              {hotel.bookings.map((booking, index) => {
                return (
                  <div key={index}>
                    <div>
                      <span className="font-bold mr-2 max-sm:mr-1">Dates:</span>
                      <span>
                        {new Date(booking.checkIn).toDateString()} -{" "}
                        {new Date(booking.checkOut).toDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold mr-2 max-sm:mr-1">
                        Guests:
                      </span>
                      <span>
                        {booking.adultCount} adults, {booking.childCount}{" "}
                        children
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyBookings;
