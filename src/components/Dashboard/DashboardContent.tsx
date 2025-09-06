import { User } from "@supabase/supabase-js";
import DashboardOverview from "./views/DashboardOverview";
import ResumesView from "./views/ResumesView";
import JobApplicationsView from "./views/JobApplicationsView";
import JobMatchesView from "./views/JobMatchesView";
import CoverLettersView from "./views/CoverLettersView";
import InterviewPrepView from "./views/InterviewPrepView";
import SkillsView from "./views/SkillsView";
import PortfolioView from "./views/PortfolioView";
import NetworkingView from "./views/NetworkingView";
import CareerGoalsView from "./views/CareerGoalsView";
import SalaryInsightsView from "./views/SalaryInsightsView";
import MotivationView from "./views/MotivationView";
import AnalyticsView from "./views/AnalyticsView";
import SettingsView from "./views/SettingsView";

interface DashboardContentProps {
  activeView: string;
  user: User;
}

const DashboardContent = ({ activeView, user }: DashboardContentProps) => {
  const renderContent = () => {
    switch (activeView) {
      case "overview":
        return <DashboardOverview user={user} />;
      case "resumes":
        return <ResumesView user={user} />;
      case "job-applications":
        return <JobApplicationsView user={user} />;
      case "job-matches":
        return <JobMatchesView user={user} />;
      case "cover-letters":
        return <CoverLettersView user={user} />;
      case "interview-prep":
        return <InterviewPrepView user={user} />;
      case "skills":
        return <SkillsView user={user} />;
      case "portfolio":
        return <PortfolioView user={user} />;
      case "networking":
        return <NetworkingView user={user} />;
      case "career-goals":
        return <CareerGoalsView user={user} />;
      case "salary-insights":
        return <SalaryInsightsView user={user} />;
      case "motivation":
        return <MotivationView user={user} />;
      case "analytics":
        return <AnalyticsView user={user} />;
      case "settings":
        return <SettingsView user={user} />;
      default:
        return <DashboardOverview user={user} />;
    }
  };

  return <div className="p-6">{renderContent()}</div>;
};

export default DashboardContent;