import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HotelType } from "../../../backend/src/models/hotel";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const Details = () => {
  const params = useParams();
  const [error, setError] = useState<string>("");
  const [hotelData, setHotelData] = useState<HotelType[]>();

  async function findHotelById(hotelId: string) {
    try {
      setError("");
      const response = await fetch(`${SERVER_BASE_URL}/api/hotels/${hotelId}`);

      if (!response.ok) {
        throw new Error("An error occurred while trying to display this hotel");
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
    if (params.id) {
      findHotelById(params.id);
    }
  }, [params.id]);
};

export default Details;
