import React from "react"; 
import { IconButton, Button, Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router";

const Quiz = () => {
  const navigate = useNavigate();

  // Sample Questions
  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
    },
    {
      id: 2,
      question: "Which programming language is used for web development?",
      options: ["Python", "Java", "JavaScript", "C++"],
    },
    {
      id: 3,
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
    },
  ];

  return (
    <>
      {/* Back Button */}
      <IconButton
        className="absolute top-20 left-4 bg-gray-200 text-black hover:bg-gray-300 transition"
        onClick={() => navigate(-1)}
      >
        <i className="fas fa-chevron-left text-lg" />
      </IconButton>

      {/* Title */}
      <h1 className="absolute top-[15%] left-1/2 transform -translate-x-1/2 text-2xl font-bold text-gray-700">
        Quiz
      </h1>

      {/* Questions Container */}
      <div className="absolute top-[25%] left-1/2 transform -translate-x-1/2 w-2/3 flex flex-col gap-6">
        {questions.map((q, index) => (
          <Card key={q.id} className="p-6 bg-[#EADAFF] rounded-xl shadow-lg">
            {/* Question Number */}
            <Typography variant="h6" className="text-gray-800 font-bold">
              Q{index + 1}.
            </Typography>

            {/* Question Text */}
            <Typography variant="h6" className="mb-4 text-gray-800">
              {q.question}
            </Typography>
            
            {/* Grid Layout for Options */}
            <div className="grid grid-cols-2 gap-4">
              {q.options.map((option, optionIndex) => (
                <Button
                  key={optionIndex}
                  className="px-6 py-2 bg-white border border-gray-400 text-gray-700 rounded-lg shadow-md hover:bg-gray-200 transition"
                >
                  {option}
                </Button>
              ))}
            </div>
          </Card>
        ))}

        {/* Submit Button Outside Last Question */}
        <div className="flex justify-end mt-6">
          <Button className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition">
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
