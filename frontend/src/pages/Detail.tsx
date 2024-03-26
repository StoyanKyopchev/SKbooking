import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HotelType } from "../../../backend/src/models/hotel";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const Detail = () => {
  const params = useParams();
  const [hotelData, setHotelData] = useState<HotelType>();
  const [error, setError] = useState<string>("");

  async function findHotelById(hotelId: string) {
    try {
      setError("");
      const response = await fetch(`${SERVER_BASE_URL}/api/hotels/${hotelId}`);
      if (!response.ok) {
        throw new Error("An error occurred while trying to display this hotel");
      }

      const data: HotelType = await response.json();
      setHotelData(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  useEffect(() => {
    if (params.hotelId) {
      findHotelById(params.hotelId);
    }
  }, [params.hotelId]);

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
    <div className="space-y-6 mb-5">
      <div>
        <span className="flex">
          {Array.from({ length: hotelData.rating }).map((rating, index) => {
            return <span key={index}>⭐</span>;
          })}
        </span>
        <h1 className="text-3xl font-bold">{hotelData.name}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotelData.imageUrls.map((image, index) => {
          return (
            <div className="h-[300px]" key={index}>
              <img
                src={image}
                alt={hotelData.name}
                className="rounded-md w-full h-full object-cover object-center"
              />
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotelData.facilities.map((facility, index) => {
          return (
            <div key={index} className="border border-sky-800 rounded-sm p-3">
              {facility}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3">
        <div className="whitespace-pre-line">{hotelData.description}</div>
        <div className="h-fit">
          <GuestInfoForm
            hotelId={hotelData._id}
            pricePerNight={hotelData.pricePerNight}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
