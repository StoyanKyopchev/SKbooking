import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { HotelType } from "../../../backend/src/models/hotel";
import { FormContext } from "../contexts/ManageHotelFormContext";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const EditHotel = () => {
  const params = useParams();
  const formContext = useContext(FormContext);

  async function fetchHotelById(hotelId: string) {
    try {
      formContext?.setError("");
      formContext?.setSuccessMessage("");

      const response = await fetch(
        `${SERVER_BASE_URL}/api/my-hotels/${hotelId}`,
        {
          credentials: "include",
        }
      );

      const data: HotelType = await response.json();

      if (!response.ok) {
        throw new Error(`An error occurred while loading the selected hotel`);
      }

      formContext?.setForm({
        formData: {
          name: data.name,
          city: data.city,
          country: data.country,
          description: data.description,
          type: data.type,
          adultCount: data.adultCount,
          childCount: data.childCount,
          facilities: data.facilities,
          pricePerNight: data.pricePerNight,
          rating: data.rating,
          imageUrls: data.imageUrls,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        formContext?.setError(error.message);
      }
    }
  }

  async function onSave(formData: FormData) {
    try {
      formContext?.setError("");
      formContext?.setSuccessMessage("");

      const response = await fetch(`${SERVER_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`${data.message}`);
      }

      formContext?.setSuccessMessage("Hotel changes saved successfully");

      setTimeout(() => {
        formContext?.setSuccessMessage("");
      }, 2500);
    } catch (error) {
      if (error instanceof Error) {
        formContext?.setError(error.message);
      }
    }
  }

  useEffect(() => {
    if (params.hotelId) {
      fetchHotelById(params.hotelId);
    }
  }, [params.hotelId]);

  return <ManageHotelForm onSave={onSave} />;
};

export default EditHotel;
