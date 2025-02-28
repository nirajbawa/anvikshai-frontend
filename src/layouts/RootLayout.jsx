import { Outlet } from "react-router";
import RootNav from "../components/RootNav";
import Footer from "../components/footer"

const RootLayout = () => {
  return (
    <div className="w-full h-full">
      <RootNav />
      <main className="">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default RootLayout;
