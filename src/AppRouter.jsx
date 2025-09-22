import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/LandingPage/HomePage";
import Chatbot from "./pages/Chatbot/Chatbot";
import AssessmentTests from "./pages/Assessments/AssessmentTests";
import NewDashboard from "./pages/CarrierLandingPage/carrierDashboard";
import SignUp from "./pages/SignUp/signup";
import Login from "./pages/LogIn/login";
import DetailsPage from "./pages/details/Details";
import PaymentPage from "./pages/details/PaymentPage";
import Subscription from "./pages/details/Subscription";
import RoadMap from "./pages/details/RoadMap";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard/dashboard";
import CreateTask from "./pages/Dashboard/createtask";
import Assignment from "./pages/AssignmentComp/Assignment"; 
import Article from "./pages/ArticleComp/Article";
import Quiz from "./pages/QuizComp/Quiz";
import Chat from "./pages/dashboard/chat/chat";
import VideoPage from "./pages/dashboard/video/VideoPage";
import Messages from "./pages/message/Messages";
import MDashboard from "./pages/mentor/dashboard";
import ADashboard from "./pages/Admin/Dashboard";
import Alogin from "./pages/Admin/Login";
import StudnetsList from "./pages/Admin/StudnetsList";
import OtpPage from "./pages/otp";
import DashboardLayout from "./layouts/DashboardLayout";
import AboutUs from "./pages/aboutUs/AboutUs";
import ContactUs from "./pages/details/ContactUs";
import TaskPage from "./pages/task";
import SubscriptionPlans from "./pages/subscription/Subscription";
import CertificatePage from "./pages/certificate";
import Questionnaire from "./pages/Dashboard/Questionnaire";
import AdminLayout from "../src/layouts/AdminLayout";
import AdminOtpLogin from "./pages/Admin/AdminOtpLogin";
import ExpertInvitationPage from "./pages/Admin/expert-invitation";
import ExpertLogin from "./pages/expert/auth/ExpertLogin";
import ExpertDashboardPage from "./pages/expert/dashboard";
import ExpertLayout from "./layouts/ExpertLayout";
import CoursePage from "./pages/expert/courses";
import FeedbackPage from "./pages/expert/courses/feedback";
import ExpertList from "./pages/Admin/expert/ExpertsList";
import FeedbackList from "./pages/Admin/feedback/FeedbackList";
import OnboardingPage from "./pages/expert/auth/onboarding";
import MentorInvitationPage from "./pages/Admin/mentor-invitation";
import MentorOnboardingPage from "./pages/mentor/auth/onboarding";
import MentorLayout from "./layouts/MentorLayout";
import MentorLogin from "./pages/mentor/auth/MentorLogin";
import MentorMessages from "./pages/mentor/chat/Messages";
import MentorList from "./pages/Admin/mentor/MentorList";
import ScrollToTop from "./components/tools/ScrollToTop";
import UserProfile from "./pages/profile/UserProfile";
import Badges from "./pages/badges/Badges";
import CarrierHomePage from "./pages/CarrierLandingPage/carrierLanding";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>

        <Route path="/carrier" element={<CarrierHomePage />} />
        
        

        <Route element={<RootLayout />}>

          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp/:email" element={<OtpPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/admin-sign-in" element={<Alogin />} />
          <Route path="/admin-otp/:email" element={<AdminOtpLogin />} />
          <Route
            path="/expert-onboarding/:token"
            element={<OnboardingPage />}
          />
          <Route path="/expert-login" element={<ExpertLogin />} />
          <Route path="details" element={<DetailsPage />} />
          <Route
            path="/mentor-onboarding/:token"
            element={<MentorOnboardingPage />}
          />
          <Route path="/mentor-login" element={<MentorLogin />} />
          <Route path="/badge/:taskId/" element={<Badges />} />

        </Route>

        <Route path="dashboard" element={<DashboardLayout />}>
        
          <Route index element={<Dashboard />} />
          <Route path="newdashboard" element={<NewDashboard />} />
          <Route path="assessment-tests" element={<AssessmentTests />} />
          <Route path="chatbot" element={<Chatbot />} />
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
          <Route path="subscription-single" element={<SubscriptionPlans />} />
          <Route path="certificates" element={<CertificatePage />} />
          <Route path="questionnaire/:taskId" element={<Questionnaire />} />
          <Route path="messages/:id" element={<Messages />} />
          <Route path="profile" element={<UserProfile />} />

        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<ADashboard />} />

          <Route path="students" element={<StudnetsList />} />
          <Route path="expert-invitation" element={<ExpertInvitationPage />} />
          <Route path="expert" element={<ExpertList />} />
          <Route path="feedbacks" element={<FeedbackList />} />
          <Route path="mentor" element={<MentorList />} />
          <Route path="mentor-invitation" element={<MentorInvitationPage />} />
        </Route>

        <Route path="expert" element={<ExpertLayout />}>
          <Route path="dashboard" element={<ExpertDashboardPage />} />
          <Route path="courses" element={<CoursePage />} />
          <Route path="feedback/:courseId" element={<FeedbackPage />} />
        </Route>

        <Route path="mentor" element={<MentorLayout />}>
          <Route path="dashboard" element={<MDashboard />} />
          <Route path="chats" element={<MentorMessages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
