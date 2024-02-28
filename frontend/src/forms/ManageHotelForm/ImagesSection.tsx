import { useContext, useState } from "react";
import { FormContext } from "./ManageHotelForm";

const ImagesSection = () => {
  const formContext = useContext(FormContext);
  const [selectedFiles, setSelectedFiles] = useState<
    string | number | undefined
  >("No file chosen");

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold text-sky-700">Images</h2>
      <div className="flex flex-row items-center">
        <input
          type="file"
          multiple
          accept="image/*"
          id="imageFilesInput"
          hidden
          onChange={(event) => {
            formContext?.setForm({
              formData: {
                ...formContext?.form.formData,
                imageFiles: event.target.files,
              },
            });
            setSelectedFiles(event.target.files?.length);
          }}
        />
        <label
          htmlFor="imageFilesInput"
          className="block text-sm text-white mr-4 py-2 px-4
            rounded-md border-0 text-sm font-semibold bg-sky-800
            hover:bg-sky-700 cursor-pointer"
        >
          Choose files
        </label>
        <label className="text-sm text-sky-800 font-bold">
          {selectedFiles}
          {selectedFiles === 1
            ? " image"
            : typeof selectedFiles === "number"
            ? " images"
            : ""}
        </label>
      </div>
    </div>
  );
};

export default ImagesSection;
