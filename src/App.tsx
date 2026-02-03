import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import StudentReferral from "./pages/StudentReferral";
import BeyondAcademics from "./pages/BeyondAcademics";
import BeyondAcademicsAddAchievement from "./pages/BeyondAcademicsAddAchievement";
import TechnicalAchievementForm from "./pages/TechnicalAchievementForm";
import SportsAchievementForm from "./pages/SportsAchievementForm";
import CulturalAchievementForm from "./pages/CulturalAchievementForm";
import LeadershipAchievementForm from "./pages/LeadershipAchievementForm";
import BeyondAcademicsLeaderboard from "./pages/BeyondAcademicsLeaderboard";
import Dashboard from "./pages/Dashboard";
import Achievements from "./pages/Achievements";
import Projects from "./pages/Projects";
import AchievementTranscript from "./pages/AchievementTranscript";
import VerifyTranscript from "./pages/VerifyTranscript";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminHODPanel from "./pages/AdminHODPanel";
import AdminHOSPanel from "./pages/AdminHOSPanel";
import AdminAcademicAffairsPanel from "./pages/AdminAcademicAffairsPanel";
import AdminExaminationPanel from "./pages/AdminExaminationPanel";
import AdminManagementPanel from "./pages/AdminManagementPanel";
import SuperAdminPanel from "./pages/SuperAdminPanel";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/student-referral" element={<StudentReferral />} />
          <Route path="/beyond-academics" element={<BeyondAcademics />} />
          <Route path="/beyond-academics-add-achievement" element={<BeyondAcademicsAddAchievement />} />
          <Route path="/beyond-academics/technical" element={<TechnicalAchievementForm />} />
          <Route path="/beyond-academics/sports" element={<SportsAchievementForm />} />
          <Route path="/beyond-academics/cultural" element={<CulturalAchievementForm />} />
          <Route path="/beyond-academics/leadership" element={<LeadershipAchievementForm />} />
          <Route path="/beyond-academics-leaderboard" element={<BeyondAcademicsLeaderboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/transcript" element={<AchievementTranscript />} />
          <Route path="/verify-transcript/:verificationCode" element={<VerifyTranscript />} />
          <Route path="/verify" element={<VerifyTranscript />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Admin Panels */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
          <Route path="/admin/hod" element={<ProtectedAdminRoute><AdminHODPanel /></ProtectedAdminRoute>} />
          <Route path="/admin/hos" element={<ProtectedAdminRoute><AdminHOSPanel /></ProtectedAdminRoute>} />
          <Route path="/admin/academic-affairs" element={<ProtectedAdminRoute><AdminAcademicAffairsPanel /></ProtectedAdminRoute>} />
          <Route path="/admin/examination" element={<ProtectedAdminRoute><AdminExaminationPanel /></ProtectedAdminRoute>} />
          <Route path="/admin/management" element={<ProtectedAdminRoute><AdminManagementPanel /></ProtectedAdminRoute>} />
          <Route path="/admin/super" element={<ProtectedAdminRoute><SuperAdminPanel /></ProtectedAdminRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
