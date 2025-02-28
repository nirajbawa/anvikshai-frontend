import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@material-tailwind/react";
import AppRouter from "./AppRouter";
import Roadmap from "./pages/dashboard/Roadmap/Roadmappage";
import Video from "./pages/dashboard/video/videopage";
import Message from "./pages/message/Messages";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AppRouter />
      
    </>
  );
}

export default App;
