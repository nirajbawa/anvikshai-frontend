import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function CreateTask({ setTasks }) {
  const [newTask, setNewTask] = useState({ title: "", description: "", expected_days:"", expected_hours:"",lang:"" });
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (newTask.title.trim() && newTask.description.trim() && newTask.expected_days.trim()  && newTask.expected_hours.trim() ) {
      setTasks((prev) => [...prev, { ...newTask, id: Date.now() }]);
      navigate("/dashboard"); // Redirect to Dashboard after submitting
    }
  };

  return (
    <div className="pt-28 flex flex-col items-center p-6 border-2 bg-white h-screen">
      <h1 className="text-[30px] font-bold mb-6">Create Task</h1>

      {/* Input Fields */}
      <input
        type="text"
        placeholder="Task Title"
        className="w-80 p-2 border rounded mb-3"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <textarea
        placeholder="Task Description"
        className="w-80 p-2 border rounded mb-3"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      ></textarea>

      <input
        type="number"
        placeholder="Expected duration(In days)"
        className="w-80 p-4 border rounded mb-3"
        value={newTask.expected_days}
        onChange={(e) => setNewTask({ ...newTask, expected_days: e.target.value })}
      ></input>

      <input
        type="number"
        placeholder="Expected Hours per day"
        className="w-80 p-4 border rounded mb-3"
        value={newTask.expected_hours}
        onChange={(e) => setNewTask({ ...newTask, expected_hours: e.target.value })}
      ></input>

        <select
          className="w-80 p-4 border rounded mb-3"
          onChange={(e) => setNewTask({ ...newTask, lang: e.target.value })}
        >
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Marathi">Marathi</option>
        </select>

      {/* Submit Button */}
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSubmit}>
        Submit Task
      </button>
      
    </div>

    
        
       
        
      
  );
}
