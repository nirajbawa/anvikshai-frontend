import { Lock, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router";
import useAxios from "../../hook/useAxios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const RequestMentor = ({ isPremiumUser, courseData }) => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  console.log(courseData);
  const requestMentor = async () => {
    try {
      await axiosInstance.get(`/mentor/allocate-mentor/${courseData.id}`);
      toast.success("Mentor allocated successfully..!");
      navigate(`/dashboard/messages/${courseData.id}`);
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail ||
        "Error in allocating mentor. Please try again.";
      toast.error(errorMessage);
    }
  };

  const chat = () => {
    navigate(`/dashboard/messages/${courseData.id}`);
  };

  useEffect(() => {
    console.log(courseData);
  }, []);

  return (
    <div className="relative w-full lg:w-2/5">
      <div
        className={`text-black lg:absolute p-4 md:p-6  inset-0  rounded-lg shadow-lg bg-gradient-to-br from-purple-100 to-indigo-50 ${
          !isPremiumUser ? "blur-[2px]" : ""
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="text-purple-600 w-6 h-6" />
            <h2 className="text-lg font-bold">Chat with Mentor</h2>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            Get personalized guidance from experienced mentors who can help you
            accelerate your learning journey.
          </p>

          <div className="h-44 flex justify-center items-center">
            {courseData?.mentor === null ? (
              <button
                onClick={requestMentor}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300
   ${
     isPremiumUser
       ? "bg-purple-600 hover:bg-purple-700 transform hover:scale-102"
       : "bg-gray-400"
   }`}
              >
                Request Mentor
              </button>
            ) : (
              <button
                onClick={chat}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300
   ${
     isPremiumUser
       ? "bg-purple-600 hover:bg-purple-700 transform hover:scale-102"
       : "bg-gray-400"
   }`}
              >
                Start Chat
              </button>
            )}
          </div>
        </div>
      </div>

      {!isPremiumUser && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 rounded-lg backdrop-blur-0">
          <Link to="/dashboard/subscription-single">
            <Lock className="w-12 h-12 text-white mb-3" />
          </Link>
          <p className="text-white font-semibold text-lg mb-1">
            Premium Feature
          </p>
          <p className="text-white/90 text-sm text-center px-4">
            Upgrade to Premium to unlock mentor chat
          </p>
        </div>
      )}
    </div>
  );
};

export default RequestMentor;
