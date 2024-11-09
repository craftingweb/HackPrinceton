import { BsSearchHeart } from "react-icons/bs";
import docImg from "../../assets/images/doc-img.png";
import gif1 from "../../assets/images/gif-1.gif";
import gif3 from "../../assets/images/gif-3.gif";

export const HeroSection = () => {
  return (
    <section className="flex items-center w-full h-full md:px-8 relative">
      <img
        src={gif1} // Replace with actual path or URL
        alt="Animated doctor illustration"
        className="w-10 md:w-20 rounded-xl h-auto absolute top-5 left-0 md:top-16 md:left-10"
      />

      <img
        src={gif3}
        alt="Animated doctor illustration"
        className="w-10 md:w-20 rounded-xl h-auto absolute right-5 bottom-44 md:top-16 md:right-10"
      />

      {/* Doctor Image with Overlays */}
      <div className="w-full mt-5 hidden md:flex">
        <img
          src={docImg} // Replace with actual path
          alt="Doctor"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Text and Call-to-Action */}
      <div className="space-y-10 md:space-y-12 w-full h-full flex flex-col justify-center">
        <div className="flex flex-col gap-2">
          <span className="inline-block bg-teal-500 text-white w-fit px-3 py-1 rounded-full text-xs font-semibold">
            Online Urgent Care Finder
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
            Find Your <span className="text-teal-600">Urgent Care Online</span>
          </h1>
          <p className="text-gray-600 md:max-w-lg">
            Urgent Care, Anywhere: Find the Nearest Help Fast!
          </p>
        </div>

        {/* Info Section */}
        <div className="flex space-x-8 mt-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-800">24/7</p>
            <p className="text-gray-600">Emergency Care</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-800">98%</p>
            <p className="text-gray-600">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};
