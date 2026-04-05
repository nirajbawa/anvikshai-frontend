import React from "react";
import { useNavigate } from "react-router-dom";
import { Bot, Rocket } from "lucide-react";

function Home({ onStartTest, showResults }) {
  const navigate = useNavigate();

  const handleChatNavigation = () => {
    navigate("/dashboard/gchat");
  };

  const handleCreateCourse = () => {
    navigate("/dashboard/create-task");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
        Welcome back! 👋
      </h1>
      <p className="text-gray-600 dark:text-gray-400 transition-colors">
        Ready to continue your learning journey?
      </p>

      {/* Dashboard Cards */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {/* Chatbot Card */}
        <button
          onClick={handleChatNavigation}
          className="group relative overflow-hidden rounded-2xl w-full sm:w-80 md:w-96 bg-white dark:bg-[#121212] border border-gray-200 dark:border-purple-900/40 shadow-xl shadow-indigo-100/50 dark:shadow-[0_8px_30px_-15px_rgba(147,51,234,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 dark:hover:border-purple-500/50 focus:outline-none text-left"
        >
          <div className="relative h-full w-full p-7 flex flex-col items-start justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="rounded-xl p-3 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-100 dark:ring-indigo-800 transition-transform duration-300 group-hover:rotate-6">
                <Bot className="h-8 w-8" />
              </div>
              <span className="text-xs font-semibold tracking-wide text-indigo-600/80 dark:text-indigo-400/80">AI POWERED</span>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mt-4">Chatbot for Career Guidance</div>
              <div className="mt-1.5 text-gray-600 dark:text-gray-400 text-sm md:text-base">Instant insights, role suggestions, and learning tips tailored to you.</div>
              <div className="mt-3 inline-flex flex-wrap gap-2">
                <span className="px-2.5 py-1 text-xs rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">Personalized</span>
                <span className="px-2.5 py-1 text-xs rounded-full bg-pink-50 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 border border-pink-100 dark:border-pink-800">24/7</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold mt-4">
              Open Chat <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </div>
            <div className="pointer-events-none absolute -right-12 -top-12 w-40 h-40 bg-indigo-50 dark:bg-purple-900/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500 -z-10" />
          </div>
        </button>

        {/* Create Course Card */}
        <button
          onClick={handleCreateCourse}
          className="group relative overflow-hidden rounded-2xl w-full sm:w-80 md:w-96 bg-white dark:bg-[#121212] border border-gray-200 dark:border-purple-900/40 shadow-xl shadow-emerald-100/50 dark:shadow-[0_8px_30px_-15px_rgba(147,51,234,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 dark:hover:border-purple-500/50 focus:outline-none text-left"
        >
          <div className="relative h-full w-full p-7 flex flex-col items-start justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="rounded-xl p-3 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-100 dark:ring-emerald-800 transition-transform duration-300 group-hover:-rotate-6">
                <Rocket className="h-8 w-8" />
              </div>
              <span className="text-xs font-semibold tracking-wide text-emerald-600/80 dark:text-emerald-400/80">BUILD & LEARN</span>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mt-4">Create Your Own Course</div>
              <div className="mt-1.5 text-gray-600 dark:text-gray-400 text-sm md:text-base">Plan modules, add tasks, and launch your custom learning track.</div>
              <div className="mt-3 inline-flex flex-wrap gap-2">
                <span className="px-2.5 py-1 text-xs rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800">Modules</span>
                <span className="px-2.5 py-1 text-xs rounded-full bg-cyan-50 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 border border-cyan-100 dark:border-cyan-800">Assignments</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold mt-4">
              Start Building <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </div>
            <div className="pointer-events-none absolute -left-12 -bottom-12 w-40 h-40 bg-emerald-50 dark:bg-purple-900/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500 -z-10" />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Home;