import { useContext, useState } from "react";
import { FormContext } from "../../contexts/ManageHotelFormContext";
import { hotelCategories } from "../../config/hotelOptionsConfig";

const CategorySection = () => {
  const formContext = useContext(FormContext);
  const [selectedElement, setSelectedElement] = useState<undefined | number>(
    undefined
  );

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold text-sky-700">Category</h2>
      <div className="grid grid-cols-4 gap-2">
        {hotelCategories.map((category, index) => {
          return (
            <label
              key={index}
              htmlFor={`${index}`}
              onClick={() => setSelectedElement(index)}
              className={
                selectedElement === index
                  ? "cursor-pointer bg-sky-600 text-sm text-white text-center rounded-full py-1 font-semibold"
                  : "cursor-pointer bg-sky-800 text-sm text-white text-center rounded-full py-1 font-semibold"
              }
            >
              <input
                type="radio"
                name="type"
                id={`${index}`}
                className="hidden"
                value={category}
                onChange={formContext?.handleChange}
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
