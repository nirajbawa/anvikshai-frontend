import { Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { use, useEffect, useState } from "react";
import useAxios from "../../hook/useAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import DetailsImage from "../../assets/details.png";
import { Textarea } from "@material-tailwind/react";
import { FileText } from "lucide-react";
import useUserStore from "../../store/useUserStore";

export default function DetailsPage() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [bio, setBio] = useState("");
  let navigate = useNavigate();
  const { userData } = useUserStore();

  const axiosInstance = useAxios();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/onboarding", {
        first_name: data.first_name,
        last_name: data.last_name,
        dob: data.dob,
        bio: data.bio + "\n\n\n resulme : \n" + bio,
        education: data.education,
        stream_of_education: data.stream_of_education,
        language_preference: data.language_preference,
      });
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

  const uploadFile = async () => {
    setLoading(true);
    try {
      if (!file) {
        toast.warning("Please upload a file before submitting.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post(`/task/readpdf`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setBio(response.data.text);
      console.log("file submitted successfully:", response.data);

      toast.success("File uploaded!");
      // navigate("/dashboard/subscription");
    } catch (error) {
      console.error("file submission failed:", error);
      const errorMessage =
        error.response?.data?.detail || "Error in uploading file.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (file !== null) {
      uploadFile();
    }
  }, [file]);

  useEffect(() => {
    if (userData.onboarding) {
      navigate("/");
    }
  }, [userData]);

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

          <Textarea placeholder="Enter About Your Self" {...register("bio")} />
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

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Resume
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                    <span>Upload a file</span>
                    <input
                      {...register("resume")}
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>
              </div>
            </div>
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
