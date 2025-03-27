import React, { useState, useEffect } from "react";
import {
  Menu,
  Home,
  BookOpen,
  Award,
  LogOut,
  Plus,
  Search,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hook/useAxios";
import useAuthStore from "../../store/useAuthStore";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const { clearToken } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  let navigate = useNavigate();
  const axiosInstance = useAxios();

  const fetchImage = async (query) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${
          import.meta.env.VITE_UNSPLASH_CLIENT_ID
        }`
      );
      const data = await response.json();
      return data.results.length > 0 ? data.results[0].urls.small : null;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/task/");
      const tasksWithImages = await Promise.all(
        response.data.data.map(async (task) => {
          const imageUrl = await fetchImage(task.domains[0]);

          // const imageUrl = await fetchImage(task.task_name);

          return { ...task, image: imageUrl || "/default-placeholder.jpg" };
        })
      );
      setTasks(tasksWithImages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed lg:static  lg:translate-x-0 z-20 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-72 h-full bg-white border-r border-gray-200 px-6 py-8 pb-36 flex flex-col justify-between">
          <nav className="flex flex-col">
            {[
              { icon: Home, label: "Home", path: "/dashboard" },
              {
                icon: BookOpen,
                label: "Subscriptions",
                path: "/dashboard/subscription-single",
              },
              {
                icon: Award,
                label: "Certificates",
                path: "/dashboard/certificates",
              },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <item.icon className="h-5 w-5 text-gray-400" />
                <span className="font-medium">{item.label}</span>
                <ChevronRight className="h-5 w-5 ml-auto text-gray-400" />
              </button>
            ))}
          </nav>

          <button
            onClick={clearToken}
            className="flex items-center  gap-3 px-4 py-3 rounded-xl w-full hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors group"
          >
            <LogOut className="h-5 w-5 text-gray-400 group-hover:text-red-600" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-gray-200 j px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-600"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="relative max-w-md hidden sm:block">
              {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl bg-gray-50"
              /> */}
            </div>
            <button
              onClick={() => navigate("/dashboard/create-task")}
              className="justify-center flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <Plus className="h-5 w-5" />
              <span>New Course</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-gray-600">
              Ready to continue your learning journey?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {loading
                ? Array(6)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse"
                      >
                        <div className="w-full h-48 bg-gray-200 rounded-lg" />
                        <div className="mt-4 h-4 bg-gray-200 rounded w-3/4" />
                        <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
                        <div className="mt-6 w-full bg-gray-200 py-3 rounded-xl" />
                      </div>
                    ))
                : tasks.map((course) => (
                    <div
                      key={course.id}
                      className="group bg-white rounded-2xl shadow-sm border border-gray-100"
                    >
                      <img
                        src={course.image}
                        alt={course.task_name}
                        className="w-full h-48 object-cover rounded-t-2xl"
                      />
                      <div className="p-6">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {course.task_name}
                        </h3>
                        <button
                          onClick={() =>
                            navigate(`/dashboard/roadmap/${course.id}`)
                          }
                          className="mt-6 w-full bg-gray-50 text-indigo-600 py-3 rounded-xl hover:bg-indigo-50 border border-gray-100"
                        >
                          Continue Learning
                        </button>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
