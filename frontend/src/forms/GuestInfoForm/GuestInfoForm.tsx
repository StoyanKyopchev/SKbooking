import { useState, useContext } from "react";
import { useSearchContext } from "../../contexts/SearchContext";
import { AuthContext } from "../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    search.saveSearchValues("", checkIn, checkOut, adultCount, childCount);
    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    search.saveSearchValues("", checkIn, checkOut, adultCount, childCount);
    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="flex flex-col p-4 bg-sky-800 gap-4 rounded-md">
      <h3 className="text-md font-bold text-white">${pricePerNight}</h3>
      <form onSubmit={authContext?.isSignedIn ? onSubmit : onSignInClick}>
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={
                checkIn.getHours() === new Date().getHours()
                  ? undefined
                  : checkIn
              }
              onChange={(date) => setCheckIn(date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <DatePicker
              required
              selected={
                checkOut.getHours() === new Date().getHours()
                  ? undefined
                  : checkOut
              }
              onChange={(date) => setCheckOut(date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-out Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div className="bg-white flex gap-2 px-2 py-1">
            <label className="flex items-center">
              Adults:
              <input
                type="number"
                min={1}
                max={20}
                className="w-full p-1 focus:outline-none font-bold"
                value={adultCount}
                onChange={(event) => {
                  setAdultCount(parseInt(event.target.value));
                }}
              />
            </label>
            <label className="flex items-center">
              Children:
              <input
                type="number"
                min={0}
                max={20}
                className="w-full p-1 focus:outline-none font-bold"
                value={childCount}
                onChange={(event) => {
                  setChildCount(parseInt(event.target.value));
                }}
              />
            </label>
          </div>
          <div className="flex justify-center h-10 w-full">
            {authContext?.isSignedIn ? (
              <button className="w-3/4 md:w-1/4 lg:w-3/4 xl:w-1/2 flex justify-center items-center bg-white text-sky-600 px-3 font-bold rounded hover:bg-gray-100 focus:outline-sky-700">
                Book Now
              </button>
            ) : (
              <button className="w-3/4 md:w-1/4 lg:w-3/4 xl:w-1/2 flex justify-center items-center bg-white text-sky-600 px-3 font-bold rounded hover:bg-gray-100 focus:outline-sky-700">
                Sign in to Book
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
