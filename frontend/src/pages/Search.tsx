import { useEffect, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";

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
  }

  useEffect(() => {
    searchHotels(searchParams);
  }, [searchParams]);

  return <>Search Page</>;
};

export default Search;
