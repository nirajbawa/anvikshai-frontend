import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@material-tailwind/react";
import AppRouter from "./AppRouter";

function App() {
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
