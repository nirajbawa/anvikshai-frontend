import { Outlet } from "react-router";
import RootNav from "../components/navbars/RootNav";

const RootLayout = () => {
  return (
    <div className="w-full h-full">
      <RootNav />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
