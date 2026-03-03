import React from "react";
import { Menu, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header({ onMenuClick }) {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Mobile logo or title - visible only on mobile */}
            <h1 className="text-lg font-semibold text-gray-900 lg:hidden">
              Dashboard
            </h1>
          </div>

          {/* Search - hidden on mobile, visible on larger screens */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            {/* Add search input here if needed */}
          </div>

          {/* Action Buttons */}
          <button
            onClick={() => navigate("/dashboard/create-task")}
            className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm text-sm md:text-base"
          >
            <Plus className="h-4 w-4 md:h-5 md:w-5" />
            <span className="hidden sm:inline">New Course</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;