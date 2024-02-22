import { useContext } from "react";
import { FormContext } from "./ManageHotelForm";
import { hotelCategories } from "../../config/hotelOptionsConfig";

const CategorySection = () => {
  const formContext = useContext(FormContext);

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold text-sky-700">Category</h2>
      <div className="grid grid-cols-4 gap-2 mb-2">
        {hotelCategories.map((category, index) => {
          return (
            <label key={index}>
              <input
                type="radio"
                name="type"
                className="hidden"
                value={category}
                onChange={formContext?.handleChange}
                required
              />
              <span>{category}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySection;
