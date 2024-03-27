import { UserType } from "../../../../backend/src/models/user";

type Props = {
  currentUser: UserType;
};

type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
};

const BookingForm = ({ currentUser }: Props) => {
  return (
    <form className="grid grid-cols-1 gap-5 rounded-lg border border-sky-800 p-5">
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 flex-1 text-sm font-bold">
          First Name
          <input
            type="text"
            readOnly
            disabled
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            value={currentUser.firstName}
          />
        </label>
        <label className="text-gray-700 flex-1 text-sm font-bold">
          Last Name
          <input
            type="text"
            readOnly
            disabled
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            value={currentUser.lastName}
          />
        </label>
        <label className="text-gray-700 flex-1 text-sm font-bold">
          Email
          <input
            type="text"
            readOnly
            disabled
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            value={currentUser.email}
          />
        </label>
      </div>
    </form>
  );
};

export default BookingForm;
