import image from "./5818.jpg";
import logo from "./logo.webp";
import { Link } from "react-router";

function Hero() {
  return (
    <hero className="grid grid-cols-2 pl-10 h-screen">
      {/* content */}
      <div className="fade-left pb-10 pl-10 mt-16">
        <div className="">
          <div className=" flex space-x-5  pt-11 items-center ">
            <h1 className="text-[70px] font-bold bg-gradient-to-r from-red-700 to-purple-500 text-transparent bg-clip-text">
              AnvikshAI
            </h1>
            <img className="h-20 rounded-[20px]" src={logo}></img>
          </div>

          <div className=" relative mt-5 w-fit text-black bg-gradient-to-r from-red-700 to-purple-500  text-transparent bg-clip-text">
            <span className="text-[60px] text-black">Master the </span>
            <span className="text-[60px] changing-text"></span>
          </div>

          <div className="mt-10">
            <h3 className="text-[25px] ">
              Your Personalized Learning Journey, Powered by AI – Study Smarter,
              Not Harder!
            </h3>
          </div>

          <Link
            to="/login"
            className=" mt-14 inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-black bg-[#D2B0FD] rounded-md hover:bg-black  hover:text-white sm:w-auto sm:mb-0"
            data-primary="green-400"
            data-rounded="rounded-2xl"
            data-primary-reset="{}"
          >
            Get Started
            <svg
              className="w-4 h-4 ml-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
      {/* image */}
      <div className=" mt-20 ml-7">
        <img className="fade-right h-[500px]" src={image} alt=""></img>
      </div>
    </hero>
  );
}

export default Hero;
