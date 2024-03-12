import React, { useContext } from "react";
import DetailsSection from "./DetailsSection";
import CategorySection from "./CategorySection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { FormContext } from "../../contexts/ManageHotelFormContext";

type Props = {
  onSave: (formData: FormData) => void;
};

const ManageHotelForm = ({ onSave }: Props) => {
  const formContext = useContext(FormContext);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formContext?.form.formData.name === "") {
      return formContext.setError("Name is required");
    }
    if (formContext?.form.formData.city === "") {
      return formContext.setError("City is required");
    }
    if (formContext?.form.formData.country === "") {
      return formContext.setError("Country is required");
    }
    if (formContext?.form.formData.description === "") {
      return formContext.setError("Description is required");
    }
    if (
      formContext?.form.formData.pricePerNight === 0 ||
      Number.isNaN(formContext?.form.formData.pricePerNight)
    ) {
      return formContext?.setError("Price per night is required");
    }
    if (
      formContext?.form.formData.rating === 0 ||
      Number.isNaN(formContext?.form.formData.rating)
    ) {
      return formContext?.setError("Star rating is required");
    }
    if (formContext?.form.formData.type === "") {
      return formContext.setError("Category is required");
    }
    if (
      formContext?.form.formData.facilities &&
      formContext?.form.formData.facilities.length < 1
    ) {
      return formContext.setError("At least 1 facility is required");
    }
    if (
      formContext?.form.formData.adultCount === 0 ||
      Number.isNaN(formContext?.form.formData.adultCount)
    ) {
      return formContext?.setError("At least 1 adult is required");
    }
    if (
      formContext?.form.formData.imageFiles == null ||
      formContext?.form.formData.imageFiles.length < 1
    ) {
      return formContext?.setError("At least 1 image is required");
    }
    if (
      formContext?.form.formData.imageFiles.length +
        (formContext?.form.formData.imageUrls?.length || 0) >
      6
    ) {
      return formContext?.setError("Cannot upload more than 6 images");
    }

    const formData = new FormData();

    if (
      formContext.form.formData._id !== "" &&
      formContext.form.formData._id !== undefined
    ) {
      formData.append("hotelId", formContext?.form.formData._id);
    }

    formData.append("name", formContext?.form.formData.name);
    formData.append("city", formContext?.form.formData.city);
    formData.append("country", formContext?.form.formData.country);
    formData.append("description", formContext?.form.formData.description);
    formData.append("type", formContext?.form.formData.type);
    formData.append(
      "adultCount",
      formContext?.form.formData.adultCount.toString()
    );
    formData.append(
      "childCount",
      formContext?.form.formData.childCount.toString()
    );
    formContext?.form.formData.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });
    formData.append(
      "pricePerNight",
      formContext?.form.formData.pricePerNight.toString()
    );
    formData.append("rating", formContext?.form.formData.rating.toString());

    if (formContext.form.formData.imageUrls.length > 0) {
      formContext.form.formData.imageUrls.forEach((imageUrl, index) => {
        formData.append(`imageUrls[${index}]`, imageUrl);
      });
    }
    Array.from(formContext?.form.formData.imageFiles as FileList).forEach(
      (imageFile) => {
        formData.append("imageFiles", imageFile);
      }
    );

    onSave(formData);
  }

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col items-center gap-3 pb-5 w-full md:w-3/5 xl:w-1/2 2xl:w-1/3"
        onSubmit={handleSubmit}
      >
        {formContext?.error && (
          <div className="rounded p-2 text-white font-bold bg-red-500 text-center">
            {formContext.error}
          </div>
        )}

        {formContext?.successMessage && (
          <div className="rounded p-2 text-white font-bold bg-green-500 text-center">
            {formContext.successMessage}
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
  );
};

export default ManageHotelForm;
