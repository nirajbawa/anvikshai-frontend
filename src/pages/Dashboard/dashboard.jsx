import React, { useState, useEffect } from "react";
import {
  Menu,
  Home,
  BookOpen,
  Award,
  LogOut,
  Plus,
  ChevronRight,
  Bot,
  Rocket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hook/useAxios";
import useAuthStore from "../../store/useAuthStore";
import useUserStore from "../../store/useUserStore";
import Chatbot from "../Chatbot/Chatbot";
import CarrierDashboard from "../CarrierLandingPage/carrierDashboard";
import EQIQTestPanel from "./EQIQTestPanel";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const { clearToken } = useAuthStore();
  const [loading, setLoading] = useState(false); // Set to false since we're using static data
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { userData } = useUserStore();
  const [showChat, setShowChat] = useState(false);
  const [chatShowSidebar, setChatShowSidebar] = useState(true);
  const [showTest, setShowTest] = useState(false);
  const [testPlan, setTestPlan] = useState(null);
  const [loadingTest, setLoadingTest] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Sample fallback plan (used when backend is not available)
  const samplePlan = {
    testId: "SE_FSWD_001",
    domain: "Software Engineering - Full Stack Web Development",
    description:
      "This test assesses your foundational knowledge and problem-solving skills relevant to a Full Stack Web Developer role. It covers topics ranging from front-end technologies and back-end development to database management and overall system design.",
    total_questions: 10,
    created_at: "2025-09-21T12:58:32.668045",
    questions: [
      {
        questionId: "FSWD_Q1",
        question: "Which of the following is NOT a front-end framework or library?",
        options: ["React", "Angular", "Vue.js", "Node.js"],
      },
      {
        questionId: "FSWD_Q2",
        question: "What is the purpose of a RESTful API?",
        options: [
          "To define the styling of web pages.",
          "To enable communication between different software systems.",
          "To manage database connections.",
          "To handle user authentication.",
        ],
      },
      {
        questionId: "FSWD_Q3",
        question: "Which HTTP method is typically used to update an existing resource?",
        options: ["GET", "POST", "PUT", "DELETE"],
      },
      {
        questionId: "FSWD_Q4",
        question:
          "What is the purpose of using environment variables in a Node.js application?",
        options: [
          "To store user session data.",
          "To define the database schema.",
          "To configure application settings without hardcoding them in the code.",
          "To manage code dependencies.",
        ],
      },
      {
        questionId: "FSWD_Q5",
        question: "Which of the following is a NoSQL database?",
        options: ["MySQL", "PostgreSQL", "Oracle", "MongoDB"],
      },
      {
        questionId: "FSWD_Q6",
        question: "What is the purpose of using version control systems like Git?",
        options: [
          "To manage project documentation.",
          "To track changes to code and collaborate effectively with others.",
          "To deploy applications to production servers.",
          "To automate testing processes.",
        ],
      },
      {
        questionId: "FSWD_Q7",
        question:
          "Which of the following is a benefit of using a component-based architecture in front-end development?",
        options: [
          "Improved code reusability and maintainability.",
          "Faster page load times.",
          "Enhanced security.",
          "Simplified database interactions.",
        ],
      },
      {
        questionId: "FSWD_Q8",
        question: "What is the purpose of middleware in Express.js?",
        options: [
          "To handle database queries.",
          "To define the routing logic of an application.",
          "To execute code before or after a request is processed.",
          "To render HTML templates.",
        ],
      },
      {
        questionId: "FSWD_Q9",
        question:
          "What does CORS stand for, and why is it important in web development?",
        options: [
          "Cross-Origin Resource Sharing; it prevents scripts from one origin from accessing resources from a different origin.",
          "Centralized Object Routing System; it manages the routing of requests within a single-page application.",
          "Common Object Request Service; it provides a standardized interface for accessing remote objects.",
          "Client-Oriented Rendering System; it optimizes the rendering of web pages on client devices.",
        ],
      },
      {
        questionId: "FSWD_Q10",
        question:
          "What is the purpose of a package manager like npm or yarn in Node.js development?",
        options: [
          "To manage operating system updates.",
          "To install, update, and manage project dependencies.",
          "To compile code into machine-executable format.",
          "To create virtual environments for Python projects.",
        ],
      },
    ],
  };

  // Build a minimal assessmentResults object for CarrierDashboard
  const buildAssessmentResults = (payload) => {
    const total = testPlan?.total_questions || (testPlan?.questions?.length || 0);
    // Simple split: half IQ, half EQ; GK unused for now
    const half = Math.floor(total / 2);
    return {
      scoreBy: { iq: 0, eq: 0, gk: 0 },
      totalBy: { iq: half, eq: total - half, gk: 0 },
      domainSuggestion: testPlan?.domain || "Software/Data oriented roles",
      answers: payload?.answers || {},
      testId: payload?.testId || testPlan?.testId,
    };
  };

  let navigate = useNavigate();
  const axiosInstance = useAxios();

  // Static task data
  const staticTasks = [
    {
      id: 1,
      task_name: "Web Development Fundamentals",
      domains: ["web development"],
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
    },
    {
      id: 2,
      task_name: "Data Structures & Algorithms",
      domains: ["programming", "algorithms"],
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
    },
    {
      id: 3,
      task_name: "React.js Masterclass",
      domains: ["react", "javascript"],
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
    },
    {
      id: 4,
      task_name: "Node.js Backend Development",
      domains: ["node", "backend"],
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
    },
    {
      id: 5,
      task_name: "Database Management",
      domains: ["database", "sql"],
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
    },
    {
      id: 6,
      task_name: "UI/UX Design Principles",
      domains: ["design", "ux"],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80"
    }
  ];

  // Fetch EQ/IQ plan from backend and open the panel
  const startEQIQTest = async () => {
    setLoadingTest(true);
    setShowChat(false);
    setShowTest(true);
    setTestPlan(samplePlan);
    setLoadingTest(false);
  };

  // Load static tasks instead of making API call
  const loadStaticTasks = () => {
    setTasks(staticTasks);
  };

  useEffect(() => {
    loadStaticTasks();
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
        <div className="w-72 h-screen sm:h-full bg-white border-r border-gray-200 px-6 py-8 pb-36 flex flex-col justify-between">
          <nav className="flex flex-col">
            {[
              { icon: Home, label: "Home", path: "/dashboard", hidden: false },
              { icon: Bot, label: "Chatbot", path: null, hidden: false, customOnClick: () => setShowChat(true) },
              { icon: Rocket, label: "Create Course", path: "/dashboard/create-task", hidden: false },
              {
                icon: BookOpen,
                label: "Subscriptions",
                path: "/dashboard/subscription-single",
                hidden: userData?.premium_package === "Basic" ? false : true,
              },
              {
                icon: Award,
                label: "Certificates",
                path: "/dashboard/certificates",
                hidden: false,
              },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  if (item.customOnClick) {
                    item.customOnClick();
                    setIsSidebarOpen(false);
                  } else if (item.path) {
                    navigate(item.path);
                    setIsSidebarOpen(false);
                  }
                }}
                className={`${
                  item.hidden ? "hidden" : "flex"
                }  items-center gap-3 px-4 py-3 rounded-xl w-full transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900`}
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

            {/* Main content area with proper conditional rendering */}
            {showResults ? (
              // Results view (integrated Carrier Dashboard)
              <div className="mt-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 shadow-sm">
                  <CarrierDashboard embedded={true} />
                </div>
              </div>
            ) : showTest ? (
              // Show test panel when showTest is true
              <div className="mt-6">
                {loadingTest && (
                  <div className="mb-3 text-sm text-gray-500">Loading latest test from server...</div>
                )}
                <EQIQTestPanel
                  plan={testPlan || samplePlan}
                  durationSeconds={((testPlan || samplePlan)?.total_questions || (testPlan || samplePlan)?.questions?.length || 10) * 60}
                  onSubmit={(payload) => {
                    const results = buildAssessmentResults(payload);
                    try {
                      localStorage.setItem('assessmentResults', JSON.stringify(results));
                    } catch {}
                    setShowTest(false);
                    setShowChat(false);
                    setShowResults(true);
                  }}
                  onClose={() => {
                    setShowTest(false);
                  }}
                />
              </div>
            ) : showChat ? (
              // Show chatbot when showChat is true and showTest is false
              <div className="mt-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-gray-900">Chatbot</h2>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setChatShowSidebar((s) => !s)}
                        className="px-3 py-1.5 text-sm rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50"
                      >
                        {chatShowSidebar ? "Hide History" : "Show History"}
                      </button>
                      <button
                        onClick={() => setShowChat(false)}
                        className="px-3 py-1.5 text-sm rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                  <Chatbot
                    embedded={true}
                    showSidebar={chatShowSidebar}
                    onToggleSidebar={setChatShowSidebar}
                    onStartTests={startEQIQTest}
                  />
                </div>
              </div>
            ) : (
              // Show dashboard cards when neither chat nor test is active
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {/* Chatbot Card (Square) */}
                <button
                  onClick={() => setShowChat(true)}
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

                {/* Create Course Card (Square) */}
                <button
                  onClick={() => navigate("/dashboard/create-task")}
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
            )}

            {/* Domain cards removed as requested */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;