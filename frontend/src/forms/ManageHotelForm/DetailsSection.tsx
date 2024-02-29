import { useContext } from "react";
import { FormContext } from "./ManageHotelForm";

const DetailsSection = () => {
  const formContext = useContext(FormContext);

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-3xl font-bold text-sky-700 text-center">Add Hotel</h1>
      <label className="text-sky-700 font-bold w-full" htmlFor="name">
        Name
        <input
          className="border w-full rounded mt-1 py-1 px-2 text-black font-normal text-base focus:outline-none focus:ring focus:ring-sky-700"
          type="text"
          name="name"
          value={formContext?.form.formData.name}
          onChange={formContext?.handleChange}
        />
      </label>
      <div className="flex flex-col lg:flex-row gap-5 w-full">
        <label
          className="text-sky-700 font-bold w-full lg:w-1/2"
          htmlFor="city"
        >
          City
          <input
            className="border w-full rounded mt-1 py-1 px-2 text-black font-normal text-base focus:outline-none focus:ring focus:ring-sky-700"
            type="text"
            name="city"
            value={formContext?.form.formData.city}
            onChange={formContext?.handleChange}
          />
        </label>
        <label
          className="text-sky-700 font-bold w-full lg:w-1/2"
          htmlFor="country"
        >
          Country
          <input
            className="border w-full rounded mt-1 py-1 px-2 text-black font-normal text-base focus:outline-none focus:ring focus:ring-sky-700"
            type="text"
            name="country"
            value={formContext?.form.formData.country}
            onChange={formContext?.handleChange}
          />
        </label>
      </div>
      <label className="text-sky-700 font-bold w-full" htmlFor="description">
        Description
        <textarea
          className="border w-full rounded mt-1 py-1 px-2 text-black font-normal text-base focus:outline-none focus:ring focus:ring-sky-700"
          name="description"
          value={formContext?.form.formData.description}
          onChange={formContext?.handleChange}
          rows={7}
        ></textarea>
      </label>
      <div className="flex flex-col lg:flex-row gap-5 w-full">
        <label
          className="text-sky-700 font-bold w-full lg:w-1/2"
          htmlFor="pricePerNight"
        >
          Price Per Night
          <input
            className="border w-full rounded mt-1 py-1 px-2 text-black font-normal text-base focus:outline-none focus:ring focus:ring-sky-700"
            type="number"
            min={0}
            name="pricePerNight"
            value={formContext?.form.formData.pricePerNight}
            onChange={(event) =>
              formContext?.setForm({
                formData: {
                  ...formContext?.form.formData,
                  pricePerNight: parseFloat(event.target.value),
                },
              })
            }
            step=".01"
          />
        </label>
        <label
          className="text-sky-700 font-bold w-full lg:w-1/2"
          htmlFor="rating"
        >
          Star Rating
          <select
            className="border w-full rounded mt-1 py-1 px-2 text-black font-normal text-base focus:outline-none focus:ring focus:ring-sky-700"
            name="rating"
            value={formContext?.form.formData.rating}
            onChange={(event) =>
              formContext?.setForm({
                formData: {
                  ...formContext?.form.formData,
                  rating: parseFloat(event.target.value),
                },
              })
            }
          >
            <option value="" className="text-sm font-bold">
              Select a Rating
            </option>
            {[1, 2, 3, 4, 5].map((number) => {
              return (
                <option value={number} key={number}>
                  {number}
                </option>
              );
            })}
          </select>
        </label>
      </div>
    </div>
  );
};

export default DetailsSection;
