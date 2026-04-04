import React from "react";
import CarrierDashboard from "../CarrierLandingPage/carrierDashboard";

function Results() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-3 sm:p-4 shadow-sm transition-colors">
        <CarrierDashboard embedded={true} />
      </div>
    </div>
  );
}

export default Results;