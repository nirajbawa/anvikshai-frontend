import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Star } from "lucide-react";
import ReactMarkdown from "react-markdown";
import useAxios from "../../../../hook/useAxios";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { useNavigate } from "react-router";

function FeedbackPage() {
  const axiosInstance = useAxios();
  const [submitError, setSubmitError] = useState(null);
  const [course, setCourse] = useState(null);
  let { courseId } = useParams();
  let navigate = useNavigate();

  // useForm Hook
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      rating: 0,
      feedback: "",
    },
  });

  const rating = watch("rating"); // Watch rating value

  const fetchData = async (data) => {
    try {
      setSubmitError(null);
      const response = await axiosInstance.get(
        `/expert/courses/${courseId}`,
        data
      );
      console.log("Feedback Submitted:", response.data);
      setCourse(response.data?.data);
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      setSubmitError(null);
      const response = await axiosInstance.post(
        `/expert/courses/${courseId}`,
        data
      );
      console.log("Feedback Submitted:", response.data);
      toast.success("Course Feedback submitted successfully!");
      navigate("/expert/courses");
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitError(error.response?.data?.detail || "Something went wrong!");
      toast.error(error.response?.data?.detail || "Something went wrong!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <main className="max-w-6xl mx-auto p-6">
        <div className="space-y-8">
          {/* Course Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Course Name
            </h2>
            <div className="bg-purple-50 p-6 rounded-xl shadow-sm">
              <p className="text-black prose max-w-full prose-lg prose-gray dark:prose-invert markdown-content">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {course != null ? course.generated_roadmap_text : ""}
                </ReactMarkdown>
              </p>
            </div>
          </section>

          {/* Feedback Form */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Expert Feedback
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Rating
                </label>
                <Controller
                  name="rating"
                  control={control}
                  rules={{ required: "Rating is required", min: 1, max: 5 }}
                  render={({ field }) => (
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setValue("rating", star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                />
                {errors.rating && (
                  <p className="text-red-500 text-sm">
                    {errors.rating.message}
                  </p>
                )}
              </div>

              {/* Feedback Text */}
              <div>
                <label
                  htmlFor="feedback"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Detailed Feedback
                </label>
                <Controller
                  name="feedback"
                  control={control}
                  rules={{
                    required: "Feedback is required",
                    minLength: {
                      value: 10,
                      message: "Feedback must be at least 10 characters long",
                    },
                  }}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      id="feedback"
                      className="w-full min-h-[200px] p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      placeholder="Please provide your detailed feedback about the course content, structure, and effectiveness..."
                    />
                  )}
                />
                {errors.feedback && (
                  <p className="text-red-500 text-sm">
                    {errors.feedback.message}
                  </p>
                )}
              </div>

              {/* Submission Error */}
              {submitError && (
                <p className="text-red-500 text-sm text-center">
                  {submitError}
                </p>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export default FeedbackPage;
