import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hook/useAxios";

function Courses() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const fetchImage = async (query) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${
          import.meta.env.VITE_UNSPLASH_CLIENT_ID
        }`
      );
      const data = await response.json();
      return data.results.length > 0 ? data.results[0].urls.small : null;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/task/");
      const tasksWithImages = await Promise.all(
        response.data.data.map(async (task) => {
          const imageUrl = await fetchImage(task.domains[0]);
          return { ...task, image: imageUrl || "/default-placeholder.jpg" };
        })
      );
      setTasks(tasksWithImages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Available Courses
        </h1>
        <p className="text-gray-600 mb-6">
          Explore our collection of courses to enhance your skills
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array(6)
                .fill(null)
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse"
                  >
                    <div className="w-full h-48 bg-gray-200 rounded-lg" />
                    <div className="mt-4 h-4 bg-gray-200 rounded w-3/4" />
                    <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
                    <div className="mt-6 w-full bg-gray-200 py-3 rounded-xl" />
                  </div>
                ))
            : tasks.map((course) => (
                <div
                  key={course.id}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <img
                    src={course.image}
                    alt={course.task_name}
                    className="w-full h-48 object-cover rounded-t-2xl"
                    onError={(e) => {
                      e.target.src = "/default-placeholder.jpg";
                    }}
                  />
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {course.task_name}
                    </h3>
                    {course.domains && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.domains.map((domain, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                          >
                            {domain}
                          </span>
                        ))}
                      </div>
                    )}
                    <button
                      onClick={() => navigate(`/dashboard/roadmap/${course.id}`)}
                      className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-colors"
                    >
                      Start Learning
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;