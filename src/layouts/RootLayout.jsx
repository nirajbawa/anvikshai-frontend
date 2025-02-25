import { Outlet } from "react-router";
import RootNav from "../components/navbars/RootNav";

const RootLayout = () => {
  return (
    <div className="w-full h-full">
      <RootNav />
      <main className="px-10 sm:px-48 xl:px-48">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
