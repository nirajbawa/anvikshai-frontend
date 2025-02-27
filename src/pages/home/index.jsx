import React from "react";
import { Button } from "@material-tailwind/react";
import useStore from "../../store/useStore";
// import SignUpPage from "./SignUpPage";

function HomePage() {
  const { count, inc } = useStore();
  return (
    <div className="p-10 flex justify-center items-center flex-col">
    </div>
  );
}

export default HomePage;
