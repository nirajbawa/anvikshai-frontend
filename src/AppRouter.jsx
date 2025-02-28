import { BrowserRouter, Routes, Route } from "react-router";
import React from "react";
import Homepage from "./pages/LandingPage/HomePage";
import SignUp from "./pages/SignUp/signup";
import Login from "./pages/LogIn/login";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard/dashboard";
import CreateTask from "./pages/Dashboard/createtask";
import { useState } from "react";
import './index.css'

const AppRouter = () => {
  const [tasks, setTasks] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard tasks={tasks}/>} />
          <Route path="/create-task" element={<CreateTask setTasks={setTasks} />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
