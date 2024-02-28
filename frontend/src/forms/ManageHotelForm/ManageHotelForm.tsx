import React, { useState } from "react";
import DetailsSection from "./DetailsSection";
import CategorySection from "./CategorySection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

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

  return (
    <FormContext.Provider value={{ form: form, handleChange, setForm }}>
      <div className="flex justify-center">
        <form className="flex flex-col items-center gap-3 pb-5 w-full md:w-3/5 xl:w-1/2 2xl:w-1/3">
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
