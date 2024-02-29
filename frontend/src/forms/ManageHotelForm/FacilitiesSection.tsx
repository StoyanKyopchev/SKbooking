import { useContext } from "react";
import { FormContext } from "./ManageHotelForm";
import { hotelFacilities } from "../../config/hotelOptionsConfig";

const FacilitiesSection = () => {
  const formContext = useContext(FormContext);

  const checkForDuplicates = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facilitiesArray = formContext?.form.formData.facilities as string[];
    const duplicate = facilitiesArray.findIndex(
      (facility) => event.target.value === facility
    );

    if (duplicate === -1) {
      return [...facilitiesArray, event.target.value];
    } else {
      facilitiesArray.splice(duplicate, 1);
      return facilitiesArray;
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold text-sky-700">Facilities</h2>
      <div className="grid grid-cols-3 max-sm:grid-cols-2 gap-2">
        {hotelFacilities.map((facility, index) => {
          return (
            <label
              key={index}
              htmlFor={`${index + 12}`}
              className="text-sm text-sky-800 font-bold flex gap-1"
            >
              <input
                type="checkbox"
                name="facilities"
                id={`${index + 12}`}
                value={facility}
                onChange={(event) => {
                  formContext?.setForm({
                    formData: {
                      ...formContext?.form.formData,
                      facilities: checkForDuplicates(event),
                    },
                  });
                }}
              />
              <span>{facility}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default FacilitiesSection;
