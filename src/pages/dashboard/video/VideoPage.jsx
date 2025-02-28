import React from "react";

function VideoPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Main Content */}
      <div className="flex mt-3 gap-4">
        {/* Left Section - Video & Controls */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-lg">
          {/* Video Container */}
          <div className="border-2 border-purple-400 rounded-lg overflow-hidden">
            <video
              className="w-full rounded-lg"
              controls
              // src="https://www.w3schools.com/html/mov_bbb.mp4"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4">
            <button className="px-4 py-2 bg-gray-200 rounded-lg flex items-center">
              ← Previous
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg flex items-center">
              Next →
            </button>
          </div>

          {/* Summary Section */}
          <div className="bg-purple-100 p-4 rounded-lg mt-6">
            <h2 className="text-lg font-bold">SUMMARY</h2>
            <p className="text-gray-600 mt-2">
              "Summary of the Video"
            </p>
          </div>
        </div>

        {/* Right Section - Up Next */}
        <div className="w-[350px] bg-purple-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-4">Up Next</h2>
          <div className="space-y-5">
            {["Topic 1", "Topic 2", "Topic 3", "Topic 4"].map((topic, index) => (
              <div key={index} className="flex items-center bg-white p-2 rounded-lg shadow">
                <img
                  // src="https://via.placeholder.com/80"
                  alt={topic}
                  className="w-16 h-10 rounded-lg mr-3"
                />
                <div>
                  <h3 className="text-sm font-bold">Basics of {topic}</h3>
                  <p className="text-xs text-gray-600">
                   
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
