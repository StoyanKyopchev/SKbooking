import { useEffect, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { HotelSearchResponse } from "../../../backend/src/routes/hotels";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
};

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [hotelData, setHotelData] = useState<HotelSearchResponse>();

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
  };

  async function searchHotels(searchParams: SearchParams) {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");

    const response = await fetch(
      `${SERVER_BASE_URL}/api/hotels/search?${queryParams}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching hotels`);
    }

    const data = await response.json();
    setHotelData(data);
  }

  useEffect(() => {
    searchHotels(searchParams);
  }, [
    searchParams.destination,
    searchParams.checkIn,
    searchParams.checkOut,
    searchParams.adultCount,
    searchParams.childCount,
    searchParams.page,
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 mb-5">
      <div className="rounded-lg border border-sky-800 p-5 h-fit lg:sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-sky-800 pb-5">
            Filter by:
          </h3>
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
