import { useState } from "react";
import { useParams } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { UserType } from "../../../../backend/src/models/user";
import { PaymentIntentResponse } from "../../../../backend/src/routes/hotels";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const search = useSearchContext();
  const { hotelId } = useParams();
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    adultCount: search.adultCount,
    childCount: search.childCount,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    hotelId: hotelId as string,
    totalCost: paymentIntent.totalCost,
    paymentIntentId: paymentIntent.paymentIntentId,
  });
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  async function createRoomBooking(formData: BookingFormData) {
    try {
      setError("");
      setSuccessMessage("");
      const response = await fetch(
        `${SERVER_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error booking room");
      }

      setSuccessMessage("Booking Saved");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  async function handleSubmit(
    formData: BookingFormData,
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccessMessage("");

    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      createRoomBooking({
        ...formData,
        paymentIntentId: result.paymentIntent.id,
      });
    }
  }

  if (error !== "") {
    return (
      <div className="flex justify-center">
        {error && (
          <div className="rounded p-2 text-white font-bold bg-red-500 text-center">
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <form
      className="grid grid-cols-1 gap-5 rounded-lg border border-sky-800 p-5"
      onSubmit={(event) => handleSubmit(formData, event)}
    >
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
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>
        <div className="bg-sky-800 rounded-md p-4">
          <div className="font-semibold text-lg text-white">
            Total Cost: ${paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs text-white">Includes taxes and charges</div>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border border-sky-800 rounded-md p-2 text-sm"
        />
      </div>
      <div className="flex justify-end max-sm:items-center flex-col md:flex-row gap-3 md:gap-16 lg:gap-14 xl:gap-32  2xl:gap-44">
        {error && (
          <div className="rounded p-2 text-white font-bold bg-red-500 text-center">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="rounded p-2 text-white font-bold bg-green-500 text-center">
            {successMessage}
          </div>
        )}
        <button
          type="submit"
          className="flex justify-center items-center h-10 bg-sky-800 text-white px-3 font-bold rounded hover:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-800"
        >
          Confirm Booking
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
