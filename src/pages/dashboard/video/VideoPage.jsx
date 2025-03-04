import React, { useEffect, useState } from "react";
import useAxios from "../../../hook/useAxios";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";

function VideoPage() {
  const [videos, setVideos] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  let { dayId, taskId } = useParams();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [videoPointer, setVideoPointer] = useState(0);
  const [points, setPoints] = useState(1);

  const fetchVideos = async () => {
    try {
      setVideoLoading(true);
      const response = await axiosInstance.get(`/content/video/${dayId}`);
      console.log(response);
      const videoList = response?.data?.data.videos_list.map((data) => ({
        topic: data.topic,
        link: getYouTubeEmbedUrl(data.link),
      }));
      console.log(videoList);
      setVideos(videoList);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setVideoLoading(false);
    }
  };

  const nextVideo = () => {
    setVideoPointer((state) => (state < videos.length - 1 ? state + 1 : state));
    setPoints((state) => (state === videos.length ? state : state + 1));
  };

  const previousVideo = () => {
    setVideoPointer((state) => (state < 0 ? state : state - 1));
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleSubmitProgress = () => {
    setIsSubmitting(true);
    const marks = (points / videos.length) * 10;

    axiosInstance
      .post(`/content/video/${dayId}`, {
        marks: Math.round(marks),
        status: true,
      })
      .then(() => {
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

  if (videoLoading) {
    return (
      <>
        <div className="min-h-screen bg-gray-100 p-4 animate-pulse">
          <div className="flex mt-3 gap-4">
            <div className="flex-1 bg-white p-4 rounded-lg shadow-lg">
              <div className="border-2 border-purple-400 rounded-lg overflow-hidden">
                <div className="w-full h-[500px] rounded-lg bg-gray-300"></div>
              </div>

              <div className="flex justify-between mt-4">
                <div className="px-4 py-2 bg-gray-300 rounded-lg w-24"></div>
                <div className="px-4 py-2 bg-gray-300 rounded-lg w-24"></div>
              </div>

              <div className="bg-purple-100 p-4 rounded-lg mt-6">
                <h2 className="text-lg font-bold bg-gray-300 h-6 w-32"></h2>
                <p className="text-gray-600 mt-2 bg-gray-300 h-4 w-full"></p>
              </div>
            </div>

            <div className="w-[350px] bg-purple-100 p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4 bg-gray-300 h-6 w-32"></h2>
              <div className="space-y-5">
                <div className="flex items-center p-2 rounded-lg shadow bg-gray-300 h-12"></div>
                <div className="flex items-center p-2 rounded-lg shadow bg-gray-300 h-12"></div>
              </div>
              <div className="mt-6 px-4 py-2 bg-gray-300 text-white rounded-lg w-full h-10"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex mt-3 gap-4">
        <div className="flex-1 bg-white p-4 rounded-lg shadow-lg">
          <div className="border-2 border-purple-400 rounded-lg overflow-hidden">
            <iframe
              className="w-full h-[500px] rounded-lg"
              title="Video"
              frameBorder="0"
              src={videos[videoPointer]?.link}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded-lg"
              onClick={previousVideo}
              disabled={videoPointer === 0}
            >
              ← Previous
            </button>
            <button
              className="px-4 py-2 bg-gray-200 rounded-lg"
              onClick={nextVideo}
              disabled={videoPointer === videos.length - 1}
            >
              Next →
            </button>
          </div>

          <div className="bg-purple-100 p-4 rounded-lg mt-6">
            <h2 className="text-lg font-bold">SUMMARY</h2>
            <p className="text-gray-600 mt-2">{videos[videoPointer]?.topic}</p>
          </div>
        </div>

        <div className="w-[350px] bg-purple-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-4">Up Next</h2>
          <div className="space-y-5">
            {videos.map((data, index) => (
              <div
                key={index}
                className="flex items-center cursor-pointer p-2 rounded-lg shadow bg-white"
              >
                <div>
                  <h3 className="text-sm font-bold">{data.topic}</h3>
                </div>
              </div>
            ))}
          </div>
          {videoPointer == videos.length - 1 ? (
            <button
              disabled={isSubmitting}
              onClick={handleSubmitProgress}
              className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg flex items-center justify-center min-w-[150px]"
            >
              {isSubmitting ? (
                <>
                  <Spinner className="h-5 w-5 mr-2" />
                  Submitting...
                </>
              ) : (
                "Submit Progress"
              )}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoPage;

// Let me know if you want more improvements or tweaks! 🚀
