import { Link } from "react-router-dom";
import { BiSolidPhoneCall } from "react-icons/bi";

function Header() {
  return (
    <nav className="flex items-center justify-between px-4 md:px-8 py-4 bg-gradient-to-r from-teal-100 via-teal-50 to-teal-100">
      {/* Logo Section */}
      <Link to={"/"}>
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">U</span>
          </div>
          <span className="text-3xl font-semibold text-teal-600">UCare</span>
        </div>
      </Link>

      {/* Emergency Call Button */}
      <button className="bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-teal-700 transition duration-200 flex items-center gap-1">
        <a className={"hidden md:flex"} href="tel:911">
          Emergency Call
        </a>{" "}
        <BiSolidPhoneCall className="text-lg" />
      </button>
    </nav>
  );
}

export default Header;
