import { Button, Spinner } from "@material-tailwind/react";
import useTaskStore from "../../../store/useTaskStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAxios from "../../../hook/useAxios";
import ReactMarkdown from "react-markdown";
import SendIcon from "@mui/icons-material/Send";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // Import a syntax highlighting theme

function Chat() {
  const { task } = useTaskStore();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [modifiedResponse, setModifiedResponse] = useState(null);
  const axiosInstance = useAxios();

  useEffect(() => {
    if (task == null) {
      navigate("/dashboard");
    }
  }, [task, navigate]);

  const createRoadmap = async () => {
    setLoading(true);
    try {
      await axiosInstance.post(`/task/create-course/${task.taskId}`, {
        accept: true,
      });
      navigate(`/dashboard/roadmap/${task.taskId}`);
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || "Signup failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const modifyTask = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/task/accept-roadmap-modify/${task.taskId}`,
        { text: inputText }
      );
      setModifiedResponse(response.data.roadmap);
      setInputText("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail ||
        "Modification failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white-200 p-7">
      <div className="bg-purple-100 p-7 rounded-2xl shadow-2xl w-[70%] max-w-3xl">
        <div className="bg-white p-8 rounded-lg shadow-lg h-full">
          <p className="text-black prose max-w-full prose-lg prose-gray dark:prose-invert markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {task?.chat}
            </ReactMarkdown>
          </p>
        </div>
        {modifiedResponse != null ? (
          <div className="bg-white p-8 rounded-lg shadow-lg h-full mt-10">
            <p className="text-black prose max-w-full prose-lg prose-gray dark:prose-invert markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {modifiedResponse}
              </ReactMarkdown>
            </p>
          </div>
        ) : (
          ""
        )}

        <div className="flex flex-col space-y-3 mt-3 items-end">
          <Button
            color="success"
            onClick={createRoadmap}
            className="w-40"
            disabled={loading}
          >
            {loading ? "Loading..." : "Accept"}
          </Button>

          <div className="flex justify-between w-full">
            <input
              type="text"
              className="w-full h-14 px-5 focus:outline-none p-2 bg-white border-4 rounded-xl border-gray-200"
              placeholder="Ask Something"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={loading}
            />
            <button
              className="text-5xl hover:text-[#2f2f2f] disabled:opacity-50"
              onClick={modifyTask}
              disabled={loading}
            >
              {loading ? (
                <Spinner color="info" size="lg" />
              ) : (
                <SendIcon fontSize="inherit" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

// Now, whatever you type in the input will go to `modifyTask`, and the response will show up above the input! 🚀 Let me know if anything needs tweaking! 🎯
