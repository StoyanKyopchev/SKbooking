import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/models/hotel";

type Props = {
  hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-sky-800 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid max-sm:gap-5 md:grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.rating }).map((rating, index) => {
                return <span key={index}>⭐</span>;
              })}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {hotel.name}
          </Link>
        </div>
        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 max-sm:gap-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center lg:items-start 2xl:items-center md:flex-row lg:flex-col 2xl:flex-row">
            <div className="flex gap-1">
              {hotel.facilities.slice(0, 2).map((facility, index) => {
                return (
                  <span
                    key={index}
                    className="bg-sky-800 text-white text-xs p-2 rounded-lg font-bold whitespace-nowrap"
                  >
                    {facility}
                  </span>
                );
              })}
            </div>
            <span className="text-sm">
              {hotel.facilities.length > 2 &&
                `+${hotel.facilities.length - 2} more`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">${hotel.pricePerNight} / night</span>
            <Link
              to={`/detail/${hotel._id}`}
              className="flex justify-center items-center h-10 bg-sky-800 text-white px-3 font-bold rounded hover:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-800"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
