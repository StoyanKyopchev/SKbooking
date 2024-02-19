export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  rating: number;
  imageFiles: FileList;
};

const ManageHotelForm = () => {
  return <form></form>;
};

export default ManageHotelForm;
