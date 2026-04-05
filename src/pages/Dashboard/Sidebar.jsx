import React, { useEffect } from "react";
import { Home, Bot, Rocket, BookOpen, Award, LogOut, ChevronRight, X, TvMinimal, Hexagon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import useUserStore from "../../store/useUserStore";

function Sidebar({ isOpen, onClose, onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearToken } = useAuthStore();
  const { userData } = useUserStore();

  useEffect(() => {
    console.log('Sidebar isOpen:', isOpen);
  }, [isOpen]);

  const menuItems = [
    { icon: Home, label: "Home", path: "/dashboard", hidden: false },
    { icon: Bot, label: "Chatbot", path: "/dashboard/gchat", hidden: false },
    { icon: TvMinimal, label: "Courses", path: "/dashboard/courses", hidden: false },
    { icon: Rocket, label: "Create Course", path: "/dashboard/create-task", hidden: false },
    { icon: BookOpen, label: "Subscriptions", path: "/dashboard/subscription-single", hidden: userData?.premium_package !== "Basic" },
    { icon: Award, label: "Certificates", path: "/dashboard/certificates", hidden: false },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onNavigate?.();
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const handleSignOut = () => {
    clearToken();
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-30 flex flex-col w-72
          bg-white dark:bg-[#0a0a0a] shadow-[10px_0_15px_-3px_rgba(0,0,0,0.02)]
          border-r border-gray-100 dark:border-gray-800
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full bg-white dark:bg-[#0a0a0a] relative transition-colors">
          
          <div className="px-6 pt-4 pb-4 hidden lg:block">
             <div className="h-px bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 w-full" />
          </div>

          <nav className="flex-1 px-4 py-2 overflow-y-auto">
            <div className="space-y-1.5">
              {menuItems.map((item) => {
                const isActive = item.path === "/dashboard" 
                  ? location.pathname === "/dashboard" 
                  : location.pathname.startsWith(item.path);

                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      ${item.hidden ? "hidden" : "flex"}
                      items-center gap-3 px-3 py-3 rounded-xl w-full
                      transition-all duration-300 group relative overflow-hidden
                      ${isActive 
                        ? "bg-purple-50 border border-purple-100/50 dark:bg-purple-900/20 dark:border-purple-800/50" 
                        : "border border-transparent hover:bg-gray-50 dark:hover:bg-gray-800"
                      }
                    `}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-purple-600 dark:bg-purple-500 rounded-r-full shadow-[0_0_8px_rgba(147,51,234,0.5)] dark:shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
                    )}
                    
                    <item.icon 
                      className={`h-[20px] w-[20px] transition-all duration-300 
                      ${isActive ? "text-purple-600 dark:text-purple-400" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:scale-110"}`} 
                    />
                    
                    <span 
                      className={`flex-1 text-left text-[15px] leading-5 transition-colors
                      ${isActive ? "text-purple-700 dark:text-purple-300 font-semibold" : "text-gray-600 dark:text-gray-400 font-medium group-hover:text-gray-900 dark:group-hover:text-white"}`}
                    >
                      {item.label}
                    </span>
                    
                    <ChevronRight 
                      className={`h-4 w-4 transition-all duration-300 
                      ${isActive ? "text-purple-600/50 dark:text-purple-400/50" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-gray-400 dark:group-hover:text-gray-500"}`} 
                    />
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="p-4 mt-auto">
            <div className="rounded-2xl bg-gray-50/80 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 p-4 relative overflow-hidden transition-colors">
               <div className="absolute top-0 right-0 -mt-4 -mr-4 w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-2xl opacity-50"></div>
               
               <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 border border-purple-200/50 dark:border-purple-700 flex items-center justify-center text-purple-700 dark:text-purple-300 font-bold text-sm shadow-inner dark:shadow-none">
                    {userData?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-[15px] font-semibold text-gray-900 dark:text-white truncate">
                      {userData?.name || "User Mode"}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate font-medium">
                      {userData?.email || "user@anvikshai.com"}
                    </span>
                  </div>
               </div>
               
              <button
                onClick={handleSignOut}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-sm hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-300 text-sm font-semibold group focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
              >
                <LogOut className="h-[18px] w-[18px] text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                <span className="group-hover:text-black dark:group-hover:text-white transition-colors">Sign Out</span>
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Sidebar;