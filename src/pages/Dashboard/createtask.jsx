import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hook/useAxios";
import { toast } from "react-toastify";
import useTaskStore from "../../store/useTaskStore";

export default function CreateTask() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const { setTask, clearTask } = useTaskStore();

  const onSubmit = async (data) => {
    try {
      clearTask();
      const response = await axiosInstance.post("/task/create-task", data);
      console.log({
        chat: response.data.roadmap,
        taskId: response.data.task_id,
      });
      setTask({ chat: response.data.roadmap, taskId: response.data.task_id });
      toast.success("Task created successfully!");
      navigate("/dashboard/chat");
    } catch (error) {
      console.error("Form submission failed:", error);
      const errorMessage =
        error.response?.data?.detail || "Error in creating task.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="pt-28 flex flex-col items-center p-6 border-2 bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Create Task</h1>

        <input
          type="text"
          placeholder="Task Title"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register("task_name", { required: true })}
        />

        <textarea
          placeholder="Task Description"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register("description", { required: true })}
        ></textarea>

        <input
          type="number"
          placeholder="Expected duration (In Months)"
          max={12}
          min={1}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register("expected_duration_months", { required: true })}
        />

        <input
          type="number"
          placeholder="Expected Hours per "
          max={10}
          min={1}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register("daily_hours", { required: true })}
        />

        <select
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          {...register("language", { required: true })}
        >
          <option value="English">English</option>
          {/* <option value="Hindi">Hindi</option> */}
        </select>

        <div className="w-full flex justify-center items-center">
          <Button
            type="submit"
            className={`${isSubmitting ? "opacity-50" : ""}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Task"}
          </Button>
        </div>
      </form>
    </div>
  );
}
