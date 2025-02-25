import { BrowserRouter, Routes, Route } from "react-router";
import React from "react";
import HomePage from "./pages/home";
import RootLayout from "./layouts/RootLayout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
