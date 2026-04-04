import { Outlet } from "react-router";
import RootNav from "../components/navbars/RootNav";
import Footer from "../components/footer";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <div className="w-full h-full bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors">
      <RootNav />
      <main>
        <Outlet />
        <ToastContainer position="bottom-left" />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;