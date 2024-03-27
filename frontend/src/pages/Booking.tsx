import { useEffect, useState } from "react";
import { UserType } from "../../../backend/src/models/user";
import BookingForm from "../forms/BookingForm/BookingForm";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const Booking = () => {
  const [currentUser, setCurrentUser] = useState<UserType>();
  const [error, setError] = useState<string>("");

  async function fetchCurrentUser() {
    try {
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

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <div>BOOKING DETAILS SUMMARY</div>
      {currentUser && <BookingForm currentUser={currentUser} />}
    </div>
  );
};

export default Booking;
