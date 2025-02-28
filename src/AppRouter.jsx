import { BrowserRouter, Routes, Route } from "react-router";
import React from "react";
import DetailsPage from "./pages/home/Details";
import PaymentPage from "./pages/home/PaymentPage";
import Subscription from "./pages/home/Subscription";
import RoadMap from "./pages/home/RoadMap";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/details" exact element={<DetailsPage />} />
        {/* Add more routes as needed */}
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/roadmap" element={<RoadMap />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
