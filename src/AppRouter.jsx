import { BrowserRouter, Routes, Route } from "react-router";
import React from "react";
import HomePage from "./pages/home";
import RootLayout from "./layouts/RootLayout";
import RoadmapComponent from "./pages/dashboard/Roadmap/Roadmappage";
import VideoPage from "./pages/dashboard/video/videopage";
import Messages from "./pages/message/Messages";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/roadmap" element={<RoadmapComponent />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/message" element={<Messages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
