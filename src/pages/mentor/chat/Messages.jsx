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
import useAxios from "../../../hook/useAxios";
import { useNavigate, useParams } from "react-router";
import CourseModel from "./CourseModel";

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

function MentorMessages() {
  const [selectedContact, setSelectedContact] = useState();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [socket, setSocket] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [mentors, setMentors] = useState([]);
  const messagesEndRef = useRef(null);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState();
  const [model, setModel] = useState(false);

  const handleModel = () => {
    setModel((state) => !state);
  };

  // const fetchMentorData = async (mentorId) => {
  //   try {
  //     const response = await axiosInstance.get(`/mentor/${mentorId}`);
  //     console.log(response);
  //     setMentors([
  //       {
  //         id: response.data?.data.id,
  //         name:
  //           response.data?.data.first_name +
  //           " " +
  //           response.data?.data.last_name,
  //         avatar: `https://ui-avatars.com/api/?name=${response.data?.data?.first_name}+${response.data?.data?.last_name}?background=random`,
  //         status: "online",
  //       },
  //     ]);
  //     setSelectedContact({
  //       id: response.data?.data.id,
  //       name:
  //         response.data?.data.first_name + " " + response.data?.data.last_name,
  //       avatar: `https://ui-avatars.com/api/?name=${response.data?.data?.first_name}+${response.data?.data?.last_name}?background=random`,
  //       status: "online",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     const errorMessage =
  //       error.response?.data?.detail ||
  //       "Mentor data fetching failed. Please try again.";
  //     toast.error(errorMessage);
  //   }
  // };

  const fetcCourseData = async () => {
    try {
      const response = await axiosInstance.get(`/mentor/dashboard/courses`);
      console.log(response);
      setCourseData(response.data?.data);
      const data = response.data?.data.map((data) => ({
        id: data._id,
        mentor: data.mentor,
        user: data.user,
        name: data.user_details.first_name + " " + data.user_details.last_name,
        avatar: `https://ui-avatars.com/api/?name=${data?.user_details.first_name}+${data?.user_details.last_name}?background=random`,
        status: "online",
      }));
      setMentors(data);
      if (data.length != 0) {
        setSelectedContact(data[0]);
        setSelectedCourse(response.data?.data[0]);
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
      const response = await axiosInstance.get(
        `/mentor/dashboard/messages/${selectedContact.id}`
      );
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
      `ws://127.0.0.1:8000/mentor/ws/${selectedContact.mentor}`
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    setSocket(ws);
  };

  const sendMessage = () => {
    if (socket && selectedContact.id && inputMessage) {
      const payload = {
        receiver_id: selectedContact.user,
        message: inputMessage,
        sender: "mentor",
        course_id: selectedContact.id,
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
    if (selectedContact != undefined) {
      fetchMessages();
    }
  }, [selectedContact]);

  useEffect(() => {
    fetcCourseData();
  }, []);

  return (
    <div
      className={`h-[95vh] sm:h-[43rem] flex overflow-hidden ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <CourseModel
        model={model}
        handler={handleModel}
        title={"Course Details"}
        bio={selectedCourse?.generated_roadmap_text}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 -z-10"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
      </motion.div>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="fixed inset-y-0 left-0 w-full md:w-80 lg:w-96 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-r border-gray-200 dark:border-gray-700 z-50"
          >
            <div className="p-4 h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ArrowLeft size={20} />
                  </motion.button>
                  <motion.h1
                    whileHover={{ scale: 1.05 }}
                    className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                  >
                    AnvikshAI
                  </motion.h1>
                </div>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
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
                {mentors.map((contact) => (
                  <motion.div
                    key={contact.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedContact(contact);
                      setSelectedCourse(
                        courseData.find((data) => data._id == contact.id)
                      );
                      setSidebarOpen(false);
                    }}
                    className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedContact?.id === contact.id
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
                      {/* <p className="text-sm text-gray-500 dark:text-gray-400">
                        {contact.role}
                      </p> */}
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
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
            >
              <Menu size={20} />
            </motion.button>
            <div className="flex items-center">
              <img
                src={selectedContact?.avatar}
                alt={selectedContact?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="ml-3">
                <h2 className="font-medium dark:text-white">
                  {selectedContact?.name}
                </h2>
                {/* <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedContact?.role}
                </p> */}
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={handleModel}
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
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="relative group">
                  <div
                    className={`max-w-[85%] sm:max-w-[70%] w-44 sm:min-w-52 p-3 sm:p-4 rounded-2xl ${
                      message.sender !== "user"
                        ? "bg-white dark:bg-gray-800 rounded-tl-none"
                        : "bg-purple-500 dark:bg-purple-600 text-white rounded-tr-none"
                    } shadow-sm`}
                  >
                    {message.sender !== "user" && (
                      <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
                        {message.sender}
                      </p>
                    )}
                    <p className="text-sm sm:text-base">{message.message}</p>
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

export default MentorMessages;
