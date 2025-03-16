import { Outlet } from "react-router";
import RootNav from "../components/navbars/RootNav";
import Footer from "../components/footer";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <div className="w-full h-full">
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
