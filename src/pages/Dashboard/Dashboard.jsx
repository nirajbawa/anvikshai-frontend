import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxios from "../../hook/useAxios";
import useAuthStore from "../../store/useAuthStore";
import useUserStore from "../../store/useUserStore";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Home from "./Home";
import Chat from "./Chat";
import Test from "./Test";
import Results from "./Results";
import useSidebarStore from "../../store/useSidebarStore";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const { clearToken } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const { userData } = useUserStore();
  const [testPlan, setTestPlan] = useState(null);
  const [loadingTest, setLoadingTest] = useState(false);

  const { isSidebarOpen, setIsSidebarOpen } = useSidebarStore();

  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();

  // Sample fallback plan
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

  // Build assessment results
  const buildAssessmentResults = (payload) => {
    const total = testPlan?.total_questions || (testPlan?.questions?.length || 0);
    const half = Math.floor(total / 2);
    return {
      scoreBy: { iq: 0, eq: 0, gk: 0 },
      totalBy: { iq: half, eq: total - half, gk: 0 },
      domainSuggestion: testPlan?.domain || "Software/Data oriented roles",
      answers: payload?.answers || {},
      testId: payload?.testId || testPlan?.testId,
    };
  };

  // Start EQ/IQ test
  const startEQIQTest = async () => {
    setLoadingTest(true);
    setTestPlan(samplePlan);
    setLoadingTest(false);
    navigate("/dashboard/test");
  };

  // Handle test submission
  const handleTestSubmit = (payload) => {
    const results = buildAssessmentResults(payload);
    try {
      localStorage.setItem('assessmentResults', JSON.stringify(results));
    } catch {}
    navigate("/dashboard/results");
  };

  // Handle test close
  const handleTestClose = () => {
    navigate("/dashboard");
  };

  // Load static tasks
  const loadStaticTasks = () => {
    setTasks(staticTasks);
  };

  useEffect(() => {
    loadStaticTasks();
  }, []);

  // Determine which page to render based on route
  const renderContent = () => {
    const path = location.pathname;

    if (path === "/dashboard/results") {
      return <Results />;
    } else if (path === "/dashboard/test") {
      return (
        <Test
          plan={testPlan || samplePlan}
          loadingTest={loadingTest}
          onSubmit={handleTestSubmit}
          onClose={handleTestClose}
        />
      );
    } else if (path === "/dashboard/chat") {
      return <Chat onStartTest={startEQIQTest} />;
    } else {
      // Default to home page
      return <Home onStartTest={startEQIQTest} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0 transition-all duration-300">
        {/* <Header onMenuClick={() => setIsSidebarOpen()} /> */}
        
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;