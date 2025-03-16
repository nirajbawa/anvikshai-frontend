import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useAxios from "../../hook/useAxios";
import { toast } from "react-toastify";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Assignment = () => {
  const navigate = useNavigate();
  let { dayId } = useParams();
  const axiosInstance = useAxios();

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [assignment, setAssignment] = useState(null);
  const [file, setFile] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/content/assignment/${dayId}`);
      setAssignment(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching day:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.warning("Please upload a file before submitting.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("dayId", dayId);

    try {
      const response = await axiosInstance.post(
        `/content/assignment/${dayId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(
        "Assignment uploaded successfully! Your Assignment Score is : " +
          response?.data?.marks +
          "/10"
      );
      navigate(-1);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload assignment.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="w-full p-10">
        <button
          className="bg-purple-200 flex justify-center items-center pl-4 py-3 pr-2 rounded-lg hover:bg-purple-100 duration-300 transition-all text-black"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosIcon />
        </button>
      </div>
      <div className="flex flex-col items-center justify-start min-h-screen p-4">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Assignment</h1>

        {loading ? (
          <div className="w-full max-w-3xl space-y-6">
            <div className="w-full h-[30vh] bg-[#F9F5FF] animate-pulse rounded-2xl" />
            <div className="w-full h-[10vh] bg-[#F9F5FF] animate-pulse rounded-2xl" />
          </div>
        ) : (
          <>
            <div className="w-full max-w-3xl p-7 h-full bg-[#F9F5FF] rounded-2xl mb-6">
              {assignment?.assinments_question}
            </div>

            <div className="w-full max-w-3xl h-[10vh] bg-[#F9F5FF]  rounded-2xl flex items-center justify-center mb-6">
              <input
                type="file"
                onChange={handleFileChange}
                accept="application/pdf"
                className="w-full max-w-2xl h-[4vh] bg-white rounded-2xl shadow-md text-gray-700 font-medium hover:bg-gray-200 transition"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                disabled={uploading}
                className={`px-4 py-2 font-medium rounded-lg shadow-md transition ${
                  uploading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#c198ff] text-white hover:bg-[#d5bcfc] "
                }`}
              >
                {uploading ? "Uploading..." : "Submit"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Assignment;
