import { useContext } from "react";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { FormContext } from "../contexts/ManageHotelFormContext";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const AddHotel = () => {
  const formContext = useContext(FormContext);

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

      formContext?.setSuccessMessage("Hotel saved successfully");

      setTimeout(() => {
        formContext?.setSuccessMessage("");
      }, 2500);
    } catch (error) {
      if (error instanceof Error) {
        formContext?.setError(error.message);
      }
    }
  }

  return <ManageHotelForm onSave={onSave} />;
};

export default AddHotel;
