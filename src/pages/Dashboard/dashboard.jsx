import React, { useState, useEffect } from 'react';
import { Menu, Home, BookOpen, Award, Settings, LogOut, Plus, Search, Bell, ChevronRight } from 'lucide-react';
import task from "./task.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hook/useAxios";
import { Button } from "@material-tailwind/react";
import useAuthStore from "../../store/useAuthStore";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const { clearToken } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Fixed missing state
  const [courses, setCourses] = useState([]); // Ensure courses is defined

  let navigate = useNavigate();
  const axiosInstance = useAxios();

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/task/");
      setTasks(response.data.data);
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
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static lg:translate-x-0 z-20 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="w-72 h-screen bg-white border-r border-gray-200 px-6 py-8 flex flex-col">
          <div className="flex items-center gap-3 px-2 mb-10">
            <div className="bg-indigo-600 rounded-xl p-2">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">LearnDash</span>
          </div>

          <nav className="space-y-1 flex-1">
            {[
              { icon: Home, label: 'Home', path: '/dashboard', active: true },
              { icon: BookOpen, label: 'Subscriptions', path: '/dashboard/subscription-single' },
              { icon: Award, label: 'Certificates', path: '/dashboard//certificates' },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)} // Fixed navigation
                className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-all duration-200 ${
                  item.active 
                    ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className={`h-5 w-5 ${item.active ? 'text-indigo-600' : 'text-gray-400'}`} />
                <span className="font-medium">{item.label}</span>
                {item.active && <ChevronRight className="h-5 w-5 ml-auto text-indigo-600" />}
              </button>
            ))}
          </nav>

          <button onClick={clearToken} className="flex items-center gap-3 px-4 py-3 rounded-xl w-full hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors group">
            <LogOut className="h-5 w-5 text-gray-400 group-hover:text-red-600" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-600"
              >
                <Menu className="h-6 w-6" />
              </button>

              <div className="relative max-w-md hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/dashboard/create-task")} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
                <Plus className="h-5 w-5" />
                <span>New Course</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Alex! 👋</h1>
              <p className="text-gray-600">Ready to continue your learning journey?</p>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="group bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative">
                    <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">{course.title}</h3>
                    <button onClick={() => navigate(`/dashboard/roadmap/${course.id}`)} className="mt-6 w-full bg-gray-50 text-indigo-600 py-3 rounded-xl font-medium hover:bg-indigo-50 transition-colors border border-gray-100">
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
