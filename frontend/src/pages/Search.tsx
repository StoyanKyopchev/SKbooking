import { useEffect, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { HotelSearchResponse } from "../../../backend/src/routes/hotels";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [hotelData, setHotelData] = useState<HotelSearchResponse>();
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    types: selectedHotelTypes,
    stars: selectedStars,
    facilities: selectedFacilities,
  };

  async function searchHotels(searchParams: SearchParams) {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");
    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");

    searchParams.facilities?.forEach((facility) =>
      queryParams.append("facilities", facility)
    );
    searchParams.types?.forEach((type) => queryParams.append("types", type));
    searchParams.stars?.forEach((star) => queryParams.append("stars", star));

    const response = await fetch(
      `${SERVER_BASE_URL}/api/hotels/search?${queryParams}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching hotels`);
    }

    const data = await response.json();
    setHotelData(data);
  }

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prevHotelTypes) =>
      event.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((type) => type !== hotelType)
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility)
    );
  };

  useEffect(() => {
    searchHotels(searchParams);
  }, [
    searchParams.destination,
    searchParams.checkIn,
    searchParams.checkOut,
    searchParams.adultCount,
    searchParams.childCount,
    searchParams.page,
    searchParams.types,
    searchParams.stars,
    searchParams.facilities,
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 mb-5">
      <div className="rounded-lg border border-sky-800 p-5 h-fit lg:sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-sky-800 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
        </div>
        {hotelData?.data.map((hotel, index) => {
          return <SearchResultsCard key={index} hotel={hotel} />;
        })}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
