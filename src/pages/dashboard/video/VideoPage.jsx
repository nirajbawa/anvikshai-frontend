import React, { useEffect, useState, useRef } from "react";
import useAxios from "../../../hook/useAxios";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import { HomeSimple } from "iconoir-react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import YouTube from "react-youtube";

function VideoPage() {
  const [videos, setVideos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoPointer, setVideoPointer] = useState(0);
  const [points, setPoints] = useState(1);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const playerRef = useRef(null);

  const { dayId, taskId } = useParams();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const fetchVideos = async () => {
    try {
      setVideoLoading(true);
      const response = await axiosInstance.get(`/content/video/${dayId}`);
      const rawList = response?.data?.data.videos_list.map((data) => ({
        topic: data.topic,
        link: getYouTubeVideoId(data.link),
      }));

      // Remove duplicates based on 'link'
      const seen = new Set();
      const filteredList = rawList.filter((video) => {
        if (seen.has(video.link)) return false;
        seen.add(video.link);
        return true;
      });

      setVideos(filteredList);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setVideoLoading(false);
    }
  };

  const getYouTubeVideoId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:.*[?&]v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  const onVideoEnd = () => {
    setIsVideoEnded(true);
  };

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    setIsVideoEnded(false);
  };

  const nextVideo = () => {
    if (videoPointer < videos.length - 1 && isVideoEnded) {
      setVideoPointer((prev) => prev + 1);
      setPoints((prev) => (prev < videos.length ? prev + 1 : prev));
      setIsVideoEnded(false);
    } else {
      toast.warning("Please watch the full video to proceed.");
    }
  };

  const previousVideo = () => {
    if (videoPointer > 0) {
      setVideoPointer((prev) => prev - 1);
    }
  };

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
          `Progress submitted successfully! Your Videos Score is: ${Math.round(
            marks
          )}/10`
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

  useEffect(() => {
    fetchVideos();
  }, []);

  if (videoLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 animate-pulse">
        {/* Skeleton UI */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-3 md:p-4">
      <div className="w-full px-3 md:px-5 py-2 md:py-3">
        <button
          className="bg-purple-200 flex justify-center items-center pl-3 md:pl-4 py-2 md:py-3 pr-1 md:pr-2 rounded-lg hover:bg-purple-100 duration-300 transition-all text-black"
          onClick={() => navigate(`/dashboard/task/${taskId}/${dayId}`)}
        >
          <ArrowBackIosIcon />
        </button>
      </div>

      <div className="flex flex-col md:flex-row mt-3 gap-3 md:gap-4">
        <div className="flex-1 bg-white p-3 md:p-4 rounded-lg shadow-lg">
          <div className="border-2 border-purple-400 rounded-lg overflow-hidden">
            {videos[videoPointer]?.link && (
              <YouTube
                videoId={videos[videoPointer]?.link}
                onEnd={onVideoEnd}
                onReady={onPlayerReady}
                opts={{
                  height: "500",
                  width: "100%",
                  playerVars: {
                    autoplay: 1,
                  },
                }}
              />
            )}
          </div>

          <div className="flex justify-between mt-3 md:mt-4">
            <button
              className="px-3 md:px-4 py-1 md:py-2 bg-purple-100 rounded-lg"
              onClick={previousVideo}
              disabled={videoPointer === 0}
            >
              ← Previous
            </button>
            <button
              className="px-3 md:px-4 py-1 md:py-2 bg-purple-100 rounded-lg"
              onClick={nextVideo}
              disabled={!isVideoEnded || videoPointer === videos.length - 1}
            >
              Next →
            </button>
          </div>

          <div className="bg-purple-100 p-3 md:p-4 rounded-lg mt-4 md:mt-6">
            <h2 className="text-base md:text-lg font-bold">SUMMARY</h2>
            <p className="text-gray-600 mt-1 md:mt-2">
              {videos[videoPointer]?.topic}
            </p>
          </div>
        </div>

        <div className="w-full md:w-[350px] bg-purple-100 p-4 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-base md:text-lg font-bold mb-3 md:mb-4">
            Up Next
          </h2>
          <div className="space-y-3 md:space-y-5">
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

          {videoPointer === videos.length - 1 && isVideoEnded && (
            <button
              disabled={isSubmitting}
              onClick={handleSubmitProgress}
              className="mt-4 md:mt-6 px-3 md:px-4 py-2 bg-green-500 text-white rounded-lg flex items-center justify-center min-w-[120px] md:min-w-[150px]"
            >
              {isSubmitting ? (
                <>
                  <Spinner className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  Submitting...
                </>
              ) : (
                "Submit Progress"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
