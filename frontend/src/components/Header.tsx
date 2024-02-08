import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import logo from "../assets/images/Logo1.svg";

const Header = () => {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSignOut = async () => {
    setError("");
    setSuccessMessage("");

    try {
      await authContext?.signOut();
      setSuccessMessage("Sign out successful.");
      authContext?.validateToken();
      setTimeout(() => {
        setSuccessMessage("");
      }, 2500);
    } catch (error) {
      if (error instanceof Error) {
        setError("Failed to sign out.");
        setTimeout(() => {
          setError("");
        }, 2500);
      } else {
        setError("An unexpected error occurred.");
        setTimeout(() => {
          setError("");
        }, 2500);
      }
    }
  };

  return (
    <div className="bg-sky-800 py-6">
      <div className="container max-sm:px-2.5 flex justify-between mx-auto">
        <Link to="/" className="focus:outline-sky-700">
          <img src={logo} alt="Home page button" />
        </Link>
        <span className="flex space-x-2">
          {authContext?.isSignedIn ? (
            <>
              <Link
                to="/my-hotels"
                className="flex justify-center items-center bg-white text-sky-600 px-3 font-bold rounded hover:bg-gray-100 focus:outline-sky-700"
              >
                My Hotels
              </Link>
              <Link
                to="/my-bookings"
                className="flex justify-center items-center bg-white text-sky-600 px-3 font-bold rounded hover:bg-gray-100 focus:outline-sky-700"
              >
                My Bookings
              </Link>
              <button
                onClick={handleSignOut}
                className="flex justify-center items-center bg-white text-sky-600 px-3 font-bold rounded hover:bg-gray-100 focus:outline-sky-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex justify-center items-center bg-white text-sky-600 px-3 font-bold rounded hover:bg-gray-100 focus:outline-sky-700"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
      {error && (
        <span className="relative md:fixed top-3 md:top-20 block md:inline mx-2.5 md:mx-0 md:right-2 lg:right-28 xl:right-48 2xl:right-80 rounded p-2 text-white font-bold bg-green-500 text-center">
          {error}
        </span>
      )}
      {successMessage && (
        <span className="relative md:fixed top-3 md:top-20 block md:inline mx-2.5 md:mx-0 md:right-2 lg:right-28 xl:right-48 2xl:right-80 rounded p-2 text-white font-bold bg-green-500 text-center">
          {successMessage}
        </span>
      )}
    </div>
  );
};

export default Header;
