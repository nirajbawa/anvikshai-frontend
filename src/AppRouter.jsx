import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./pages/LandingPage/HomePage";
import SignUp from "./pages/SignUp/signup";
import Login from "./pages/LogIn/login";
import DetailsPage from "./pages/home/Details";
import PaymentPage from "./pages/home/PaymentPage";
import Subscription from "./pages/home/Subscription";
import RoadMap from "./pages/home/RoadMap";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard/dashboard";
import CreateTask from "./pages/Dashboard/createtask";
import { useState } from "react";
import "./index.css";

import Assignment from "./pages/AssignmentComp/Assignment"; // Import the new page
import Article from "./pages/ArticleComp/Article";
import Quiz from "./pages/QuizComp/Quiz";

import RoadmapComponent from "./pages/dashboard/Roadmap/Roadmappage";
import VideoPage from "./pages/dashboard/video/VideoPage";
import Messages from "./pages/message/Messages";
import MDashboard from "./pages/Mentor/dashboard";
import ADashboard from "./pages/Admin/Dashboard";
import Alogin from "./pages/Admin/Login";
import Mlogin from "./pages/Mentor/Login";
import Mlist from "./pages/Mentor/List";
import Alist from "./pages/Admin/List";
import OtpPage from "./pages/otp";
import DashboardLayout from "./layouts/DashboardLayout";

const AppRouter = () => {
  const [tasks, setTasks] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp/:email" element={<OtpPage />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/details" element={<DetailsPage />} />
          {/* Add more routes as needed */}
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/roadmap" element={<RoadMap />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/create-task"
            element={<CreateTask setTasks={setTasks} />}
          />
          <Route path="/assignment" element={<Assignment />} />{" "}
          {/* New Route */}
          <Route path="/article" element={<Article />} /> {/* New Route */}
          <Route path="/quiz" element={<Quiz />} /> {/* New Route */}
          <Route path="/roadmap" element={<RoadmapComponent />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/message" element={<Messages />} />
          <Route path="/mdashboard" element={<MDashboard />} />
          <Route path="/adashboard" element={<ADashboard />} />
          <Route path="/alogin" element={<Alogin />} />
          <Route path="/mlogin" element={<Mlogin />} />
          <Route path="/mlist" element={<Mlist />} />
          <Route path="/alist" element={<Alist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
