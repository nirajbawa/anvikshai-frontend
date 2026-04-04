import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hook/useAxios";
import { toast } from "react-toastify";
import useDetailsQuestionnaireStore from "../../store/useDetailsQuestionnaireStore";

export default function CreateTask() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const { setQuestions } = useDetailsQuestionnaireStore();

  const onSubmit = async (data) => {
    try {
      const uploadData = {
        task_name: data.task_name,
        description: data.description,
        expected_duration_months:
          data.expected_duration_months === ""
            ? parseInt(0)
            : parseInt(data.expected_duration_months),
        daily_hours: parseFloat(data.daily_hours),
        language: data.language,
      };
      const response = await axiosInstance.post(
        "/task/create-task",
        uploadData
      );

 
      setQuestions({
        questions: response.data.questionnaire,
        taskId: response.data.task_id,
      });
      toast.success("Task created successfully!");
      navigate(`/dashboard/Questionnaire/${response.data.task_id}`);
    } catch (error) {
      console.error("Form submission failed:", error);
      const errorMessage =
        error.response?.data?.detail || "Error in creating task.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="pt-12 md:pt-20 flex flex-col items-center flex-1 h-full min-h-screen bg-transparent transition-colors">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white dark:bg-[#121212] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6 transition-colors"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white transition-colors">Create Course</h1>

        <input
          type="text"
          placeholder="Task Title"
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
          {...register("task_name", { required: true })}
        />

        <textarea
          placeholder="Write the things you want to learn."
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
          {...register("description", { required: true })}
        ></textarea>

        <input
          type="number"
          placeholder="Expected duration (In Months)"
          max={7}
          min={0}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
          {...register("expected_duration_months", { required: false })}
        />

        <input
          type="number"
          placeholder="Expected Hours per Day"
          max={10}
          min={1}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
          {...register("daily_hours", { required: true })}
        />

        <select
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
          {...register("language", { required: true })}
        >
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
        </select>

        <div className="w-full flex justify-center items-center mt-8">
          <Button
            type="submit"
            className={`${isSubmitting ? "opacity-50" : ""} w-full bg-purple-600 dark:bg-purple-500 text-white rounded-xl py-3 capitalize text-sm`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
}
