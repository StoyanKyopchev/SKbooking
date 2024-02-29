import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import logo from "../assets/images/Logo1.svg";

const Header = () => {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isToggled, setIsToggled] = useState<boolean>(false);

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
    <div className="bg-sky-800 py-3.5 md:py-6">
      <div className="container max-sm:px-2.5 flex justify-between mx-auto">
        <Link to="/" className="focus:outline-sky-700">
          <img src={logo} alt="Home page button" className="max-sm:h-8" />
        </Link>
        <span className="hidden lg:flex space-x-2">
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
        <span
          className="lg:hidden h-5 w-5 my-auto mr-3"
          onClick={() => setIsToggled(!isToggled)}
        >
          <div
            className={`bg-white w-full h-0.5 my-1 relative transition-all linear delay-2000 ${
              isToggled ? "-rotate-45 top-[33.45%]" : ""
            }`}
          ></div>
          <div
            className={`bg-white w-full h-0.5 my-1 relative transition-all linear delay-2000 ${
              isToggled ? "rotate-45 top-[2.5%]" : ""
            }`}
          ></div>
          <div
            className={`bg-white w-full h-0.5 my-1 relative transition-all linear delay-2000 ${
              isToggled ? "rotate-45 -top-[25%]" : ""
            }`}
          ></div>
        </span>
      </div>
      <div
        className={`lg:hidden absolute left-0 top-0 w-2/3 md:w-1/2 border-2 border-l-0 border-gray-300 rounded bg-sky-800 min-h-screen transition-opacity linear delay-2000 opacity-0 z-10 pointer-events-none ${
          isToggled
            ? "opacity-100 pointer-events-auto transition-opacity linear delay-2000"
            : ""
        }`}
      >
        <ul className="flex flex-col items-center gap-7 pt-4">
          <li className="border-b-2 border-gray-300 w-full flex justify-center pb-4">
            <Link
              to="/"
              className="focus:outline-sky-700"
              onClick={() => setIsToggled(!isToggled)}
            >
              <img src={logo} alt="Home page button" className="max-sm:h-8" />
            </Link>
          </li>
          <li className="w-1/2">
            <Link
              to="#footer"
              onClick={() => setIsToggled(!isToggled)}
              className="flex justify-center items-center h-8 bg-white text-sky-600 px-3 font-bold rounded focus:outline-sky-700"
            >
              About us
            </Link>
          </li>
          <li className="w-1/2">
            <Link
              to="#footer"
              onClick={() => setIsToggled(!isToggled)}
              className="flex justify-center items-center h-8 bg-white text-sky-600 px-3 font-bold rounded focus:outline-sky-700"
            >
              Contact us
            </Link>
          </li>
          {authContext?.isSignedIn ? (
            <>
              <li className="w-1/2">
                <Link
                  to="/my-hotels"
                  onClick={() => setIsToggled(!isToggled)}
                  className="flex justify-center items-center h-8 bg-white text-sky-600 px-3 font-bold rounded focus:outline-sky-700"
                >
                  My Hotels
                </Link>
              </li>
              <li className="w-1/2">
                <Link
                  to="/my-bookings"
                  onClick={() => setIsToggled(!isToggled)}
                  className="flex justify-center items-center h-8 bg-white text-sky-600 px-3 font-bold rounded focus:outline-sky-700"
                >
                  My Bookings
                </Link>
              </li>
              <li className="w-1/2">
                <button
                  onClick={() => {
                    handleSignOut(), setIsToggled(!isToggled);
                  }}
                  className="flex justify-center items-center h-8 w-full bg-white text-sky-600 px-3 font-bold rounded focus:outline-sky-700"
                >
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <li className="w-1/2">
              <Link
                to="/sign-in"
                onClick={() => setIsToggled(!isToggled)}
                className="flex justify-center items-center h-8 bg-white text-sky-600 px-3 font-bold rounded focus:outline-sky-700"
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
      {error && (
        <span className="relative md:fixed top-3 md:top-20 block md:inline mx-2.5 md:mx-0 md:right-2 lg:right-28 xl:right-48 2xl:right-80 rounded p-2 text-white font-bold bg-red-500 text-center">
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
