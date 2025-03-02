import React, { useEffect } from "react";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FeedIcon from "@mui/icons-material/Feed";
import { useParams } from "react-router";
import useAxios from "../../hook/useAxios";
import { useNavigate } from "react-router";
import ReactMarkdown from "react-markdown";
import { Spinner } from "@material-tailwind/react";

function TaskPage() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let { taskId, dayId } = useParams();

  const [day, setDay] = useState(null);
  const axiosInstance = useAxios();

  const [assignment, setAssignment] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [video, setVideo] = useState(null);
  const [articles, setArticles] = useState(null);

  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");

  const handleSendFeedback = async () => {
    if (!currentQuestion.trim()) return;

    const updatedQuestions = [
      {
        userDetails: {
          quiz_score: quiz.marks,
          quiz_completed: quiz.quiz_completed,
          video_score: video.marks,
          video_completed: video.all_video_completed,
          assignment_score: assignment.marks,
          assinments_completed: assignment.assinments_completed,
          article_score: articles.marks,
          all_article_completed: articles.all_article_readed,
        },
      },
      { question: currentQuestion },
    ];

    setLoading(true);

    try {
      const response = await axiosInstance.post(`/content/feedback/${dayId}`, {
        questions: updatedQuestions,
      });

      if (response.data?.data?.answer) {
        const newFeedback = {
          question: currentQuestion,
          answer: response.data.data.answer,
        };

        setFeedbackHistory((prev) => [...prev, newFeedback]);
        setCurrentQuestion("");
      }
    } catch (error) {
      console.error("Failed to fetch feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateDay = async () => {
    try {
      await axiosInstance.patch(`/task/day/${taskId}/${dayId}`, {
        status: true,
      });
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await axiosInstance.get(`/content/article/${dayId}`);
      setArticles(response.data?.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const fetchVideo = async () => {
    try {
      const response = await axiosInstance.get(`/content/video/${dayId}`);
      setVideo(response.data.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const fetchQuiz = async () => {
    try {
      const response = await axiosInstance.get(`/content/quiz/${dayId}`);
      setQuiz(response.data.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const fetchAssignment = async () => {
    try {
      const response = await axiosInstance.get(`/content/assignment/${dayId}`);
      setAssignment(response.data?.data);
    } catch (error) {
      console.error("Error fetching day:", error);
    }
  };

  const fetchDay = async () => {
    try {
      const response = await axiosInstance.get(`/task/day/${taskId}/${dayId}`);
      setDay(response.data?.data); // Fallback to an empty array
    } catch (error) {
      console.error("Error fetching day:", error);
    }
  };

  useEffect(() => {
    const completedTasks = [
      quiz?.quiz_completed,
      video?.all_video_completed,
      articles?.all_article_readed,
      assignment?.assinments_completed,
    ].filter(Boolean).length;

    const newProgress = (completedTasks / 4) * 100;
    setProgress(newProgress);
    if (
      quiz?.quiz_completed &&
      video?.all_video_completed &&
      articles?.all_article_readed &&
      assignment?.assinments_completed
    ) {
      updateDay();
    }
  }, [quiz, video, articles, assignment]);

  useEffect(() => {
    fetchDay();
    fetchAssignment();
    fetchQuiz();
    fetchVideo();
    fetchArticles();
  }, []);

  useEffect(() => {
    console.log(day);
  }, [day]);

  return (
    <div className="w-full p-10 px-20 h-full flex flex-col gap-y-20 pb-96">
      <div className="w-full flex flex-row justify-between">
        <div className="bg-[#F5EEFF] rounded-md w-[60%] min-h-96 h-full p-10 flex flex-col gap-y-7">
          <h1 className="font-bold text-xl font-sans">{day?.topics}</h1>
          <p className="text-lg">{day?.description}</p>
        </div>

        <div className="w-[35%] min-h-96 h-full">
          <h1 className="text-2xl font-bold text-center p-5">Tasks</h1>
          <div className="w-full px-10 flex flex-col gap-y-5">
            {day?.leaning_topics.map((data, index) => (
              <div
                key={index}
                className="w-full flex justify-between gap-x-5 items-center"
              >
                <p className="bg-[#F5EEFF] font-bold p-1 rounded-full w-9 flex justify-center items-center">
                  {index + 1}
                </p>
                <p className="bg-[#F5EEFF] w-full font-bold p-2 rounded-md">
                  {data}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between gap-y-5 gap-x-5 flex-wrap">
        <div
          className={`w-80 h-72  flex-col gap-y-5 rounded-md flex justify-center items-center ${
            video?.all_video_completed ? "bg-green-200" : "bg-[#F5EEFF]"
          }`}
        >
          <button
            onClick={() => {
              navigate(`/dashboard/video/${taskId}/${dayId}`);
            }}
            className="w-44 bg-[#9F88F0] text-white rounded-xl p-3 font-bold hover:bg-[#8876cc]"
          >
            Video Content <PlayArrowIcon fontSize="medium" />
          </button>
          <p>Points : {video?.marks}</p>
        </div>

        <div
          onClick={() => {
            navigate(`/dashboard/article/${taskId}/${dayId}`);
          }}
          className={`w-80 h-72  flex-col gap-y-5 rounded-md flex justify-center items-center ${
            articles?.all_article_readed ? "bg-green-200" : "bg-[#F5EEFF]"
          }`}
        >
          <button className="w-44 bg-[#9F88F0] text-white rounded-xl p-3 font-bold hover:bg-[#8876cc]">
            Articles <FeedIcon fontSize="medium" />
          </button>
          <p>Points : {articles?.marks}</p>
        </div>
        <div
          className={`w-80 h-72  flex-col gap-y-5 rounded-md flex justify-center items-center ${
            quiz?.quiz_completed ? "bg-green-200" : "bg-[#F5EEFF]"
          }`}
        >
          <button
            onClick={() => {
              navigate(`/dashboard/quiz/${dayId}`);
            }}
            className="w-44 bg-[#9F88F0] text-white rounded-xl p-3 font-bold hover:bg-[#8876cc]"
          >
            Give Quiz <QuestionAnswerIcon fontSize="medium" />
          </button>
          <p>Points : {quiz?.marks}</p>
        </div>
        <div
          className={`w-80 h-72  flex-col gap-y-5 rounded-md flex justify-center items-center ${
            assignment?.assinments_completed ? "bg-green-200" : "bg-[#F5EEFF]"
          }`}
        >
          <button
            onClick={() => {
              navigate(`/dashboard/assignment/${dayId}`);
            }}
            className="w-44 bg-[#9F88F0] text-white rounded-xl p-3 font-bold hover:bg-[#8876cc]"
          >
            Assignment <AssignmentIcon fontSize="medium" />
          </button>
          <p>Points : {assignment?.marks}</p>
        </div>
      </div>

      <div className="w-full flex-col gap-y-7">
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold">Progress</span>
          <span className="text-xl font-bold">{progress}%</span>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-6">
          <div
            className="bg-blue-600 h-6 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      {day != null && day?.feedback != null ? (
        <div className="flex flex-col gap-y-8">
          <h1 className="font-bold text-2xl">Feedback</h1>
          <div className="w-full flex justify-between flex-col min-h-[35rem] h-full bg-[#F5EEFF] p-14 border-4 border-gray-200 rounded-md">
            <div className="h-full">
              <div className="w-full flex flex-col gap-5 p-5 bg-[#F5EEFF] rounded-lg overflow-y-auto max-h-[25rem] ">
                <div className="p-5 bg-white">
                  <ReactMarkdown>{day?.feedback}</ReactMarkdown>
                </div>

                {feedbackHistory.map((item, index) => (
                  <div key={index} className="mb-5 flex flex-col gap-5">
                    <div className="bg-white p-5 rounded-lg">
                      <p className="font-bold">You:</p>
                      <p>{item.question}</p>
                    </div>
                    <div className="bg-white p-5 rounded-lg">
                      <p className="font-bold mt-3">AI:</p>
                      <ReactMarkdown>{item.answer}</ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full flex gap-x-7">
              <input
                type="text"
                className="w-full h-14 px-5 focus:outline-none p-2 bg-white border-4 rounded-xl border-gray-200"
                placeholder="Ask Something"
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                disabled={loading}
              />
              <button
                className="text-5xl hover:text-[#2f2f2f] disabled:opacity-50"
                onClick={handleSendFeedback}
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
      ) : (
        ""
      )}
    </div>
  );
}

export default TaskPage;
