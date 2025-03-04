import { Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxios from "../../hook/useAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import DetailsImage from "../../assets/details.png";

export default function DetailsPage() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const axiosInstance = useAxios();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/onboarding", data);
      console.log("Form submitted successfully:", response.data);

      toast.success("On boarding successful!");
      navigate("/dashboard/subscription");
    } catch (error) {
      console.error("Form submission failed:", error);
      const errorMessage =
        error.response?.data?.detail || "Error in on onboarding.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center p-6 mt-0 pb-96">
      <div className="w-full md:w-2/5 flex justify-center mb-6 md:mb-0">
        <img
          src={DetailsImage}
          alt="Illustration"
          className="w-[500px] h-[500px] object-cover"
        />
      </div>

      <div className="w-full md:w-2/5 p-8 rounded-xl max-w-3xl mx-auto overflow-y-auto">
        <h2 className="text-center text-xl font-semibold mb-6 border-2 border-black rounded-2xl p-5">
          Enter your Details
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-10 mt-20"
        >
          <Input placeholder="First Name" {...register("first_name")} />
          <Input placeholder="Last Name" {...register("last_name")} />

          <div>
            <label className="block text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              {...register("dob")}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <Input placeholder="Bio" {...register("bio")} />
          <select
            {...register("education")}
            className="w-full p-3 border rounded-md"
          >
            <option value="High School">High School</option>
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
            <option value="PHD">PHD</option>
          </select>
          <Input
            placeholder="Stream of Education"
            {...register("stream_of_education")}
          />

          <div>
            <label className="block text-gray-700 mb-2">
              Language Preference
            </label>
            <select
              {...register("language_preference")}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-300 hover:bg-purple-400 text-black py-3 rounded-md shadow-md transition transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Submitting..." : "SUBMIT"}
          </button>
        </form>
      </div>
    </div>
  );
}
