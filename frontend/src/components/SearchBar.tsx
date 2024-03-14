import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../contexts/SearchContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-5 p-3 bg-sky-800 rounded shadow-md grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 items-center gap-2"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2">
        <span className="mr-2">🌎</span>
        <input
          className="w-full text-md focus:outline-none"
          placeholder="Where are you going?"
          value={destination}
          onChange={(event) => {
            setDestination(event.target.value);
          }}
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
      <div>
        <DatePicker
          selected={
            checkIn.getHours() === new Date().getHours() ? undefined : checkIn
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
          selected={
            checkOut.getHours() === new Date().getHours() ? undefined : checkOut
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
      <div className="h-10 flex md:justify-end xl:justify-end 2xl:justify-start md:col-span-2 xl:col-span-4 2xl:col-span-1">
        <div className="flex gap-1 h-full w-full md:w-1/2 2xl:w-full">
          <button className="w-2/3 bg-green-600 text-white font-bold rounded hover:bg-green-500 focus:outline-sky-700">
            Search
          </button>
          <button className="w-1/3 bg-red-600 text-white font-bold rounded hover:bg-red-500 focus:outline-sky-700">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
