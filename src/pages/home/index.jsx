import React from "react";
import { Button } from "@material-tailwind/react";
import useStore from "../../store/useStore";

function HomePage() {
  const { count, inc } = useStore();
  return (
    <div className="p-10 flex justify-center items-center flex-col">
      <h1 className="text-3xl">{count}</h1>

      <Button onClick={inc}>Button</Button>
    </div>
  );
}

export default HomePage;
