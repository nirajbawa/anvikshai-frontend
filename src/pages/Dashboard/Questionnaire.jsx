import { useEffect, useState } from "react";
import { AlertCircle, RefreshCw, Send } from "lucide-react";
import useAxios from "../../hook/useAxios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import useDetailsQuestionnaireStore from "../../store/useDetailsQuestionnaireStore";
import useTaskStore from "../../store/useTaskStore";
import { Spinner } from "@material-tailwind/react";

function Questionnaire() {
  let { taskId } = useParams();
  const [answers, setAnswers] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const { questions: qs, clearQuestions } = useDetailsQuestionnaireStore();
  const { setTask, clearTask } = useTaskStore();
  const [swithcCount, setSwitchCount] = useState(0);

  const progress = (Object.keys(answers).length / questions.length) * 100;

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all answers?")) {
      setAnswers({});
      setSubmitted(false);
      setShowConfirmation(false);
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setShowConfirmation(true);
  };
  
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert("Dont switch tabs!");
        setSwitchCount((prev) => prev + 1);
        // You can alert, log, or even auto-submit quiz
      } else {
        // console.log("User is back on the tab.");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (swithcCount > 1) {
      navigate(-1);
    }
  }, [swithcCount]);

  const confirmSubmit = async () => {
    setSubmitted(true);
    console.log(answers);
    try {
      clearTask();
      const payload = qs?.questions.map((q, index) => ({
        question: q.text,
        options: q.options,
        answer: answers[index + 1],
      }));

      const response = await axiosInstance.post(
        `/task/create-roadmap/${taskId}`,
        {
          questions: payload,
        }
      );
      setTask({ chat: response.data.roadmap, taskId: response.data.task_id });
      toast.success("Roadmap created successfully!");
      clearQuestions();
      navigate("/dashboard/chat");
    } catch (error) {
      console.error("Error in creating roadmap", error);
      toast.error("Failed to creating roadmap.");
    } finally {
      setSubmitted(false);
      setShowConfirmation(false);
    }
  };

  useEffect(() => {
    if (qs == null) {
      navigate("/");
    } else {
      setQuestions(
        qs?.questions.map((q, index) => ({
          id: index + 1, // Use index for simpler handling, or keep q.id if needed
          text: q.question,
          options: Object.values(q.options), // Convert object to array
        })) || []
      );
    }
  }, []);

  return (
    <div className="min-h-screen no-select bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">
            Answer the following questions
          </h1>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm text-gray-600 text-center mb-4">
            {Object.keys(answers).length} of {questions.length} questions
            answered
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((question) => (
            <div
              key={question.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                  {question.id}
                </span>
                <div className="flex-1">
                  <p className="text-lg font-medium text-gray-900 mb-4">
                    {question.text}
                  </p>
                  <div className="space-y-3">
                    {question.options.map((option, index) => (
                      <label
                        key={index}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                          answers[question.id] === index
                            ? "bg-blue-50 border-blue-500"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={() =>
                            handleAnswerSelect(question.id, option)
                          }
                          disabled={submitted}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="ml-3">
                          <span className="font-medium mr-2">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={handleReset}
            className="inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset All
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              Object.keys(answers).length < questions.length || submitted
            }
            className="inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4 mr-2" />
            Submit
          </button>
        </div>

        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
              <div className="flex items-center mb-4">
                <AlertCircle className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  Confirm Submission
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to submit your answers?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSubmit}
                  className="px-4 py-2 w-44 bg-blue-600 flex justify-center items-center text-white rounded-md hover:bg-blue-700"
                >
                  {submitted ? <Spinner color="info" /> : "Confirm Submit"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Questionnaire;
