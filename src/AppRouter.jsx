import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./pages/LandingPage/HomePage";
import SignUp from "./pages/SignUp/signup";
import Login from "./pages/LogIn/login";
import DetailsPage from "./pages/details/Details";
import PaymentPage from "./pages/details/PaymentPage";
import Subscription from "./pages/details/Subscription";
import RoadMap from "./pages/details/RoadMap";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard/dashboard";
import CreateTask from "./pages/Dashboard/createtask";
import Assignment from "./pages/AssignmentComp/Assignment"; // Import the new page
import Article from "./pages/ArticleComp/Article";
import Quiz from "./pages/QuizComp/Quiz";
import Chat from "./pages/dashboard/chat/chat";
import VideoPage from "./pages/dashboard/video/VideoPage";
import Messages from "./pages/message/Messages";
import MDashboard from "./pages/Mentor/dashboard";
import ADashboard from "./pages/Admin/Dashboard";
import Alogin from "./pages/Admin/Login";
import Mlogin from "./pages/Mentor/Login";
import Mlist from "./pages/Mentor/List";
import Alist from "./pages/Admin/List";
import OtpPage from "./pages/otp";
import DashboardLayout from "./layouts/DashboardLayout";
import AboutUs from "./pages/aboutUs/AboutUs";
import ContactUs from "./pages/details/ContactUs";
import TaskPage from "./pages/task";
import SubscriptionPlans from "./pages/subscription/Subscription";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp/:email" element={<OtpPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Route>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="details" element={<DetailsPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="roadmap/:id" element={<RoadMap />} />
          <Route path="create-task" element={<CreateTask />} />
          <Route path="chat" element={<Chat />} />
          <Route path="task/:taskId/:dayId" element={<TaskPage />} />
          <Route path="assignment/:dayId" element={<Assignment />} />
          <Route path="article/:taskId/:dayId/" element={<Article />} />
          <Route path="quiz/:dayId" element={<Quiz />} />
          <Route path="video/:taskId/:dayId" element={<VideoPage />} />
          <Route path="message" element={<Messages />} />
          <Route path="mdashboard" element={<MDashboard />} />
          <Route path="adashboard" element={<ADashboard />} />
          <Route path="alogin" element={<Alogin />} />
          <Route path="mlogin" element={<Mlogin />} />
          <Route path="mlist" element={<Mlist />} />
          <Route path="subscription-single" element={<SubscriptionPlans />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
