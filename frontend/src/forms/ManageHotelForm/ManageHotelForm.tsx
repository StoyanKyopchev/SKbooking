import React, { useState } from "react";
import DetailsSection from "./DetailsSection";

export type HotelFormData = {
  formData: {
    name: string;
    city: string;
    country: string;
    description: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    rating: number;
    imageFiles?: FileList;
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
      adultCount: 0,
      childCount: 0,
      facilities: [],
      pricePerNight: 0,
      rating: 0,
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
        <form className="flex flex-col items-center gap-3 pb-5 2xl:pb-0 w-full md:w-3/5 xl:w-1/2 2xl:w-1/3">
          <DetailsSection />
        </form>
      </div>
    </FormContext.Provider>
  );
};

export default ManageHotelForm;
