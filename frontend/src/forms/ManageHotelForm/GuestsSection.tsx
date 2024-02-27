import { useContext } from "react";
import { FormContext } from "./ManageHotelForm";

const GuestsSection = () => {
  const formContext = useContext(FormContext);

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold text-sky-700">Guests</h2>
      <div className="flex flex-col lg:flex-row gap-5 w-full">
        <label
          className="text-sky-700 font-bold w-full lg:w-1/2"
          htmlFor="adultCount"
        >
          Adults
          <input
            className="border w-full rounded mt-1 py-1 px-2 text-black font-normal text-base focus:outline-none focus:ring focus:ring-sky-700"
            type="number"
            min={1}
            name="adultCount"
            id="adultCount"
            value={formContext?.form.formData.adultCount}
            onChange={(event) =>
              formContext?.setForm({
                formData: {
                  ...formContext?.form.formData,
                  adultCount: parseInt(event.target.value),
                },
              })
            }
            required
          />
        </label>
        <label
          className="text-sky-700 font-bold w-full lg:w-1/2"
          htmlFor="childCount"
        >
          Children
          <input
            className="border w-full rounded mt-1 py-1 px-2 text-black font-normal text-base focus:outline-none focus:ring focus:ring-sky-700"
            type="number"
            min={0}
            name="childCount"
            id="childCount"
            value={formContext?.form.formData.childCount}
            onChange={(event) =>
              formContext?.setForm({
                formData: {
                  ...formContext?.form.formData,
                  childCount: parseInt(event.target.value),
                },
              })
            }
            required
          />
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
