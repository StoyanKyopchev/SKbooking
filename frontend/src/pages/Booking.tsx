import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserType } from "../../../backend/src/models/user";
import { useSearchContext } from "../contexts/SearchContext";
import { HotelType } from "../../../backend/src/models/hotel";
import BookingForm from "../forms/BookingForm/BookingForm";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const Booking = () => {
  const search = useSearchContext();
  const { hotelId } = useParams();
  const [currentUser, setCurrentUser] = useState<UserType>();
  const [error, setError] = useState<string>("");
  const [hotelData, setHotelData] = useState<HotelType>();
  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  async function findHotelById(hotelId: string) {
    try {
      setError("");
      const response = await fetch(`${SERVER_BASE_URL}/api/hotels/${hotelId}`);
      if (!response.ok) {
        throw new Error("An error occurred while trying to display this hotel");
      }

      const data: HotelType = await response.json();
      setHotelData(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  async function fetchCurrentUser() {
    try {
      setError("");
      const response = await fetch(`${SERVER_BASE_URL}/api/users/me`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error fetching user");
      }
      const data: UserType = await response.json();
      setCurrentUser(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (hotelId) {
      findHotelById(hotelId);
    }
  }, [hotelId]);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <div>BOOKING DETAILS SUMMARY</div>
      {currentUser && <BookingForm currentUser={currentUser} />}
    </div>
  );
};

export default Booking;
