import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
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
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import useAxios from "../../hook/useAxios";
import { useNavigate, useParams } from "react-router";

// const contacts = [
//   {
//     id: 1,
//     name: "AI Assistant",
//     role: "Virtual Assistant",
//     avatar:
//       "https://images.unsplash.com/photo-1634196453269-594fcf41c3c6?w=150",
//     status: "online",
//   },
//   {
//     id: 2,
//     name: "Code Helper",
//     role: "Technical Support",
//     avatar:
//       "https://images.unsplash.com/photo-1639628735078-ed2f038a193e?w=150",
//     status: "away",
//   },
//   {
//     id: 3,
//     name: "Design Bot",
//     role: "Creative Assistant",
//     avatar:
//       "https://images.unsplash.com/photo-1635107510862-53886e926b74?w=150",
//     status: "offline",
//   },
// ];

function Messages() {
  const [selectedContact, setSelectedContact] = useState();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [socket, setSocket] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const messagesEndRef = useRef(null);
  const axiosInstance = useAxios();
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchMentorData = async (mentorId) => {
    try {
      const response = await axiosInstance.get(`/mentor/${mentorId}`);
      console.log(response);
      setMentors([
        {
          id: response.data?.data.id,
          name:
            response.data?.data.first_name +
            " " +
            response.data?.data.last_name,
          avatar: `https://ui-avatars.com/api/?name=${response.data?.data?.first_name}+${response.data?.data?.last_name}?background=random`,
          status: "online",
        },
      ]);
      setSelectedContact({
        id: response.data?.data.id,
        name:
          response.data?.data.first_name + " " + response.data?.data.last_name,
        avatar: `https://ui-avatars.com/api/?name=${response.data?.data?.first_name}+${response.data?.data?.last_name}?background=random`,
        status: "online",
      });
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.detail ||
        "Mentor data fetching failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const fetchAllTasks = async () => {
    setIsLoadingHistory(true);
    try {
      const response = await axiosInstance.get("/task/");
      // Filter tasks that have a mentor assigned
      const mentoredTasks = response.data.data.filter(t => t.mentor !== null);
      setAllTasks(mentoredTasks);
    } catch (error) {
      console.error("Error fetching tasks for history:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const fetcCourseData = async () => {
    try {
      const response = await axiosInstance.get(`task/${id}`);
      console.log(response);
      setCourseData(response.data?.data);
      if (response.data?.data.mentor == null) {
        navigate("/");
      } else {
        fetchMentorData(response.data?.data.mentor);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail ||
        "Course fetching failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axiosInstance.get(`/mentor/messages/${id}`);
      console.log(response);
      // setCourseData(response.data?.data);
      setMessages(response.data?.data);
    } catch (error) {
      // const errorMessage =
      //   error.response?.data?.detail ||
      //   "Course fetching failed. Please try again.";
      // toast.error(errorMessage);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const connectWebSocket = () => {
    const ws = new WebSocket(
      `ws://127.0.0.1:8000/mentor/ws/${courseData.user}`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    setSocket(ws);
  };

  const sendMessage = () => {
    if (socket && mentors[0]?.id && inputMessage) {
      const payload = {
        receiver_id: mentors[0]?.id,
        message: inputMessage,
        sender: "user",
        course_id: courseData.id,
      };
      const messageData = JSON.stringify(payload);
      setMessages((prev) => [...prev, payload]);
      socket.send(messageData);
      setInputMessage("");
    } else {
      toast.error("Enter receiver ID and message!");
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (courseData != null && mentors.length != 0) connectWebSocket();
  }, [courseData, mentors]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  useEffect(() => {
    fetchMessages();
    fetcCourseData();
    fetchAllTasks();
  }, [id]);

  return (
    <div
      className="h-[calc(100vh-64px)] flex overflow-hidden bg-white dark:bg-[#0a0a0a] transition-all duration-300 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 dark:from-[#0a0a0a] dark:via-[#0a0a0a] dark:to-[#0a0a0a] -z-10"></div>
 
      {/* History Sidebar */}
      <AnimatePresence>
        {isHistoryOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="absolute lg:relative z-20 w-80 h-full bg-white/95 dark:bg-[#121212]/95 backdrop-blur-xl border-r border-gray-100 dark:border-gray-800 shadow-2xl lg:shadow-none flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                <Search size={18} className="text-purple-500" />
                Chat History
              </h3>
              <button 
                onClick={() => setIsHistoryOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
 
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {isLoadingHistory ? (
                <div className="flex flex-col gap-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-20 bg-gray-100 dark:bg-gray-800/50 animate-pulse rounded-xl" />
                  ))}
                </div>
              ) : allTasks.length > 0 ? (
                allTasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => {
                      navigate(`/dashboard/messages/${task.id}`);
                      if (window.innerWidth < 1024) setIsHistoryOpen(false);
                    }}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 border ${
                      id === task.id.toString()
                        ? "bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800"
                        : "bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-gray-100 dark:hover:border-gray-800"
                    }`}
                  >
                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                      {task.task_name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(task.created_at).toLocaleDateString()}
                    </p>
                  </button>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-sm text-gray-500">No other chats found.</p>
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 relative">
        <div className="h-16 flex items-center justify-between px-6 bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-gray-800 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              className={`p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center border ${
                isHistoryOpen 
                  ? "bg-purple-100 dark:bg-purple-900/40 border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300"
                  : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-purple-300 dark:hover:border-purple-600"
              }`}
              title="Toggle History"
            >
              <Menu size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="p-2.5 rounded-xl bg-purple-600 dark:bg-purple-700 text-white shadow-lg shadow-purple-500/20 hover:bg-purple-700 dark:hover:bg-purple-600 transition-all duration-300 flex items-center justify-center border border-purple-400 dark:border-purple-500/30"
              title="Go Back"
            >
              <ArrowLeft size={20} className="stroke-[3px]" />
            </motion.button>
            <div className="flex items-center">
              <img
                src={selectedContact?.avatar}
                alt={selectedContact?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="ml-3">
                <h2 className="font-bold text-lg text-gray-900 dark:text-white">
                  {selectedContact?.name || "Mentor Chat"}
                </h2>
                {/* <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedContact?.role}
                </p> */}
              </div>
            </div>
          </div>
          {/* <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Settings size={20} />
          </motion.button> */}
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-gray-50/50 dark:bg-[#0a0a0a]">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="relative group">
                  <div
                    className={`max-w-[85%] sm:max-w-[70%] p-4 rounded-2xl ${
                      message.sender !== "user"
                        ? "bg-white dark:bg-gray-800 border border-gray-100 dark:border-purple-900/20 rounded-tl-none shadow-sm"
                        : "bg-purple-600 dark:bg-purple-700 text-white rounded-tr-none shadow-md"
                    }`}
                  >
                    {message.sender !== "user" && (
                      <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
                        {message.sender}
                      </p>
                    )}
                    <p className="text-sm sm:text-base text-gray-900 dark:text-gray-100">{message.message}</p>
                    {/* <div className="flex items-center mt-1 sm:mt-2 space-x-2">
                      <Clock
                        size={12}
                        className={
                          message.sender !== "user"
                            ? "text-gray-400"
                            : "text-purple-200"
                        }
                      />
                      <span
                        className={
                          message.sender !== "user"
                            ? "text-xs text-gray-400"
                            : "text-xs text-purple-200"
                        }
                      >
                        {formatTime(message.timestamp)}
                      </span>
                    </div> */}
                  </div>
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

        <div className="p-4 md:p-6 bg-white dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="w-full p-4 pr-12 rounded-2xl bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 resize-none text-base text-gray-900 dark:text-gray-100 border border-gray-100 dark:border-gray-800"
                rows={1}
              />
              <MessageCircle
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                size={20}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={!inputMessage.trim()}
              onClick={sendMessage}
              className={`p-2 sm:p-3 rounded-xl transition-colors ${
                inputMessage.trim()
                  ? "bg-purple-500 hover:bg-purple-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
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
