import "@material-tailwind/react";
import "tailwindcss/tailwind.css";
import { Timeline, Typography } from "@material-tailwind/react";
import { Bell, DollarCircle, HomeSimple } from "iconoir-react";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

export default function RoadMap() {
  const tasks = {
    5: "Bug Fixes 🐛",
    10: "Team Meeting 📅",
    15: "Feature Release 🚀",
    18: "Code Review 🔍",
    22: "Deploy Update 🌐",
    28: "Client Demo 🎤",
  };

  const data = [
    { name: "A", value1: 50, value2: 10 },
    { name: "B", value1: 60, value2: 12 },
    { name: "C", value1: 45, value2: 8 },
    { name: "D", value1: 55, value2: 14 },
    { name: "E", value1: 35, value2: 6 },
    { name: "F", value1: 50, value2: 10 },
    { name: "G", value1: 40, value2: 9 },
    { name: "H", value1: 60, value2: 12 },
  ];

  const [progress, setProgress] = useState(75);

  const [feedbacks, setFeedbacks] = useState([
    "Great work! The UI is clean and smooth.",
    "Would love to see more customization options.",
  ]);
  const [newFeedback, setNewFeedback] = useState("");

  const handleAddFeedback = () => {
    if (newFeedback.trim() !== "") {
      setFeedbacks([newFeedback, ...feedbacks]);
      setNewFeedback("");
    }
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 py-10 mx-auto max-w-[1400px] mt-20">
      <div className="flex flex-col lg:flex-row justify-between w-full gap-6">
        <div className="w-full lg:w-1/2 p-5  bg-white shadow-lg rounded-lg ">
          <h2 className="text-xl font-semibold mb-5">RoadMap View</h2>
          <Timeline color="secondary" orientation="vertical">
            <Timeline.Item className="p-4 rounded-lg transition duration-300 ease-in-out hover:translate-x-2 hover:shadow-lg">
              <Timeline.Header>
                <Timeline.Separator />
                <Timeline.Icon>
                  <HomeSimple className="h-5 w-5" />
                </Timeline.Icon>
              </Timeline.Header>
              <Timeline.Body className="-translate-y-1.5">
                <Typography color="default" className="font-bold">
                  Project Kickoff 🚀
                </Typography>
                <Typography type="small" className="mt-2 text-gray-700">
                  The project has officially started. Stay tuned for updates!
                </Typography>
              </Timeline.Body>
            </Timeline.Item>

            <Timeline.Item className="p-4 rounded-lg transition duration-300 ease-in-out hover:translate-x-2 hover:shadow-lg">
              <Timeline.Header>
                <Timeline.Separator />
                <Timeline.Icon>
                  <Bell className="h-5 w-5" />
                </Timeline.Icon>
              </Timeline.Header>
              <Timeline.Body className="-translate-y-1.5">
                <Typography color="default" className="font-bold">
                  Beta Release 🎉
                </Typography>
                <Typography type="small" className="mt-2 text-gray-700">
                  We are launching the beta version next month!
                </Typography>
              </Timeline.Body>
            </Timeline.Item>
          </Timeline>
        </div>

        <div className="w-full lg:w-2/5  text-black p-6 rounded-lg shadow-lg bg-purple-100">
          <div className="flex items-center gap-2 text-lg font-bold mb-4">
            <Bell className="text-xl" />
            <h2>Notifications</h2>
          </div>
          <ul className="space-y-2 text-sm">
            <div className="shadow-md rounded-sm bg-white p-3 hover:scale-105 transition-transform duration-300">
              <li>
                <a href="">🔔 System update scheduled for tomorrow.</a>
              </li>
            </div>
            <div className="shadow-md rounded-sm bg-white p-3 hover:scale-105 transition-transform duration-300">
              <li>
                <a href="">🚀 New feature added to the roadmap.</a>
              </li>
            </div>
            <div className="shadow-md rounded-sm bg-white p-3 hover:scale-105 transition-transform duration-300">
              <li>
                <a href="">⚠️ Maintenance scheduled for 12 AM.</a>
              </li>
            </div>
            <div className="shadow-md rounded-sm bg-white p-3 hover:scale-105 transition-transform duration-300">
              <li>
                <a href="">📅 Your next review is due next week.</a>
              </li>
            </div>
          </ul>
        </div>
      </div>

      <div className="w-full bg-white p-6 rounded-lg shadow-lg mt-20">
        <h2 className="text-2xl font-bold mb-4">Task Calendar</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-semibold">
              {day}
            </div>
          ))}
          {[...Array(30)].map((_, i) => {
            const day = i + 1;
            return (
              <div
                key={day}
                className="relative border p-4 rounded-lg text-left hover:bg-gray-100 transition"
              >
                <span className="absolute top-1 left-2 text-xs font-bold text-gray-600">
                  {day}
                </span>
                {tasks[day] && (
                  <p className="mt-5 text-sm text-gray-800">{tasks[day]}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center w-full p-6 bg-white rounded-lg shadow-lg mt-20">
        <h2 className="text-2xl font-semibold mb-6">Overall Feedback</h2>
        <div className="w-full max-w-5xl h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value1" fill="#2CD4D9" />
              <Bar dataKey="value2" fill="#4A90E2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="w-full max-w-10xl mt-20">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold">Completed</span>
          <span className="text-xl font-bold">{progress}%</span>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-6">
          <div
            className="bg-blue-600 h-6 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="shadow-md rounded-lg bg-white w-full max-w-10xl mx-auto p-5 mt-10 md:mt-20">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
            Feedback
          </h2>

          <div className="space-y-4">
            {feedbacks.map((feedback, index) => (
              <div
                key={index}
                className="bg-purple-100 p-4 md:p-6 rounded-lg shadow-md"
              >
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {feedback}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center border border-gray-400 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Write your feedback..."
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              className="w-full p-3 text-sm md:text-base outline-none"
            />
            <button
              onClick={handleAddFeedback}
              className="bg-black text-white px-4 py-2 rounded-none md:rounded-lg hover:bg-gray-800 transition mr-1"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
