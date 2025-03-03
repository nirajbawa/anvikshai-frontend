import React, { useEffect, useState } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router";
import useAxios from "../../hook/useAxios";
import { toast } from "react-toastify";

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [result, setResult] = useState(null);
  let { dayId } = useParams();
  const axiosInstance = useAxios();

  // Fetch Questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/content/quiz/${dayId}`);
        setQuestions(response.data.data.questions || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [dayId]);

  // Handle Answer Selection
  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  // Handle Quiz Submission
  const handleSubmit = async () => {
    setSubmitLoading(true);
    try {
      const submissionData = Object.entries(answers).map(([id, answer]) => ({
        id: Number(id),
        answer,
      }));

      const response = await axiosInstance.post(`/content/quiz/${dayId}`, {
        questions: submissionData,
      });

      setResult(response.data.result);
      setQuestions(response.data.data.questions);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Failed to submit quiz. Try again!");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) return <p>Loading questions...</p>;

  return (
    <div className="container mx-auto p-6 px-40">
      <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
        Quiz
      </h1>

      {!result ? (
        <div className="flex flex-col gap-6">
          {questions.map((q, index) => (
            <Card key={q.id} className="p-6 bg-[#EADAFF] rounded-xl shadow-lg">
              <Typography variant="h6" className="text-gray-800 font-bold">
                Q{index + 1}. {q.question}
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(q.options).map(([key, option]) => (
                  <Button
                    key={key}
                    className={`px-6 py-2 ${
                      answers[q.id] === key ? "bg-yellow-300" : "bg-white"
                    } border border-gray-400 text-gray-700 rounded-lg shadow-md hover:bg-gray-200 transition`}
                    onClick={() => handleAnswer(q.id, key)}
                    disabled={submitLoading}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </Card>
          ))}

          <div className="flex justify-end mt-6">
            <Button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition"
              disabled={submitLoading}
            >
              {submitLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
          <p className="text-lg mb-4">
            Score: {result.marks} / {result.total_questions} (
            {result.percentage}%)
          </p>

          {questions.map((q, index) => (
            <Card key={q.id} className="p-6 mb-4 bg-white rounded-xl shadow-md">
              <Typography variant="h6" className="font-bold mb-2">
                Q{index + 1}. {q.question}
              </Typography>
              <p className="text-gray-700">
                Your Answer: {q.options[answers[q.id]] || "Not answered"}
              </p>
              <p
                className={`mt-2 ${
                  answers[q.id] === q.answer ? "text-green-600" : "text-red-600"
                }`}
              >
                {answers[q.id] === q.answer
                  ? "Correct!"
                  : `Correct Answer: ${q.options[q.answer]}`}
              </p>
            </Card>
          ))}

          <Button
            onClick={() => navigate(-1)}
            className="px-6 py-2 text-white rounded-lg shadow-md transition mt-6"
          >
            Go to Home
          </Button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
