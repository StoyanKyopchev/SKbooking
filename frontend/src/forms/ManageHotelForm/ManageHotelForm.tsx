import React, { useState } from "react";
import DetailsSection from "./DetailsSection";
import CategorySection from "./CategorySection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export type HotelFormData = {
  formData: {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    rating: number;
    imageFiles: FileList | null;
    imageUrls: string[];
  };
};

type FormContext = {
  form: HotelFormData;
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  setForm: (value: React.SetStateAction<HotelFormData>) => void;
};

export const FormContext = React.createContext<FormContext | undefined>(
  undefined
);

const ManageHotelForm = () => {
  const [form, setForm] = useState<HotelFormData>({
    formData: {
      name: "",
      city: "",
      country: "",
      description: "",
      type: "",
      adultCount: 0,
      childCount: 0,
      facilities: [],
      pricePerNight: 0,
      rating: 0,
      imageFiles: null,
      imageUrls: [],
    },
  });
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setForm({
      formData: {
        ...form.formData,
        [event.target.name]: event.target.value,
      },
    });
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.formData.name === "") {
      return setError("Name is required");
    }
    if (form.formData.city === "") {
      return setError("City is required");
    }
    if (form.formData.country === "") {
      return setError("Country is required");
    }
    if (form.formData.description === "") {
      return setError("Description is required");
    }
    if (
      form.formData.pricePerNight === 0 ||
      Number.isNaN(form.formData.pricePerNight)
    ) {
      return setError("Price per night is required");
    }
    if (form.formData.rating === 0 || Number.isNaN(form.formData.rating)) {
      return setError("Star rating is required");
    }
    if (form.formData.type === "") {
      return setError("Category is required");
    }
    if (form.formData.facilities.length < 1) {
      return setError("At least 1 facility is required");
    }
    if (
      form.formData.adultCount === 0 ||
      Number.isNaN(form.formData.adultCount)
    ) {
      return setError("At least 1 adult is required");
    }
    if (
      form.formData.imageFiles == null ||
      form.formData.imageFiles.length < 1
    ) {
      return setError("At least 1 image is required");
    }

    const formData = new FormData();

    formData.append("name", form.formData.name);
    formData.append("city", form.formData.city);
    formData.append("country", form.formData.country);
    formData.append("description", form.formData.description);
    formData.append("type", form.formData.type);
    formData.append("adultCount", form.formData.adultCount.toString());
    formData.append("childCount", form.formData.childCount.toString());
    form.formData.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });
    formData.append("pricePerNight", form.formData.pricePerNight.toString());
    formData.append("rating", form.formData.rating.toString());
    Array.from(form.formData.imageFiles as FileList).forEach((imageFile) => {
      formData.append("imageFiles", imageFile);
    });

    try {
      setError("");
      setSuccessMessage("");

      const response = await fetch(`${SERVER_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`${data.message}`);
      }

      setSuccessMessage("Hotel saved successfully");

      setTimeout(() => {
        setSuccessMessage("");
      }, 2500);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  return (
    <FormContext.Provider value={{ form: form, handleChange, setForm }}>
      <div className="flex justify-center">
        <form
          className="flex flex-col items-center gap-3 pb-5 w-full md:w-3/5 xl:w-1/2 2xl:w-1/3"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="rounded p-2 text-white font-bold bg-red-500 text-center">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="rounded p-2 text-white font-bold bg-green-500 text-center">
              {successMessage}
            </div>
          )}
          <DetailsSection />
          <CategorySection />
          <FacilitiesSection />
          <GuestsSection />
          <ImagesSection />
          <div className="flex justify-center md:justify-end w-full max-sm:mt-3">
            <button
              type="submit"
              className="bg-sky-800 w-3/4 md:w-1/3 text-white text-lg font-bold p-2 rounded hover:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-800"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </FormContext.Provider>
  );
};

export default ManageHotelForm;
