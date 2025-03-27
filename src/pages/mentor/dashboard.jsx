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
  ShieldUser,
  BadgePlus,
  Network,
  UserCheck,
  UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hook/useAxios";
import useAuthStore from "../../store/useAuthStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Users, UserCog, Menu as Mentor } from "lucide-react";
import { Link } from "react-router";

// Mock data
const stats = {
  users: 1250,
  experts: 84,
  mentors: 156,
};

const barData = [
  { name: "Users", value: stats.users, color: "#3B82F6" },
  { name: "Experts", value: stats.experts, color: "#10B981" },
  { name: "Mentors", value: stats.mentors, color: "#8B5CF6" },
];

const pieData = [
  { name: "Users", value: stats.users },
  { name: "Experts", value: stats.experts },
  { name: "Mentors", value: stats.mentors },
];

const COLORS = ["#3B82F6", "#10B981", "#8B5CF6"];

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value.toLocaleString()}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

function ExpertDashboardPage() {
  const { clearToken } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  let navigate = useNavigate();
  //   const axiosInstance = useAxios();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed lg:static lg:translate-x-0 bg-white border-r border-gray-200 z-20 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } min-h-screen flex flex-col`}
      >
        <div className="w-72 min-h-screen  px-6 py-8 flex flex-col justify-between">
          <nav className="flex flex-col">
            {[{ icon: Home, label: "Home", path: "/expert/dashboard" }].map(
              (item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <item.icon className="h-5 w-5 text-gray-400" />
                  <span className="font-medium">{item.label}</span>
                  <ChevronRight className="h-5 w-5 ml-auto text-gray-400" />
                </button>
              )
            )}
          </nav>

          <button
            onClick={clearToken}
            className="flex items-center gap-3 px-4 mb-20 py-3 rounded-xl w-full hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors group"
          >
            <LogOut className="h-5 w-5 text-gray-400 group-hover:text-red-600" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 sm:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="min-h-screen bg-gray-50">
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl text-center sm:text-left font-bold text-gray-800 mb-8">
                  Dashboard Overview
                </h1>
                <div className="w-full p-10 h-full">
                  <Link to={"/expert/courses"}>
                    <div className="w-72 h-64 bg-white shadow-md cursor-pointer rounded-lg flex justify-center items-center">
                      <h1 className="text-2xl text-center font-bold">
                        View Courses
                      </h1>
                    </div>
                  </Link>
                </div>

                {/* 

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <StatCard
                    title="Total Users"
                    value={stats.users}
                    icon={Users}
                    color="bg-blue-500"
                  />
                  <StatCard
                    title="Total Experts"
                    value={stats.experts}
                    icon={UserCog}
                    color="bg-green-500"
                  />
                  <StatCard
                    title="Total Mentors"
                    value={stats.mentors}
                    icon={Mentor}
                    color="bg-purple-500"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">
                      Distribution Overview
                    </h2>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" fill="#8884d8">
                            {barData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

      
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">
                      Composition Ratio
                    </h2>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) =>
                              `${name} ${(percent * 100).toFixed(0)}%`
                            }
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ExpertDashboardPage;
