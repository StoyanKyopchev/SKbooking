import logo from "../assets/images/Logo1.svg";

const Header = () => {
  return (
    <div className="bg-sky-700 py-6">
      <div className="container flex justify-between mx-auto">
        <a>
          <img src={logo} alt="Home page button" />
        </a>
        <span className="flex space-x-2">
          <a className="flex justify-center items-center bg-white text-sky-500 px-3 font-bold rounded hover:bg-gray-100">
            Sign In
          </a>
        </span>
      </div>
    </div>
  );
};

export default Header;
