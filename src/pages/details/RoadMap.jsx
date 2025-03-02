import "@material-tailwind/react";
import "tailwindcss/tailwind.css";
import { Timeline, Typography } from "@material-tailwind/react";
import { Bell, DollarCircle, HomeSimple } from "iconoir-react";
import React, { useEffect } from "react";
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
import useAxios from "../../hook/useAxios";
import { useParams } from "react-router";
import Calendar from "./Calendar";

export default function RoadMap() {
  let { id } = useParams();

  const tasks = {
    5: "Bug Fixes 🐛",
    10: "Team Meeting 📅",
    15: "Feature Release 🚀",
    18: "Code Review 🔍",
    22: "Deploy Update 🌐",
    28: "Client Demo 🎤",
  };

  // const data = [
  //   { name: "A", value1: 50, value2: 10 },
  //   { name: "B", value1: 60, value2: 12 },
  //   { name: "C", value1: 45, value2: 8 },
  //   { name: "D", value1: 55, value2: 14 },
  //   { name: "E", value1: 35, value2: 6 },
  //   { name: "F", value1: 50, value2: 10 },
  //   { name: "G", value1: 40, value2: 9 },
  //   { name: "H", value1: 60, value2: 12 },
  // ];

  const [data, setData] = useState([]);

  const axiosInstance = useAxios();
  const [progress, setProgress] = useState(0);

  const [feedbacks, setFeedbacks] = useState([
    "Great work! The UI is clean and smooth.",
    "Would love to see more customization options.",
  ]);
  const [newFeedback, setNewFeedback] = useState("");
  const [taskProgress, setTaskProgress] = useState(null);

  const handleAddFeedback = () => {
    if (newFeedback.trim() !== "") {
      setFeedbacks([newFeedback, ...feedbacks]);
      setNewFeedback("");
    }
  };

  const [task, setTask] = useState([]);
  const [createdAt, setCreatedAt] = useState(null);

  const fetchTask = async (id) => {
    try {
      const response = await axiosInstance.get(`task/${id}`);
      console.log(response.data.data.roadmap_phases);
      setTask(response.data.data.roadmap_phases);
      setCreatedAt(response.data.data.created_at);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTaskProgess = async () => {
    try {
      const response = await axiosInstance.get(`/task/task-progress/${id}`);
      console.log(response);
      const completed =
        (response?.data?.data?.completed_days /
          response?.data?.data?.total_days) *
        100;
      console.log(completed);
      setProgress(completed);
      setTaskProgress(response?.data?.data);

      const totalDays = response?.data?.data?.total_days;
      const completedDays = response?.data?.data?.completed_days;
      const totalSubTasks = totalDays * 4;
      const totalSubTasksCompleted = completedDays * 4;
      const subTasks = totalSubTasks / 4;
      const subTasksCompleted = completedDays;

      setData([
        {
          name: "Days",
          Total: totalDays,
          Completed: completedDays,
        },
        {
          name: "Sub Tasks",
          Total: totalSubTasks,
          Completed: totalSubTasksCompleted,
        },
        {
          name: "Video Contents",
          Total: subTasks,
          Completed: subTasksCompleted,
        },
        {
          name: "Articles Contents",
          Total: subTasks,
          Completed: subTasksCompleted,
        },
        {
          name: "Quizzes Contents",
          Total: subTasks,
          Completed: subTasksCompleted,
        },
        {
          name: "Assignments Contents",
          Total: subTasks,
          Completed: subTasksCompleted,
        },
      ]);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  

  useEffect(() => {
    fetchTask(id);
    fetchTaskProgess();
  }, [id]);

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 py-10 mx-auto w-full mt-5 pb-96">
      <div className="flex flex-col lg:flex-row justify-between w-full gap-6">
        <div className="w-full lg:w-1/2 p-5  bg-white shadow-lg rounded-lg ">
          <h2 className="text-xl font-semibold mb-5">RoadMap View</h2>
          {task && task.length > 0 && (
            <Timeline color="secondary" orientation="vertical">
              {task.map((data, index) => (
                <Timeline.Item key={index}>
                  <Timeline.Header>
                    <Timeline.Separator />
                    <Timeline.Icon>{index + 1}</Timeline.Icon>
                  </Timeline.Header>
                  <Timeline.Body>
                    <Typography color="default" className="font-bold">
                      {data.topic}
                    </Typography>
                    <Typography type="small" className="mt-2 text-gray-700">
                      {data.description}
                    </Typography>
                  </Timeline.Body>
                </Timeline.Item>
              ))}
            </Timeline>
          )}
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

      <Calendar taskId={id} createdat={createdAt} />

      <div className="flex flex-col items-center w-full p-6 bg-white rounded-lg shadow-lg mt-20">
        <h2 className="text-2xl font-semibold mb-6">
          Overall Progress Details
        </h2>
        <div className="w-full max-w-5xl h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Total" fill="#2CD4D9" />
              <Bar dataKey="Completed" fill="#4A90E2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="w-full max-w-10xl mt-20">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold">Completed</span>
          <span className="text-xl font-bold">{progress.toFixed(2)}%</span>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-6">
          <div
            className="bg-blue-600 h-6 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
