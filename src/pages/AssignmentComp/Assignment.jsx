import React from "react";
import { IconButton } from "@material-tailwind/react";
import { useNavigate } from "react-router"; // For navigation

const Assignment = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <>
      {/* Back Button - Top Left Corner */}
      <IconButton
        className="absolute top-20 left-4 bg-gray-200 text-black hover:bg-gray-300 transition"
        onClick={() => navigate(-1)} // Goes back to the previous page
      >
        <i className="fas fa-chevron-left text-lg" /> {/* Left arrow icon */}
      </IconButton>

      {/* Assignment Text */}
      <h1 className="absolute top-[15%] left-1/2 transform -translate-x-1/2 text-2xl font-bold text-gray-700">
        Assignment
      </h1>

      {/* Big Rectangle */}
      <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-[30vh] bg-gray-300 rounded-2xl"></div>

      {/* Small Rectangle */}
      <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-[10vh] bg-gray-300 rounded-2xl"></div>

      {/* Upload Button Styled as Inside Rectangle */}
      <button className="absolute top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[7vh] bg-white rounded-2xl shadow-md text-gray-700 font-medium hover:bg-gray-200 transition">
        Upload Files
      </button>

      {/* Buttons Container - Aligned to the Right */}
      <div className="absolute top-[80%] right-[25%] flex gap-4">
        {/* Submit Button */}
        <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition">
          Submit
        </button>

        {/* Cancel Button */}
        <button className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition">
          Cancel
        </button>
      </div>
    </>
  );
};

export default Assignment;
