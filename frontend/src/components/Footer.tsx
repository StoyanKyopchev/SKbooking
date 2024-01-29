import logo from "../assets/images/Logo1.svg";
import facebookIcon from "../assets/images/facebook.svg";
import instagramIcon from "../assets/images/instagram.svg";
import twitterXIcon from "../assets/images/twitterX.svg";
import phoneIcon from "../assets/images/phone.svg";
import locationIcon from "../assets/images/location.svg";
import mailIcon from "../assets/images/mail.svg";

const Footer = () => {
  return (
    <div className="bg-sky-800 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="h-20 w-36 flex items-center">
          <img src={logo} alt="Logo image" />
        </span>
        <span className="text-white flex gap-6 tracking-tight">
          <div>
            <h3 className="font-bold mb-1">Company</h3>
            <ul>
              <li>
                <p className="cursor-pointer whitespace-nowrap hover:text-gray-200">
                  Terms & conditions
                </p>
              </li>
              <li>
                <p className="cursor-pointer hover:text-gray-200">
                  Privacy policy
                </p>
              </li>
              <li>
                <p className="cursor-pointer hover:text-gray-200">About us</p>
              </li>
              <li>
                <p className="cursor-pointer hover:text-gray-200">FAQ</p>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-1">Contact us</h3>
            <ul>
              <li className="flex gap-1">
                <img src={locationIcon} alt="Location icon" />
                <p>1234 Blue Star Castleton, NY</p>
              </li>
              <li className="flex gap-1">
                <img src={phoneIcon} alt="Location icon" />
                <p>+1 999-222-5555</p>
              </li>
              <li className="flex gap-1">
                <img src={mailIcon} alt="Location icon" />
                <p>mail@SKbooking.com</p>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-1">Socials</h3>
            <ul>
              <li className="mb-1 cursor-pointer">
                <img src={facebookIcon} alt="Link to our facebook page" />
              </li>
              <li className="mb-1 cursor-pointer">
                <img src={instagramIcon} alt="Link to our instagram page" />
              </li>
              <li className="cursor-pointer">
                <img src={twitterXIcon} alt="Link to our twitter page" />
              </li>
            </ul>
          </div>
        </span>
      </div>
      <div className="container mx-auto flex"></div>
    </div>
  );
};

export default Footer;
