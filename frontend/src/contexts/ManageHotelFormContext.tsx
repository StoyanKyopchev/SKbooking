import React, { useState } from "react";

type ManageHotelFormContextProps = {
  children: React.ReactNode;
};

export type HotelFormData = {
  formData: {
    _id?: string;
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
    imageFiles?: FileList | null;
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
  error: string;
  setError: (value: React.SetStateAction<string>) => void;
  successMessage: string;
  setSuccessMessage: (value: React.SetStateAction<string>) => void;
};

export const FormContext = React.createContext<FormContext | undefined>(
  undefined
);

export const ManageHotelFormContextProvider = ({
  children,
}: ManageHotelFormContextProps) => {
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

  return (
    <FormContext.Provider
      value={{
        form: form,
        handleChange,
        setForm,
        error,
        setError,
        successMessage,
        setSuccessMessage,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
