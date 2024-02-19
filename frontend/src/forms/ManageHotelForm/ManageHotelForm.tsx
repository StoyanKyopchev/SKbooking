import React, { useState } from "react";

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
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      formData: {
        ...form.formData,
        [event.target.name]: event.target.value,
      },
    });
  };

  return (
    <FormContext.Provider value={{ form: form, handleChange }}>
      <form></form>
    </FormContext.Provider>
  );
};

export default ManageHotelForm;
