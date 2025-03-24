import { Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAxios from "../../../../hook/useAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import DetailsImage from "../../../../assets/details.png";
import { Textarea } from "@material-tailwind/react";
import { FileText } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router";
import useAuthStore from "../../../../store/useAuthStore";

export default function OnboardingPage() {
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [resume, setResume] = useState("");
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  let { token } = useParams();
  const { setToken } = useAuthStore();

  const axiosInstance = useAxios();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/mentor/auth/onboarding", {
        first_name: data.first_name,
        last_name: data.last_name,
        password: data.password,
        bio: data.bio,
        education: data.education,
        stream_of_education: data.stream_of_education,
        resume: resume,
        token: decodeURI(token),
      });
      console.log("Form submitted successfully:", response.data);
      setToken(response.data?.access_token);
      toast.success("Onboarding successful!");
      navigate("/mentor/dashboard");
    } catch (error) {
      console.error("Form submission failed:", error);
      const errorMessage =
        error.response?.data?.detail || "Error in onboarding.";
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
      setResume(response.data.text);
      console.log("File submitted successfully:", response.data);

      toast.success("File uploaded!");
    } catch (error) {
      console.error("File submission failed:", error);
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
    setValue("email", email);
  }, [email]);

  useEffect(() => {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    setEmail(decodedToken.email);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center p-2 sm:p-6 mt-20 sm:mt-0 pb-96">
      <div className="w-full md:w-2/5 flex justify-center mb-6 md:mb-0">
        <img
          src={DetailsImage}
          alt="Illustration"
          className="w-full h-[400px] sm:w-[500px] sm:h-[500px] object-cover"
        />
      </div>

      <div className="w-full md:w-2/5 p-8 mt-16 rounded-xl max-w-3xl mx-auto overflow-y-auto">
        <h2 className="text-center text-xl font-semibold mb-6 border-2 border-black rounded-2xl p-5">
          Enter your Details
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-5 mt-20"
        >
          <label>Email</label>
          <Input
            placeholder="Email"
            disabled
            {...register("email", { required: true })}
          />

          <label>Password</label>
          <Input
            placeholder="Password"
            type="password"
            {...register("password", { required: true })}
          />

          <label>First Name</label>
          <Input
            placeholder="First Name"
            {...register("first_name", { required: true })}
          />

          <label>Last Name</label>
          <Input
            placeholder="Last Name"
            {...register("last_name", { required: true })}
          />

          <label>About Yourself</label>
          <Textarea
            minLength={50}
            placeholder="Enter About Yourself"
            {...register("bio", { required: true })}
          />

          <label>Education</label>
          <select
            {...register("education", { required: true })}
            className="w-full p-3 border rounded-md"
          >
            <option value="High School">High School</option>
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
            <option value="PHD">PHD</option>
          </select>

          <label>Stream of Education</label>
          <Input
            placeholder="Stream of Education"
            {...register("stream_of_education", { required: true })}
          />

          <label>Resume</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500">
                  <span>Upload a file</span>
                  <input
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
