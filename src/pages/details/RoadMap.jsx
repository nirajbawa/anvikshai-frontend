import "@material-tailwind/react";
import "tailwindcss/tailwind.css";
import { Timeline, Typography } from "@material-tailwind/react";
import { Learning, DollarCircle, HomeSimple, Lock, Bell } from "iconoir-react";
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
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router";
import RequestMentor from "./RequestMentor";
import useUserStore from "../../store/useUserStore";
import { Badge, IconButton } from "@material-tailwind/react";
import FeedbackModel from "./FeedbackModel";
import { toast } from "react-toastify";

export default function RoadMap() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoadingTask, setIsLoadingTask] = useState(false);
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);

  const axiosInstance = useAxios();
  const [progress, setProgress] = useState(0);

  const [taskProgress, setTaskProgress] = useState(null);

  const [task, setTask] = useState([]);
  const [courseData, setCourseData] = useState();
  const [createdAt, setCreatedAt] = useState(null);
  const { userData } = useUserStore();
  const [model, setModel] = useState(false);

  const fetchTask = async (id) => {
    setIsLoadingTask(true);
    try {
      const response = await axiosInstance.get(`task/${id}`);
      console.log(response.data.data.roadmap_phases);
      setTask(response.data.data.roadmap_phases);
      setCreatedAt(response.data.data.created_at);
      setCourseData(response.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingTask(false);
    }
  };

  const handleModel = () => {
    setModel((state) => !state);
  };

  const regenerateCourse = async () => {
    setIsLoadingTask(true);
    try {
      await axiosInstance.post(
        `/task/regenerate-roadmap-feedback/${courseData.id}`
      );

      toast.success("Course Regenerated Successfully");
      fetchTask(id);
      fetchTaskProgess();
      handleModel();
    } catch (error) {
      toast.error("Error in regenerating course");
      console.log(error);
    } finally {
      setIsLoadingTask(false);
    }
  };

  const fetchTaskProgess = async () => {
    setIsLoadingProgress(true);
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
    } finally {
      setIsLoadingProgress(false);
    }
  };

  useEffect(() => {
    fetchTask(id);
    fetchTaskProgess();
  }, [id]);

  if (isLoadingTask || isLoadingProgress) {
    return (
      <div className="flex flex-col items-center px-4 sm:px-8 py-10 mx-auto w-full mt-5 pb-96 animate-pulse">
        <div className="flex flex-col lg:flex-row justify-between w-full gap-6">
          {/* Roadmap View Skeleton */}
          <div className="w-full lg:w-1/2 p-5 rdmtbg transition-colors border border-gray-200 dark:border-purple-900/40 shadow-xl dark:shadow-[0_8px_30px_-15px_rgba(147,51,234,0.2)]">
            <div className="h-6 bg-gray-300 dark:bg-gray-800 rounded w-1/3 mb-5 mt-2"></div>
            <div className="space-y-4">
              {Array(4)
                .fill()
                .map((_, index) => (
                  <div key={index} className="p-3 bg-gray-200/50 dark:bg-gray-800/50 rounded">
                    <div className="h-4 bg-gray-400 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                ))}
            </div>
          </div>

          {/* Notifications Skeleton */}
          <div className="w-full lg:w-2/5 p-6 rounded-lg shadow-sm rdmtbg transition-colors border border-purple-200 dark:border-purple-800">
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="space-y-3">
              {Array(1)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-[18rem] bg-gray-200 rounded shadow-md"
                  ></div>
                ))}
            </div>
          </div>
        </div>

        {/* Calendar Skeleton */}
        <div className="w-full mt-10 p-6 rdmtbg rounded-lg shadow-sm transition-colors border border-purple-200 dark:border-purple-800">
          <div className="h-64 bg-purple-200/20 dark:bg-purple-800/30 rounded"></div>
        </div>

        {/* Course Analytics Skeleton */}
        <div className="flex flex-col items-center w-full p-6 rdmtbg rounded-lg shadow-xl dark:shadow-[0_8px_30px_-15px_rgba(147,51,234,0.2)] mt-20 transition-colors border border-gray-200 dark:border-purple-900/40">
          <div className="h-6 bg-gray-300 dark:bg-gray-800 rounded w-1/3 mb-10"></div>
          <div className="w-full max-w-5xl h-[400px] bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>

        {/* Progress Bar Skeleton */}
        <div className="w-full max-w-10xl mt-20">
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 bg-gray-300 rounded w-20"></div>
            <div className="h-6 bg-gray-300 rounded w-10"></div>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-6">
            <div className="bg-gray-400 h-6 rounded-full w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <FeedbackModel
        handler={handleModel}
        model={model}
        title="Feedback"
        bio={courseData?.feedback}
        rating={courseData?.rating}
        regenerateCourse={regenerateCourse}
      />
      <div className="w-full pl-5 md:pl-10 pt-5 md:pt-10 flex justify-between">
        <button
          className="bg-purple-200 dark:bg-purple-900/40 flex justify-center items-center pl-3 md:pl-4 py-2 md:py-3 pr-1 md:pr-2 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 duration-300 transition-colors text-gray-900 dark:text-white border border-purple-300 dark:border-purple-700"
          onClick={() => navigate(`/dashboard`)}
        >
          <ArrowBackIosIcon />
        </button>
        {courseData != null && courseData.rating != 0 ? (
          <Badge className="mr-10">
            <Badge.Content>
              <IconButton color="secondary" onClick={handleModel} className="dark:bg-purple-600 text-white transition-colors">
                <Bell className="h-4 w-4 stroke-2" />
              </IconButton>
            </Badge.Content>
            <Badge.Indicator>1</Badge.Indicator>
          </Badge>
        ) : (
          <Badge className="mr-10">
            <Badge.Content>
              <IconButton color="secondary" className="dark:bg-purple-600 text-white transition-colors">
                <Bell className="h-4 w-4 stroke-2" />
              </IconButton>
            </Badge.Content>
            <Badge.Indicator>0</Badge.Indicator>
          </Badge>
        )}
      </div>

      <div className="flex flex-col items-center px-3 sm:px-6 md:px-8 pt-5 md:py-10 mx-auto w-full mt-5 pb-32 md:pb-96">
        <div className="flex flex-col lg:flex-row justify-between w-full gap-4 md:gap-6">
          <div className="w-full lg:w-1/2 p-4 md:p-5 rdmtbg transition-colors border border-gray-100 dark:border-purple-900/20 shadow-xl dark:shadow-[0_8px_30px_-15px_rgba(147,51,234,0.1)]">
            <h2 className="text-lg font-bold md:text-xl mb-4 md:mb-5 text-gray-900 dark:text-white transition-colors">
              Course View
            </h2>
            <h2 className="mb-9 flex gap-2 text-gray-900 dark:text-white transition-colors">
              <b>Expert Verification Status : </b>
              {courseData != null && courseData?.rating != 0 ? (
                courseData?.rating > 2 ? (
                  <p className="font-bold text-green-500">Verified</p>
                ) : (
                  <p
                    className="font-bold text-red-500 cursor-pointer"
                    onClick={handleModel}
                  >
                    Need a Action
                  </p>
                )
              ) : (
                <p className="font-bold text-yellow-500">Veification Pending</p>
              )}
            </h2>
            {task && task.length > 0 && (
              <Timeline color="secondary" orientation="vertical">
                {task.map((data, index) => (
                  <Timeline.Item key={index}>
                    <Timeline.Header>
                      <Timeline.Separator className="dark:bg-purple-900/40" />
                      <Timeline.Icon className="bg-purple-600 dark:bg-purple-500 text-white shadow-lg shadow-purple-500/30 border-2 border-white dark:border-[#0a0a0a] transition-all duration-300 hover:scale-110 flex items-center justify-center font-bold">
                        {index + 1}
                      </Timeline.Icon>
                    </Timeline.Header>
                    <Timeline.Body>
                      <Typography color="default" className="font-bold text-gray-900 dark:text-white transition-colors">
                        {data.topic}
                      </Typography>
                      <Typography type="small" className="mt-2 text-gray-700 dark:text-gray-400 transition-colors">
                        {data.description}
                      </Typography>
                    </Timeline.Body>
                  </Timeline.Item>
                ))}
              </Timeline>
            )}
          </div>

          {/* <div className="w-full rdmtbg lg:w-2/5 text-black p-4 md:p-6 rounded-lg shadow-lg bg-purple-100">
            <div className="flex items-center gap-2 text-base md:text-lg font-bold mb-3 md:mb-4">
              <Learning className="text-lg md:text-xl" />
              <h2>Request Mentor</h2>
            </div>
            <ul className="space-y-2 text-sm">
              <div className="shadow-md rounded-sm bg-white p-2 md:p-3 hover:scale-105 transition-transform duration-300">
                <li>
                  <a href="">🔔 System update scheduled for tomorrow.</a>
                </li>
              </div>
              <div className="shadow-md rounded-sm bg-white p-2 md:p-3 hover:scale-105 transition-transform duration-300">
                <li>
                  <a href="">🚀 New feature added to the roadmap.</a>
                </li>
              </div>
            </ul>
          </div> */}
          <RequestMentor
            isPremiumUser={
              userData?.premium_package == "Premium" ? true : false
            }
            courseData={courseData}
          />
        </div>

        <Calendar taskId={id} createdat={createdAt} />

        <div className="flex flex-col items-center w-full p-4 md:p-6 rdmtbg rounded-lg mt-10 md:mt-20 transition-colors border border-gray-100 dark:border-purple-900/20 shadow-xl dark:shadow-[0_8px_30px_-15px_rgba(147,51,234,0.1)]">
          <h2 className="text-xl md:text-2xl font-semibold mb-10 md:mb-20 text-gray-900 dark:text-white transition-colors">
            Course Analytics
          </h2>
          <div className="w-full max-w-5xl h-[300px] md:h-[400px]">
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

        <div className="w-full max-w-10xl mt-10 md:mt-20">
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <span className="text-lg md:text-xl font-bold text-gray-900 dark:text-white transition-colors">Completed</span>
            <span className="text-lg md:text-xl font-bold text-gray-900 dark:text-white transition-colors">
              {progress.toFixed(2)}%
            </span>
          </div>
          <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4 md:h-6 transition-colors">
            <div
              className="bg-blue-600 dark:bg-blue-500 h-4 md:h-6 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
