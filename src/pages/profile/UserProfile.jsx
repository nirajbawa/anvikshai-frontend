import React, { useState, useRef, useEffect } from "react";
import {
  Award,
  BookOpen,
  Crown,
  GraduationCap,
  Medal,
  Star,
  Trophy,
  User,
  X,
  ChevronRight,
  Sparkles,
  Share2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import useUserStore from "../../store/useUserStore";
import useAxios from "../../hook/useAxios";
import { Button } from "@material-tailwind/react";
import * as Icons from "lucide-react";

const baseURL = import.meta.env.VITE_FRONTEND_URL;

function UserProfile() {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { userData } = useUserStore();
  const axiosInstance = useAxios();
  const [certificates, setCertificates] = useState([]);
  //   const gradient = getRandomGradientClass();

  const gradientClasses = [
    "bg-gradient-to-br from-yellow-400 to-yellow-600",
    "bg-gradient-to-tr from-red-400 to-red-600",
    "bg-gradient-to-r from-blue-400 to-blue-600",
    "bg-gradient-to-bl from-green-400 to-green-600",
    "bg-gradient-to-tl from-purple-400 to-purple-600",
    "bg-gradient-to-b from-pink-400 to-pink-600",
    "bg-gradient-to-t from-indigo-400 to-indigo-600",
    "bg-gradient-to-l from-teal-400 to-teal-600",
  ];

  const getRandomGradientClass = () => {
    const index = Math.floor(Math.random() * gradientClasses.length);
    return gradientClasses[index];
  };

  const user = {
    name: "Bhavesh Kale",
    avatar: "",
    education: "Undergraduate",
    university: "K.K.wagh institute of Engineering education and research",
    stream: "Computer Science & Engineering",
    completedCourses: [
      {
        name: "Advanced Web Development",
        progress: 100,
        description:
          "Mastered modern web development techniques including React, Node.js, and responsive design.",
        completedDate: "2024-02-15",
        certificate: "https://example.com/certificate/web-dev",
      },
      {
        name: "Machine Learning Fundamentals",
        progress: 100,
        description:
          "Covered core ML concepts, algorithms, and practical applications using Python and TensorFlow.",
        completedDate: "2024-01-20",
        certificate: "https://example.com/certificate/ml",
      },
      {
        name: "Data Structures & Algorithms",
        progress: 100,
        description:
          "In-depth study of fundamental data structures and algorithmic techniques.",
        completedDate: "2023-12-10",
        certificate: "https://example.com/certificate/dsa",
      },
    ],
    plan: {
      type: "Premium",
      validUntil: "2025-03-20",
    },
    badges: [
      {
        name: "Early Adopter",
        icon: Star,
        color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
        description: "One of the first 100 users to join the platform",
        earnedDate: "2023-10-01",
      },
      {
        name: "Course Champion",
        icon: Trophy,
        color: "bg-gradient-to-br from-purple-400 to-purple-600",
        description: "Completed 10 courses with excellence",
        earnedDate: "2024-01-15",
      },
      {
        name: "Top Performer",
        icon: Crown,
        color: "bg-gradient-to-br from-blue-400 to-blue-600",
        description: "Consistently scored in the top 5% of all assessments",
        earnedDate: "2024-02-01",
      },
      {
        name: "Achievement Master",
        icon: Medal,
        color: "bg-gradient-to-br from-green-400 to-green-600",
        description: "Unlocked all achievements in multiple courses",
        earnedDate: "2024-02-28",
      },
    ],
  };

  const fetchCertificates = async () => {
    try {
      const response = await axiosInstance.get("/content/certificates");
      console.log("Form submitted successfully:", response.data);

      const data = response?.data.data.map((data) => {
        const iconName = getRandomIconName();
        const Icon = Icons[iconName];
        const color = getRandomGradientClass();
        return {
          task_name: data.task_name,
          task_id: data.task_id,
          icon: Icon,
          color: color,
        };
      });
      setCertificates(data);

      //   toast.success("On boarding successful!");
      //   navigate("/dashboard/subscription");
    } catch (error) {
      console.error("Form submission failed:", error);
      //   const errorMessage =
      //     error.response?.data?.detail || "Error in on onboarding.";
      //   toast.error(errorMessage);
    }
  };

  const iconNames = Object.keys(Icons);

  const getRandomIconName = () => {
    const randomIndex = Math.floor(Math.random() * iconNames.length);
    return iconNames[randomIndex];
  };

  const downloadCertificate = async (id) => {
    try {
      const response = await axiosInstance.get(
        `/task/download-certificate/${id}`,
        {
          responseType: "blob", // Important: Get binary data
        }
      );

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary anchor tag
      const link = document.createElement("a");
      link.href = url;

      // Set filename (you can get it from response headers if available)
      const contentDisposition = response.headers["content-disposition"];
      let filename = "certificate.pdf";
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (fileNameMatch.length === 2) filename = fileNameMatch[1];
      }

      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download certificate:", err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const handleCopy = (id) => {
    navigator.clipboard.writeText(
      `${baseURL}/badge/${id}?name=${
        userData.first_name + " " + userData.last_name
      }&email=${userData.email}`
    );
    //   .then(() =>
    //     alert(

    //     )
    //   )
    //   .catch((err) => alert("Failed to copy URL: " + err));
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <motion.div
        className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="relative mb-16 text-center"
          variants={itemVariants}
        >
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
          >
            <motion.img
              className="w-40 h-40 rounded-full border-4 border-white shadow-xl mx-auto"
              src={`https://ui-avatars.com/api/?name=${userData?.first_name}+${userData?.last_name}?background=random`}
              alt={userData.first_name}
            />
            <div className="absolute bottom-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-2 shadow-lg">
              <User className="w-5 h-5 text-white" />
            </div>
          </motion.div>

          <h1 className="mt-6 text-4xl capitalize font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {userData.first_name} {userData.last_name}
          </h1>
          <div className="mt-2 text-gray-600 capitalize flex items-center justify-center space-x-2">
            <GraduationCap className="w-5 h-5" />
            <span>{userData.education}</span>
          </div>
          <div className="mt-1 text-gray-600">
            <span className="text-purple-600 capitalize font-medium">
              {userData.stream_of_education}
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mb-12 bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Crown className="w-8 h-8" />
                <h2 className="text-2xl font-bold">Premium Plan</h2>
              </div>
              {userData.premium_package == "Basic" ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-white text-purple-600 rounded-full font-medium hover:shadow-lg transition-shadow duration-300"
                >
                  Upgrade Plan
                </motion.button>
              ) : (
                ""
              )}
            </div>
            <p className="mt-2 text-purple-100">
              Valid until {new Date(userData.validTill).toLocaleDateString()}
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex items-center mb-8">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold ml-3">Completed Courses</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((course, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
                onClick={() => setSelectedCourse(course)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {course.task_name}
                  </h3>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                {/* <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  />
                </div> */}
                <p className="text-sm text-gray-600 line-clamp-2">
                  <Button>View</Button>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="flex items-center mb-8">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-semibold ml-3">Earned Badges</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {certificates.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => setSelectedBadge(badge)}
                >
                  <div
                    className={`w-24 h-24 rounded-full ${badge.color} p-6 shadow-lg mb-3 flex items-center justify-center`}
                  >
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center">
                    {badge?.task_name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBadge(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedBadge(null)}
                className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>

              <div className="text-center mb-8" id="badge-capture">
                <div className="relative inline-block">
                  <motion.div
                    className={`w-40 h-40 rounded-full ${selectedBadge.color} p-8 shadow-2xl mx-auto mb-6 flex items-center justify-center relative overflow-hidden group`}
                    whileHover={{ scale: 1.05 }}
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent rotate-45"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_30%,_currentColor_70%)] animate-pulse"></div>
                    </div>

                    <div className="relative">
                      <selectedBadge.icon className="w-20 h-20 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </div>

                    <div className="absolute inset-0 border-4 border-white opacity-20 rounded-full"></div>
                    <div className="absolute inset-2 border-2 border-white opacity-10 rounded-full animate-spin-slow"></div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-3 shadow-lg"
                  >
                    <Award className="w-6 h-6 text-white" />
                  </motion.div>
                </div>

                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {selectedBadge.name}
                </h3>

                <div className="flex items-center justify-center text-gray-600 mb-4">
                  <Trophy className="w-4 h-4 mr-2" />
                  {/* <span>
                    Earned on{" "}
                    {new Date(selectedBadge.earnedDate).toLocaleDateString()}
                  </span> */}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 mb-6">
                <p className="text-gray-700 text-center leading-relaxed">
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleCopy(selectedBadge.task_id);
                    }}
                  >
                    Copy URL
                  </Button>
                </p>
              </div>

              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                  onClick={() => {
                    const badgeElement =
                      document.getElementById("badge-capture");
                    if (badgeElement) {
                      html2canvas(badgeElement).then((canvas) => {
                        const image = canvas.toDataURL("image/png");
                        const link = document.createElement("a");
                        link.download = `${selectedBadge.task_name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}-badge.png`;
                        link.href = image;
                        link.click();
                      });
                    }
                  }}
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share Badge</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCourse(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-lg w-full"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {selectedCourse.task_name}
                </h3>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-4">
                {/* <p className="text-gray-600">{selectedCourse.description}</p> */}
                {/* <div className="flex items-center text-sm text-gray-500"> */}
                {/* <BookOpen className="w-4 h-4 mr-2" /> */}
                {/* <span>
                    Completed on{" "}
                    {new Date(
                      selectedCourse.completedDate
                    ).toLocaleDateString()}
                  </span> */}
                {/* </div> */}
                <button
                  onClick={() => downloadCertificate(selectedCourse.task_id)}
                  className="block w-full cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg text-center hover:shadow-lg transition-shadow duration-300"
                >
                  View Certificate
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserProfile;
