function RoadmapComponent() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white-200 p-7">
      <div className="bg-purple-100 p-7 rounded-2xl shadow-2xl w-[70%] max-w-3xl">
        {/* Empty Roadmap Content Box */}
        <div className="bg-white p-8 rounded-lg shadow-lg h-80 flex items-center justify-center">
          <p className="text-gray-500 text-lg">Your roadmap content goes here...</p>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col space-y-3 mt-3 items-end">
          <button className="bg-white border border-gray-400 text-gray-800 px-4 py-2 rounded-lg w-72 text-lg">
            Accept
          </button>
          <button className="bg-white border border-gray-400 text-gray-800 px-4 py-2 rounded-lg w-72 text-lgk">
            Change Time Duration
          </button>
          <button className="bg-white border border-gray-400 text-gray-800 px-4 py-2 rounded-lg w-72 text-lg">
            Modify It
          </button>
        </div>

        {/* Input Box Section */}
        <div className="flex items-center mt-6 border rounded-lg p-4 bg-white shadow-md w-full">
          <input
            type="text"
            placeholder="Ask something more"
            className="flex-grow bg-transparent outline-none px-3 text-lg"
          />
          <button className="text-gray-800 text-2xl">➤</button>
        </div>
      </div>
    </div>
  );
}

export default RoadmapComponent;
