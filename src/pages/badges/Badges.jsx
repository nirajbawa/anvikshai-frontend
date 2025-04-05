import React, { useEffect, useState } from "react";
import { Medal, Book, User, Award, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "react-router";
import useAxios from "../../hook/useAxios";
import { useParams } from "react-router";
import * as Icons from "lucide-react";

const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  verified: true,
  courseName: "Advanced Web Development",
  courseDescription:
    "A comprehensive course covering modern web development techniques, including React, TypeScript, and responsive design principles.",
  badges: [
    {
      id: 1,
      name: "JavaScript Master",
      icon: <Award className="w-8 h-8 text-yellow-500" />,
    },
    {
      id: 2,
      name: "React Expert",
      icon: <Medal className="w-8 h-8 text-blue-500" />,
    },
    {
      id: 3,
      name: "TypeScript Pro",
      icon: <Award className="w-8 h-8 text-blue-600" />,
    },
  ],
};

function Badges() {
  const [searchParams] = useSearchParams();
  let { taskId } = useParams();

  const user = searchParams.get("name");
  const email = searchParams.get("email");
  const [badgeData, setBadgeData] = useState(null);

  const axiosInstance = useAxios();

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

  const iconNames = Object.keys(Icons);

  const getRandomIconName = () => {
    const randomIndex = Math.floor(Math.random() * iconNames.length);
    return iconNames[randomIndex];
  };

  const fetchCertificate = async () => {
    try {
      const iconName = getRandomIconName();
      const Icon = Icons[iconName];
      const color = getRandomGradientClass();
      const response = await axiosInstance.get(
        `/content/certificate/$${taskId}`
      );
      console.log("Form submitted successfully:", response.data);
      const data = response?.data.data;
      setBadgeData({
        task_name: data.task_name,
        task_id: data.task_id,
        icon: Icon,
        color: color,
      });
      //   toast.success("On boarding successful!");
      //   navigate("/dashboard/subscription");
    } catch (error) {
      console.error("Form submission failed:", error);
      //   const errorMessage =
      //     error.response?.data?.detail || "Error in on onboarding.";
      //   toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchCertificate();
  }, []);

  return (
    <div className="min-h-screen bg-custom-bg flex items-center justify-center px-4 py-8">
      <div className="max-w-7xl w-full flex flex-col md:flex-row gap-8">
        {/* Badges Section */}
        <div className="w-full md:w-1/3">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Medal className="w-6 h-6 text-indigo-600" />
              Badge
            </h2>
            <div className="space-y-4"></div>
            {badgeData != null ? (
              <div className="flex flex-col items-center cursor-pointer">
                <div
                  className={`w-24 h-24 rounded-full ${badgeData.color} p-6 shadow-lg mb-3 flex items-center justify-center`}
                >
                  <badgeData.icon className="w-12 h-12 text-white" />
                </div>
                <span className="text-sm font-medium capitalize text-gray-700 text-center">
                  {badgeData?.task_name}
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* Course Information Section */}
        <div className="w-full md:w-2/3">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <User className="w-6 h-6 text-indigo-600" />
                <h1 className="text-3xl font-bold text-gray-800 capitalize">
                  {user}
                </h1>
              </div>
              <div className="ml-9 space-y-2">
                <div className="text-gray-600">{email}</div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified</span>
                </div>
              </div>
              <div className="h-px bg-gray-200 my-6"></div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Book className="w-5 h-5 text-indigo-600" />
                    {badgeData != null ? (
                      <h2 className="text-xl font-semibold text-gray-800">
                        {badgeData.task_name}
                      </h2>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Badges;
