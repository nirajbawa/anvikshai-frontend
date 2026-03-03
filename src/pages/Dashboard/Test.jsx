import React from "react";
import EQIQTestPanel from "./EQIQTestPanel";

function Test({ plan, loadingTest, onSubmit, onClose }) {
  return (
    <div className="max-w-7xl mx-auto">
      {loadingTest && (
        <div className="mb-3 text-sm text-gray-500">Loading latest test from server...</div>
      )}
      <EQIQTestPanel
        plan={plan}
        durationSeconds={(plan?.total_questions || plan?.questions?.length || 10) * 60}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </div>
  );
}

export default Test;