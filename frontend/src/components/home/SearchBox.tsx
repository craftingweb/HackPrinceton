import { FaMicrophone } from "react-icons/fa";
import { IoLocationOutline, IoSearch } from "react-icons/io5";
 
function SearchBox() {
  return (
    <div className="block md:flex items-center justify-between">
      <div>
        <h2 className="w-fit flex items-center gap-2 text-gray-900 font-semibold text-xl md:text-3xl capitalize">
          Find The <span className="text-teal-500 und">nearest healthcare</span>{" "}
          <div className="h-[2px] w-8 md:w-20 mt-2 bg-teal-500"></div>
        </h2>
        {/* <div className="flex items-center gap-1 mt-2">
          <IoLocationOutline className="text-xl   text-teal-500" />
          <div className="text-xs flex items-center gap-2  text-gray-500">
            <p>Long: {location?.longitude}</p>
            <p>Lat: {location?.latitude}</p>
          </div>
        </div> */}
      </div>
      <form className="flex items-center mt-5 md:mt-0 min-w-fit md:w-[500px]">
        <label htmlFor="voice-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <IoLocationOutline className="text-xl text-teal-500" />
          </div>
          <input
            type="text"
            id="voice-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-teal-500 focus:border-teal-500 outline-none block w-full ps-10 p-2.5 md:px-4.5 md:py-4.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
            placeholder="Search locations..."
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
          >
            <FaMicrophone className="tet-xl text-teal-500" />
          </button>
        </div>
        <button
          type="submit"
          className=" flex justify-center items-center py-3 md:py-3 px-4 ms-2 text-lg font-medium text-white bg-teal-500 rounded-lg border border-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800 transition-all duration-300"
        >
          <IoSearch className="text-xl" />
        </button>
      </form>
    </div>
  );
}

export default SearchBox;
