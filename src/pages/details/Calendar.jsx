import { useState, useEffect } from "react";
import useAxios from "../../hook/useAxios";
import { useNavigate } from "react-router";
import { Spinner } from "@material-tailwind/react";

const Calendar = ({ taskId, createdat }) => {
  const [calendarTasks, setCalendarTasks] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingDay, setLoadingDay] = useState(null);
  const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const axiosInstance = useAxios();
  let navigate = useNavigate();

  const fetchCalendarTasks = async () => {
    try {
      const response = await axiosInstance.get(`/task/days/${taskId}`);
      setCalendarTasks(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching calendar tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendarTasks();
  }, [taskId]);

  const daysPerMonth = 30;
  const totalMonths = Math.ceil(calendarTasks.length / daysPerMonth);

  const createdDate = new Date(createdat);
  const currentDate = new Date();
  const timeDiff = currentDate - createdDate;
  const currentDay = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

  const startDay = currentMonth * daysPerMonth + 1;
  const endDay = startDay + daysPerMonth - 1;

  const tasksForCurrentMonth = calendarTasks.filter(
    (task) => task.day >= startDay && task.day <= endDay
  );

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 mt-10 w-full transition-colors">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="border border-purple-200 dark:border-purple-800 p-4 rounded-lg animate-pulse bg-white dark:bg-gray-800/50"
          >
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-10 mb-2"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!calendarTasks.length) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 mt-10 transition-colors">
        No tasks found for this month.
      </div>
    );
  }

  return (
    <div className="w-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 p-6 rounded-lg shadow-sm mt-20 transition-colors text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Task Calendar</h2>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setCurrentMonth((prev) => Math.max(prev - 1, 0))}
          disabled={currentMonth === 0}
          className="px-4 py-2 bg-purple-200 dark:bg-purple-900/40 text-gray-900 dark:text-white rounded-lg transition-colors hover:bg-purple-300 dark:hover:bg-purple-800 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">
          Month {currentMonth + 1} of {totalMonths}
        </span>
        <button
          onClick={() =>
            setCurrentMonth((prev) => Math.min(prev + 1, totalMonths - 1))
          }
          disabled={currentMonth === totalMonths - 1}
          className="px-4 py-2 bg-purple-200 dark:bg-purple-900/40 text-gray-900 dark:text-white rounded-lg transition-colors hover:bg-purple-300 dark:hover:bg-purple-800 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {daysInWeek.map((day) => (
          <div key={day} className="hidden sm:flex justify-center text-center font-semibold text-gray-700 dark:text-gray-300 transition-colors">
            {day}
          </div>
        ))}

        {[...Array(daysPerMonth)].map((_, i) => {
          const day = startDay + i;
          const taskForDay = tasksForCurrentMonth.find(
            (task) => task.day === day
          );
          const isCurrentDay = day === currentDay;
          const isLoading = loadingDay === day;

          return (
            <div
              key={day}
              className={`relative border cursor-pointer p-4 rounded-lg text-left transition-colors ${
                isCurrentDay 
                  ? "bg-yellow-200 dark:bg-yellow-900/40 border-yellow-300 dark:border-yellow-600" 
                  : taskForDay?.status 
                    ? "bg-green-200 dark:bg-green-900/40 border-green-300 dark:border-green-800" 
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
              onClick={async () => {
                setLoadingDay(day);
                try {
                  if (taskForDay && !taskForDay.content) {
                    await axiosInstance.post(
                      `/task/create-day-${taskForDay.id}-task-${taskId}`
                    );
                    navigate(`/dashboard/task/${taskId}/${taskForDay.id}`);
                  } else if (taskForDay) {
                    navigate(`/dashboard/task/${taskId}/${taskForDay.id}`);
                  }
                } catch (error) {
                  console.error("Error creating task:", error);
                } finally {
                  setLoadingDay(null);
                }
              }}
            >
              <span className={`absolute top-1 left-2 text-sm font-bold ${
                isCurrentDay || taskForDay?.status ? "text-gray-800 dark:text-gray-200" : "text-gray-600 dark:text-gray-400"
              }`}>
                {day}
              </span>
              {isLoading ? (
                <div className="flex justify-center items-center h-16">
                  <Spinner size="xl" color="purple" />
                </div>
              ) : taskForDay ? (
                <p className={`mt-5 text-sm font-bold ${
                  isCurrentDay || taskForDay?.status ? "text-gray-900 dark:text-white" : "text-gray-800 dark:text-gray-200"
                }`}>
                  {taskForDay.topics || "No topics available"}
                </p>
              ) : (
                <p className="mt-5 text-sm text-gray-400 dark:text-gray-500">No tasks</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
