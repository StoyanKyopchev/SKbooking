import { useContext, useState } from "react";
import { FormContext } from "../../contexts/ManageHotelFormContext";

const ImagesSection = () => {
  const formContext = useContext(FormContext);
  const [selectedFiles, setSelectedFiles] = useState<
    string | number | undefined
  >("No file chosen");

  const deleteImage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    const existingImageUrls = formContext?.form.formData.imageUrls;

    formContext?.setForm({
      formData: {
        ...formContext?.form.formData,
        imageUrls: existingImageUrls?.filter(
          (url) => url !== imageUrl
        ) as string[],
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold text-sky-700">Images</h2>
      {formContext?.form.formData.imageUrls && (
        <div className="grid grid-cols-3 gap-2">
          {formContext?.form.formData.imageUrls.map((imageUrl, index) => {
            return (
              <div
                className="relative group min-h-40 md:min-h-48 lg:min-h-56"
                key={`${index + 23}`}
              >
                <img src={imageUrl} className="min-h-full object-cover" />
                <button
                  className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 opacity-0 group-hover:opacity-100"
                  onClick={(event) => deleteImage(event, imageUrl)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
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
