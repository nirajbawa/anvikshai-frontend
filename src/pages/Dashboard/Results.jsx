import React from "react";
import CarrierDashboard from "../CarrierLandingPage/carrierDashboard";

function Results() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 shadow-sm">
        <CarrierDashboard embedded={true} />
      </div>
    </div>
  );
}

export default Results;