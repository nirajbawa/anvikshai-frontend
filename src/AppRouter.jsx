import { BrowserRouter, Routes, Route } from "react-router";
import React from "react";
import HomePage from "./pages/home";
import RootLayout from "./layouts/RootLayout";
import Assignment from "./pages/AssignmentComp/Assignment";  // Import the new page
import Article from "./pages/ArticleComp/Article";
import Quiz from "./pages/QuizComp/Quiz";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/assignment" element={<Assignment />} /> {/* New Route */}
          <Route path="/article" element={<Article />} /> {/* New Route */}
          <Route path="/quiz" element={<Quiz />} /> {/* New Route */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
