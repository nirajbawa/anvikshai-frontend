import { BrowserRouter, Routes, Route } from "react-router";
import React from "react";
import HomePage from "./pages/home";
import RootLayout from "./layouts/RootLayout";

import DetailsPage from "./pages/home/Details";
import PaymentPage from "./pages/home/PaymentPage";
import Subscription from "./pages/home/Subscription";
import RoadMap from "./pages/home/RoadMap";
import ContactUs from "./pages/home/ContactUs";

import Assignment from "./pages/AssignmentComp/Assignment";
import Article from "./pages/ArticleComp/Article";
import Quiz from "./pages/QuizComp/Quiz";

import RoadmapComponent from "./pages/dashboard/Roadmap/Roadmappage";
import VideoPage from "./pages/dashboard/video/videopage";
import Messages from "./pages/message/Messages";
import MDashboard from "./pages/Mentor/dashboard";
import ADashboard from "./pages/Admin/Dashboard";
import Alogin from "./pages/Admin/Login";
import Mlogin from "./pages/Mentor/Login";
import Mlist from "./pages/Mentor/List";
import Alist from "./pages/Admin/List";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/details" element={<DetailsPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/roadmap" element={<RoadMap />} />
          <Route path="/contact" element={<ContactUs />} />

          <Route path="/assignment" element={<Assignment />} />
          <Route path="/article" element={<Article />} />
          <Route path="/quiz" element={<Quiz />} />

          <Route path="/dashboard/roadmap" element={<RoadmapComponent />} />
          <Route path="/dashboard/video" element={<VideoPage />} />
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
