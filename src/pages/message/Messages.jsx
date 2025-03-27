import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Send,
  Search,
  Settings,
  Menu,
  X,
  Moon,
  Sun,
  Heart,
  ThumbsUp,
  Smile,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const contacts = [
  {
    id: 1,
    name: "AI Assistant",
    role: "Virtual Assistant",
    avatar:
      "https://images.unsplash.com/photo-1634196453269-594fcf41c3c6?w=150",
    status: "online",
  },
  {
    id: 2,
    name: "Code Helper",
    role: "Technical Support",
    avatar:
      "https://images.unsplash.com/photo-1639628735078-ed2f038a193e?w=150",
    status: "away",
  },
  {
    id: 3,
    name: "Design Bot",
    role: "Creative Assistant",
    avatar:
      "https://images.unsplash.com/photo-1635107510862-53886e926b74?w=150",
    status: "offline",
  },
];

function Messages() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I help you today? 👋",
      timestamp: new Date(),
      reactions: {},
    },
    {
      text: "I'm here to assist you with any questions you might have.",
      timestamp: new Date(),
      reactions: {},
    },
    {
      text: "Feel free to ask anything!",
      timestamp: new Date(),
      reactions: {},
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([
        ...messages,
        { text: inputMessage, timestamp: new Date(), reactions: {} },
      ]);
      setInputMessage("");
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const addReaction = (messageIndex, reaction) => {
    const newMessages = [...messages];
    if (!newMessages[messageIndex].reactions[reaction]) {
      newMessages[messageIndex].reactions[reaction] = 1;
    } else {
      newMessages[messageIndex].reactions[reaction]++;
    }
    setMessages(newMessages);
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 -z-10"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </motion.div>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="fixed md:relative inset-y-0 left-0 w-full md:w-80 lg:w-96 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-r border-gray-200 dark:border-gray-700 z-50 md:z-0"
          >
            <div className="p-4 h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <motion.h1
                  whileHover={{ scale: 1.05 }}
                  className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                >
                  AnvikshAI
                </motion.h1>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="relative mb-6">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                />
              </div>

              <div className="flex-1 overflow-y-auto space-y-2">
                {contacts.map((contact) => (
                  <motion.div
                    key={contact.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedContact(contact);
                      setSidebarOpen(false);
                    }}
                    className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedContact.id === contact.id
                        ? "bg-purple-100 dark:bg-purple-900/30"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                          ${
                            contact.status === "online"
                              ? "bg-green-500"
                              : contact.status === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                          }`}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium dark:text-white">
                        {contact.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {contact.role}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col">
        <div className="h-16 flex items-center justify-between px-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
            >
              <Menu size={20} />
            </motion.button>
            <div className="flex items-center">
              <img
                src={selectedContact.avatar}
                alt={selectedContact.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="ml-3">
                <h2 className="font-medium dark:text-white">
                  {selectedContact.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedContact.role}
                </p>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Settings size={20} />
          </motion.button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div className="relative group">
                  <div
                    className={`max-w-[85%] sm:max-w-[70%] p-3 sm:p-4 rounded-2xl ${
                      index % 2 === 0
                        ? "bg-white dark:bg-gray-800 rounded-tl-none"
                        : "bg-purple-500 dark:bg-purple-600 text-white rounded-tr-none"
                    } shadow-sm`}
                  >
                    <p className="text-sm sm:text-base">{message.text}</p>
                    <div className="flex items-center mt-1 sm:mt-2 space-x-2">
                      <Clock size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-400">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                  <div className="absolute -bottom-6 left-0 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => addReaction(index, "❤️")}
                      className="p-1.5 sm:p-1 rounded-full bg-white dark:bg-gray-800 shadow-sm"
                    >
                      <Heart size={16} className="text-red-500" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => addReaction(index, "👍")}
                      className="p-1.5 sm:p-1 rounded-full bg-white dark:bg-gray-800 shadow-sm"
                    >
                      <ThumbsUp size={16} className="text-blue-500" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => addReaction(index, "😊")}
                      className="p-1.5 sm:p-1 rounded-full bg-white dark:bg-gray-800 shadow-sm"
                    >
                      <Smile size={16} className="text-yellow-500" />
                    </motion.button>
                  </div>
                  {Object.keys(message.reactions).length > 0 && (
                    <div className="absolute -top-6 left-0 flex space-x-1">
                      {Object.entries(message.reactions).map(
                        ([reaction, count]) => (
                          <span
                            key={reaction}
                            className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded-full shadow-sm"
                          >
                            {reaction} {count}
                          </span>
                        )
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-2xl rounded-tl-none shadow-sm">
                <div className="flex space-x-2">
                  <div
                    className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-2 sm:p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="w-full p-2 sm:p-3 pr-12 rounded-xl bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 resize-none text-sm sm:text-base"
                rows={1}
              />
              <MessageCircle
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={sendMessage}
              className="p-2 sm:p-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white transition-colors"
            >
              <Send size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
