import { useContext } from "react";
import { FormContext } from "./ManageHotelForm";

const ImagesSection = () => {
  const formContext = useContext(FormContext);

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold text-sky-700">Images</h2>
      <input
        type="file"
        multiple
        accept="image/*"
        id="imageFilesInput"
        onChange={(event) => {
          formContext?.setForm({
            formData: {
              ...formContext?.form.formData,
              imageFiles: event.target.files,
            },
          });
        }}
      />
    </div>
  );
};

export default ImagesSection;
