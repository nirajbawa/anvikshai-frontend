import React from "react";
import { FaMinus, FaCheck } from "react-icons/fa";

const mentors = [
  { id: 1, name: "Raj Andrew", expertise: "Android Development", image: "https://via.placeholder.com/50" },
  { id: 2, name: "Raj Andrew", expertise: "Android Development", image: "https://via.placeholder.com/50" },
  { id: 3, name: "Raj Andrew", expertise: "Android Development", image: "https://via.placeholder.com/50" },
  { id: 4, name: "Raj Andrew", expertise: "Android Development", image: "https://via.placeholder.com/50" },
  { id: 5, name: "Raj Andrew", expertise: "Android Development", image: "https://via.placeholder.com/50" },
  { id: 6, name: "Raj Andrew", expertise: "Android Development", image: "https://via.placeholder.com/50" },
];

function Select() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="flex items-center p-4 shadow-lg rounded-lg bg-white w-80">
            <img src={mentor.image} alt={mentor.name} className="w-12 h-12 rounded-full mr-4" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{mentor.name}</h3>
              <p className="text-blue-500 text-sm">{mentor.expertise}</p>
              <div className="flex items-center gap-3 mt-2">
                <select className="border rounded-md p-1 focus:ring focus:ring-blue-300">
                  <option>Select Expert</option>
                </select>
                <button className="bg-green-500 text-white p-2 rounded-md shadow-md hover:bg-green-600 transition">
                  <FaCheck />
                </button>
                <button className="bg-red-500 text-white p-2 rounded-md shadow-md hover:bg-red-600 transition">
                  <FaMinus />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Select;
