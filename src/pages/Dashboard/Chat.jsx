import React, { useState } from "react";
import Chatbot from "../Chatbot/Chatbot";

function Chat({ onStartTest }) {
  const [chatShowSidebar, setChatShowSidebar] = useState(true);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-3 sm:p-4 shadow-sm transition-colors">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chatbot</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setChatShowSidebar((s) => !s)}
              className="px-3 py-1.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {chatShowSidebar ? "Hide History" : "Show History"}
            </button>
          </div>
        </div>
        <Chatbot
          embedded={true}
          showSidebar={chatShowSidebar}
          onToggleSidebar={setChatShowSidebar}
          onStartTests={onStartTest}
        />
      </div>
    </div>
  );
}

export default Chat;