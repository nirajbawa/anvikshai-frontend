import React, { useEffect, useState } from "react";
import useAxios from "../../../hook/useAxios";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";

function VideoPage() {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [completedVideos, setCompletedVideos] = useState(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  let { dayId, taskId } = useParams();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`/content/video/${dayId}`)
      .then((res) => {
        setVideos(res.data.data.videos_list);
      })
      .catch((err) => console.error("Error fetching videos:", err));
  }, [dayId]);

  const handleVideoComplete = () => {
    setCompletedVideos((prev) => new Set(prev).add(currentVideoIndex));
  };

  const handleNext = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex((prev) => prev - 1);
    }
  };

  const handleSubmitProgress = () => {
    setIsSubmitting(true);
    const marks = (completedVideos.size / videos.length) * 10;

    axiosInstance
      .post(`/content/video/${dayId}`, {
        marks: Math.round(marks),
        status: completedVideos.size === videos.length,
      })
      .then((res) => {
        toast.success(
          "Progress submitted successfully! Your Videos Score is :  " +
            marks +
            "/10"
        );
        navigate(`/dashboard/task/${taskId}/${dayId}`);
      })
      .catch((err) => {
        console.error("Error submitting progress:", err);
        toast.error("Failed to submit progress. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const getYouTubeEmbedUrl = (url) => {
    try {
      const videoIdMatch = url.match(
        /(?:youtube\.com\/(?:.*[?&]v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      );
      return videoIdMatch
        ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
        : null;
    } catch (error) {
      console.error("Invalid YouTube URL:", error);
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex mt-3 gap-4">
        <div className="flex-1 bg-white p-4 rounded-lg shadow-lg">
          {videos.length > 0 ? (
            <>
              <div className="border-2 border-purple-400 rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-[500px] rounded-lg"
                  src={
                    getYouTubeEmbedUrl(videos[currentVideoIndex]?.link) || ""
                  }
                  title={videos[currentVideoIndex]?.topic || "Video"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={handleVideoComplete}
                ></iframe>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                  onClick={handlePrevious}
                  disabled={currentVideoIndex === 0}
                >
                  ← Previous
                </button>
                <button
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                  onClick={handleNext}
                  disabled={currentVideoIndex === videos.length - 1}
                >
                  Next →
                </button>
              </div>

              <div className="bg-purple-100 p-4 rounded-lg mt-6">
                <h2 className="text-lg font-bold">SUMMARY</h2>
                <p className="text-gray-600 mt-2">
                  {videos[currentVideoIndex]?.topic}
                </p>
              </div>
            </>
          ) : (
            <p>Loading videos...</p>
          )}
        </div>

        <div className="w-[350px] bg-purple-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-4">Up Next</h2>
          <div className="space-y-5">
            {videos.map((video, index) => (
              <div
                key={index}
                className={`flex items-center p-2 rounded-lg shadow ${
                  completedVideos.has(index) ? "bg-green-200" : "bg-white"
                }`}
              >
                <div>
                  <h3 className="text-sm font-bold">{video.topic}</h3>
                </div>
              </div>
            ))}
          </div>
          {completedVideos.size === videos.length && (
            <button
              className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
              onClick={handleSubmitProgress}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Progress"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoPage;

// Let me know if you want more improvements or tweaks! 🚀
