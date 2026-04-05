import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAxios from "../../hook/useAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import DetailsImage from "../../assets/details.png";
import { FileText } from "lucide-react";
import useUserStore from "../../store/useUserStore";
import useAuthStore from "../../store/useAuthStore";

export default function DetailsPage() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [bio, setBio] = useState("");
  let navigate = useNavigate();
  const { userData } = useUserStore();
  const { token } = useAuthStore();

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

  return (
    <div className="min-h-screen pt-24 flex flex-col md:flex-row items-center justify-center p-6 pb-20 bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-[#0a0a0a] dark:to-[#121212] transition-colors">
      <div className="w-full md:w-2/5 flex justify-center mb-6 md:mb-0">
        <img
          src={DetailsImage}
          alt="Illustration"
          className="w-full h-[300px] sm:h-[450px] object-contain grayscale-[0.2] dark:grayscale-[0.4] transition-all"
        />
      </div>

      <div className="w-full md:w-2/5 p-4 sm:p-10 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-purple-900/20 rounded-3xl shadow-xl dark:shadow-purple-500/5 max-w-3xl mx-auto overflow-y-auto transition-colors">
        <h2 className="text-center text-2xl font-bold mb-8 border-b border-gray-100 dark:border-purple-900/40 pb-6 text-gray-900 dark:text-white transition-colors">
          Complete Your Profile
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">First Name</label>
              <input
                placeholder="e.g. Niraj"
                className="w-full p-3 border border-gray-300 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white dark:bg-[#121212] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                {...register("first_name", { required: true })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">Last Name</label>
              <input
                placeholder="e.g. Bava"
                className="w-full p-3 border border-gray-300 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white dark:bg-[#121212] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                {...register("last_name", { required: true })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">Date of Birth</label>
            <input
              type="date"
              {...register("dob", { required: true })}
              className="w-full p-3 border border-gray-300 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white dark:bg-[#121212] text-gray-900 dark:text-white dark:color-scheme-dark"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">Professional Bio</label>
            <textarea
              placeholder="Tell us about your career goals..."
              rows={4}
              className="w-full p-3 border border-gray-300 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white dark:bg-[#121212] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 resize-none"
              {...register("bio", { required: true, minLength: 50 })}
            />
            <p className="text-[10px] text-gray-500 mt-1 italic">Minimum 50 characters required for a better assessment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">Education Level</label>
              <select
                {...register("education", { required: true })}
                className="w-full p-3 border border-gray-300 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white dark:bg-[#121212] text-gray-900 dark:text-white cursor-pointer"
              >
                <option value="High School">High School</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="PHD">PHD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">Stream/Major</label>
              <input
                placeholder="e.g. Computer Science"
                className="w-full p-3 border border-gray-300 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white dark:bg-[#121212] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                {...register("stream_of_education", { required: true })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">Language Preference</label>
            <select
              {...register("language_preference", { required: true })}
              className="w-full p-3 border border-gray-300 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white dark:bg-[#121212] text-gray-900 dark:text-white cursor-pointer"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>

          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">
              Update Resume (Auto-populates Bio)
            </label>
            <div className="mt-1 flex justify-center px-6 py-6 border-2 border-gray-200 dark:border-purple-900/30 border-dashed rounded-2xl bg-gray-50/50 dark:bg-purple-900/5 hover:bg-gray-100 dark:hover:bg-purple-900/10 transition-all group">
              <div className="space-y-2 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400 group-hover:text-purple-500 transition-colors" />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label className="relative cursor-pointer rounded-md font-bold text-purple-600 dark:text-purple-400 hover:text-purple-500 focus-within:outline-none">
                    <span>Upload your CV</span>
                    <input
                      {...register("resume", { required: false })}
                      type="file"
                      className="sr-only"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                  <p className="pl-1">or drag & drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-purple-500/20 transform transition-all active:scale-[0.98] disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? (
               <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  SAVING...
               </div>
            ) : "COMPLETE ONBOARDING"}
          </button>
        </form>
      </div>
    </div>
  );
}
