import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import StudentReferral from "./pages/StudentReferral";
import BeyondAcademics from "./pages/BeyondAcademics";
import BeyondAcademicsLeaderboard from "./pages/BeyondAcademicsLeaderboard";
import Dashboard from "./pages/Dashboard";
import Achievements from "./pages/Achievements";
import AchievementTranscript from "./pages/AchievementTranscript";
import VerifyTranscript from "./pages/VerifyTranscript";
import TechnicalAchievementForm from "./pages/TechnicalAchievementForm";
import SportsAchievementForm from "./pages/SportsAchievementForm";
import CulturalAchievementForm from "./pages/CulturalAchievementForm";
import ArtsCultureAchievementForm from "./pages/ArtsCultureAchievementForm";
import StartupAchievementForm from "./pages/StartupAchievementForm";
import CommunityAchievementForm from "./pages/CommunityAchievementForm";
import ClubAchievementForm from "./pages/ClubAchievementForm";
import AdminLogin from "./pages/AdminLogin";
import AdminHODPanel from "./pages/AdminHODPanel";
import AdminFacultyPanel from "./pages/AdminFacultyPanel";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/student-referral" element={<StudentReferral />} />
          <Route path="/beyond-academics" element={<BeyondAcademics />} />
          <Route path="/beyond-academics-leaderboard" element={<BeyondAcademicsLeaderboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/transcript" element={<AchievementTranscript />} />
          <Route path="/verify-transcript/:code" element={<VerifyTranscript />} />
          <Route path="/achievement-form/technical" element={<TechnicalAchievementForm />} />
          <Route path="/achievement-form/sports" element={<SportsAchievementForm />} />
          <Route path="/achievement-form/cultural" element={<CulturalAchievementForm />} />
          <Route path="/achievement-form/arts-culture" element={<ArtsCultureAchievementForm />} />
          <Route path="/achievement-form/startup" element={<StartupAchievementForm />} />
          <Route path="/achievement-form/community" element={<CommunityAchievementForm />} />
          <Route path="/achievement-form/club" element={<ClubAchievementForm />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/faculty" element={<AdminFacultyPanel />} />
          <Route path="/admin/hod" element={<AdminHODPanel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
