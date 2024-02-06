import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import logo from "../assets/images/Logo1.svg";

const Header = () => {
  const authContext = useContext(AuthContext);

  return (
    <div className="bg-sky-800 py-6">
      <div className="container flex justify-between mx-auto">
        <Link to="/">
          <img src={logo} alt="Home page button" />
        </Link>
        <span className="flex space-x-2">
          {authContext?.isSignedIn ? (
            <>
              <Link to="/my-bookings">My Bookings</Link>
              <Link to="/my-hotels">My Hotels</Link>
              <button>Sign Out</button>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex justify-center items-center bg-white text-sky-600 px-3 font-bold rounded hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
