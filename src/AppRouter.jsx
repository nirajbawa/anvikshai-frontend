import { BrowserRouter, Routes, Route } from "react-router";
import React from "react";
import HomePage from "./pages/home";
import RootLayout from "./layouts/RootLayout";

import Assignment from "./pages/AssignmentComp/Assignment";  // Import the new page
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

          <Route path="/assignment" element={<Assignment />} /> {/* New Route */}
          <Route path="/article" element={<Article />} /> {/* New Route */}
          <Route path="/quiz" element={<Quiz />} /> {/* New Route */}

          <Route path="/roadmap" element={<RoadmapComponent />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/message" element={<Messages />} />
          <Route path="/mdashboard" element={<MDashboard/>}/>
          <Route path="/adashboard" element={<ADashboard/>}/>
          <Route path="/alogin" element={<Alogin/>}/>
          <Route path="/mlogin" element={<Mlogin/>}/>
          <Route path="/mlist" element={<Mlist/>}/>
          <Route path="/alist" element={<Alist/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
