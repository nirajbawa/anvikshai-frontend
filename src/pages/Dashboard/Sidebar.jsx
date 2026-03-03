import React, { useEffect } from "react";
import { Home, Bot, Rocket, BookOpen, Award, LogOut, ChevronRight, X, TvMinimal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import useUserStore from "../../store/useUserStore";

function Sidebar({ isOpen, onClose, onNavigate }) {
  const navigate = useNavigate();
  const { clearToken } = useAuthStore();
  const { userData } = useUserStore();

  // Debug: Log when isOpen changes
  useEffect(() => {
    console.log('Sidebar isOpen:', isOpen);
  }, [isOpen]);

  const menuItems = [
    { 
      icon: Home, 
      label: "Home", 
      path: "/dashboard", 
      hidden: false 
    },
    { 
      icon: Bot, 
      label: "Chatbot", 
      path: "/dashboard/chat", 
      hidden: false 
    },
    { 
      icon: TvMinimal, 
      label: "Courses", 
      path: "/dashboard/courses", 
      hidden: false 
    },
    { 
      icon: Rocket, 
      label: "Create Course", 
      path: "/dashboard/create-task", 
      hidden: false 
    },
    {
      icon: BookOpen,
      label: "Subscriptions",
      path: "/dashboard/subscription-single",
      hidden: userData?.premium_package !== "Basic",
    },
    {
      icon: Award,
      label: "Certificates",
      path: "/dashboard/certificates",
      hidden: false,
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onNavigate?.();
    onClose();
  };

  const handleSignOut = () => {
    clearToken();
    onClose();
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
        style={{ 
          backgroundColor: 'white', // Force background color
          width: '18rem' // Ensure width is set
        }}
      >
        <div className="w-full h-full bg-white border-r border-gray-200 flex flex-col">
          {/* Header with close button for mobile */}
          <div className="flex items-center justify-between p-4 lg:hidden border-b border-gray-200">
            <span className="font-semibold text-gray-900">Menu</span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    ${item.hidden ? "hidden" : "flex"}
                    items-center gap-3 px-4 py-3 rounded-xl w-full
                    transition-all duration-200
                    text-gray-600 hover:bg-gray-50 hover:text-gray-900
                    group
                  `}
                >
                  <item.icon className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                  <span className="font-medium flex-1 text-left">{item.label}</span>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                </button>
              ))}
            </div>
          </nav>

          {/* Sign Out Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 rounded-xl w-full hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors group"
            >
              <LogOut className="h-5 w-5 text-gray-400 group-hover:text-red-600" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;