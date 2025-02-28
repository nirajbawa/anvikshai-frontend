import { useState } from "react";
import { useNavigate } from "react-router-dom";
import create_task from './create_task.jpg'

export default function CreateTask({ setTasks }) {
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (newTask.title.trim() && newTask.description.trim()) {
      setTasks((prev) => [...prev, { ...newTask, id: Date.now() }]);
      navigate("/dashboard"); // Redirect to Dashboard after submitting
    }
  };

  return (
    // <div className="flex flex-col items-center p-6 bg-white min-h-screen">
    //   <h1 className="text-2xl font-bold mb-4">Create Task</h1>
      
    //   {/* Input Fields */}
    //   <input
    //     type="text"
    //     placeholder="Task Title"
    //     className="w-80 p-2 border rounded mb-3"
    //     value={newTask.title}
    //     onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
    //   />
    //   <textarea
    //     placeholder="Task Description"
    //     className="w-80 p-2 border rounded mb-3"
    //     value={newTask.description}
    //     onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
    //   ></textarea>

    //   {/* Submit Button */}
    //   <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSubmit}>
    //     Submit Task
    //   </button>
    // </div>
    


    
      <div class="grid grid-cols-2 border-2 ">

          <div class="ml-20 border-2 mt-10  mb-16 pt-12 pl-32 pb-12">
            <img src={create_task}></img>
          </div>

          <div class=" border-2 mt-6 mr-20 bg-blue-200 mb-16">
          {/* add new task heading */}
            <div class="text-center text-[25px] mt-10 bg-pink-100 p-4 rounded-lg">
                <h1>Add new task</h1>
            </div>

          {/* details */}
            <div>

              <h1>Task Name :</h1>
              <input type="text"></input>
              <h1>Description about task : </h1>
              <textarea></textarea>
              <h1>Expected duration(In days)</h1>
              <input type="number"></input>
              <h1>How Many Hours do you want to spent daily on task</h1>
              <input type="number"></input>
              <h1>Select Language :</h1>
              <select name="lang" id="lang">
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Marathi">Marathi</option>
                    
              </select>
            </div>

          {/* submit button */}
          <div>
            <button>Submit</button>
          </div>


         </div>
          

      </div>
      
    
  );
}
