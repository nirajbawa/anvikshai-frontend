import { Button } from "@material-tailwind/react";
import useTaskStore from "../../../store/useTaskStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAxios from "../../../hook/useAxios";
import ReactMarkdown from "react-markdown";

function Chat() {
  const { task } = useTaskStore();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state
  const axiosInstance = useAxios();

  useEffect(() => {
    if (task == null) {
      navigate("/dashboard");
    }
  }, [task, navigate]);

  const createRoadmap = async () => {
    setLoading(true); // Start loading
    try {
      await axiosInstance.post(`/task/accept-task/${task.taskId}`, {
        accept: true,
      });
      navigate(`/dashboard/roadmap/${task.taskId}`);
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || "Signup failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white-200 p-7">
      <div className="bg-purple-100 p-7 rounded-2xl shadow-2xl w-[70%] max-w-3xl">
        {/* Empty Roadmap Content Box */}
        <div className="bg-white p-8 rounded-lg shadow-lg h-full flex items-center justify-center">
          <p className="text-black">
            <ReactMarkdown>{task?.chat}</ReactMarkdown>
          </p>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col space-y-3 mt-3 items-end">
          <Button
            color="success"
            onClick={createRoadmap}
            className="w-40"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Loading..." : "Accept"}
          </Button>

          <Button color="error" className="w-40" disabled={loading}>
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
