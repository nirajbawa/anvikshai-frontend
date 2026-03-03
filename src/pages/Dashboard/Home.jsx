import React from "react";
import { useNavigate } from "react-router-dom";
import { Bot, Rocket } from "lucide-react";

function Home({ onStartTest, showResults }) {
  const navigate = useNavigate();

  const handleChatNavigation = () => {
    navigate("/dashboard/chat");
  };

  const handleCreateCourse = () => {
    navigate("/dashboard/create-task");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Welcome back! 👋
      </h1>
      <p className="text-gray-600">
        Ready to continue your learning journey?
      </p>

      {/* Dashboard Cards */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {/* Chatbot Card */}
        <button
          onClick={handleChatNavigation}
          className="group relative overflow-hidden rounded-2xl p-[2px] aspect-square w-full sm:w-80 md:w-96 bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-pink-500 shadow-[0_16px_32px_-20px_rgba(99,102,241,0.55)] transition-transform duration-300 hover:scale-[1.01] focus:outline-none"
        >
          <div className="relative h-full w-full rounded-2xl bg-white p-7 flex flex-col items-start justify-between overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="rounded-xl p-3 bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 transition-transform duration-300 group-hover:rotate-6">
                <Bot className="h-8 w-8" />
              </div>
              <span className="text-xs font-semibold tracking-wide text-indigo-600/80">AI POWERED</span>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">Chatbot for Career Guidance</div>
              <div className="mt-1.5 text-gray-600 text-sm md:text-base">Instant insights, role suggestions, and learning tips tailored to you.</div>
              <div className="mt-3 inline-flex flex-wrap gap-2">
                <span className="px-2.5 py-1 text-xs rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">Personalized</span>
                <span className="px-2.5 py-1 text-xs rounded-full bg-pink-50 text-pink-700 border border-pink-100">24/7</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold">
              Open Chat <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </div>
            <div className="pointer-events-none absolute -right-12 -top-12 w-40 h-40 bg-indigo-200/50 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500" />
          </div>
        </button>

        {/* Create Course Card */}
        <button
          onClick={handleCreateCourse}
          className="group relative overflow-hidden rounded-2xl p-[2px] aspect-square w-full sm:w-80 md:w-96 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-[0_16px_32px_-20px_rgba(16,185,129,0.55)] transition-transform duration-300 hover:scale-[1.01] focus:outline-none"
        >
          <div className="relative h-full w-full rounded-2xl bg-white p-7 flex flex-col items-start justify-between overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="rounded-xl p-3 bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-transform duration-300 group-hover:-rotate-6">
                <Rocket className="h-8 w-8" />
              </div>
              <span className="text-xs font-semibold tracking-wide text-emerald-600/80">BUILD & LEARN</span>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">Create Your Own Course</div>
              <div className="mt-1.5 text-gray-600 text-sm md:text-base">Plan modules, add tasks, and launch your custom learning track.</div>
              <div className="mt-3 inline-flex flex-wrap gap-2">
                <span className="px-2.5 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">Modules</span>
                <span className="px-2.5 py-1 text-xs rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100">Assignments</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 font-semibold">
              Start Building <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </div>
            <div className="pointer-events-none absolute -left-12 -bottom-12 w-40 h-40 bg-emerald-200/50 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500" />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Home;