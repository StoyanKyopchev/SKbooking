import { Link } from "react-router-dom";
import logo from "../assets/images/Logo1.svg";

const Header = () => {
  return (
    <div className="bg-sky-800 py-6">
      <div className="container flex justify-between mx-auto">
        <Link to="/">
          <img src={logo} alt="Home page button" />
        </Link>
        <span className="flex space-x-2">
          <Link
            to="/sign-in"
            className="flex justify-center items-center bg-white text-sky-600 px-3 font-bold rounded hover:bg-gray-100"
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Header;
