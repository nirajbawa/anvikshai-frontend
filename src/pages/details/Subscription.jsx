import "@material-tailwind/react";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router";

export default function SubscriptionPlans() {
  let navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <h2 className="text-5xl font-bold mt-10 mb-6">Subscription Plans</h2>

      <div className="flex flex-col md:flex-row gap-20 mt-10">
        <div
          className="bg-white shadow-xl rounded-lg p-6 w-[350px] h-[400px] flex flex-col justify-between text-center 
                        transition duration-300 transform hover:scale-105 hover:shadow-2xl"
        >
          <h3 className="text-2xl font-bold flex gap-2 mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 24 24"
              strokeWidth="5"
              stroke="black"
              className="w-7 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 2L3 14h8l-2 8 10-12h-8l2-8z"
              />
            </svg>
            Free Package
          </h3>

          <div className="mt-8 ml-10 flex flex-col justify-center space-y-3 text-left">
            <p className="font-semibold text-lg">Features : </p>
            <ul className="text-md text-black-700 font-bold">
              <li className="mt-4">• First 3 tasks are free</li>
            </ul>
          </div>

          <div className="mt-auto mb-6 flex items-center justify-center gap-3">
            <p className="text-black-500 text-xl line-through font-bold">$10</p>
            <p className="text-red-600 text-2xl font-bold">$0</p>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-black text-white py-3 px-6 rounded-md w-full mb-5 hover:bg-gray-800 transition text-sm"
          >
            CONTINUE WITH FREE
          </button>
        </div>

        <div
          className="bg-white shadow-xl rounded-lg p-6 w-[350px] h-[400px] flex flex-col justify-between text-center 
                        transition duration-300 transform hover:scale-105 hover:shadow-2xl"
        >
          <h3 className="text-2xl font-bold flex gap-2 mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 24 24"
              strokeWidth="5"
              stroke="black"
              className="w-7 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 2L3 14h8l-2 8 10-12h-8l2-8z"
              />
            </svg>
            Premium Package
          </h3>

          <div className="mt-8 ml-10 flex flex-col justify-center space-y-3 text-left">
            <p className="font-semibold text-lg">Features:</p>
            <ul className="text-md text-black-700 font-bold">
              <li className="mt-4">• Free 20 tasks per month</li>
              <li>• No Ads</li>
            </ul>
          </div>

          <div className="mt-auto mb-6 flex items-center justify-center gap-3">
            <p className="text-black-500 text-xl line-through font-bold">$99</p>
            <p className="text-red-600 text-2xl font-bold">$20</p>
          </div>

          <button className="bg-black text-white py-3 px-6 rounded-md w-full hover:bg-gray-800 transition text-sm mb-5">
            BUY
          </button>
        </div>
      </div>
    </div>
  );
}
