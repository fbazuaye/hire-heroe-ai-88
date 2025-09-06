import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  Briefcase,
  DollarSign,
  FileText,
  Goal,
  Home,
  MessageSquare,
  Network,
  PlusCircle,
  Search,
  Settings,
  Target,
  Trophy,
  Users,
} from "lucide-react";

interface DashboardSidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onSignOut: () => void;
}

const menuItems = [
  { id: "overview", label: "Dashboard", icon: Home },
  { id: "resumes", label: "Resumes", icon: FileText },
  { id: "job-applications", label: "Job Applications", icon: Briefcase },
  { id: "job-matches", label: "Job Matching", icon: Search },
  { id: "cover-letters", label: "Cover Letters", icon: PlusCircle },
  { id: "interview-prep", label: "Interview Prep", icon: MessageSquare },
  { id: "skills", label: "Skills & Learning", icon: BookOpen },
  { id: "portfolio", label: "Portfolio", icon: Trophy },
  { id: "networking", label: "Networking", icon: Network },
  { id: "career-goals", label: "Career Goals", icon: Target },
  { id: "salary-insights", label: "Salary Insights", icon: DollarSign },
  { id: "motivation", label: "Motivation", icon: BrainCircuit },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

const DashboardSidebar = ({ activeView, onViewChange, onSignOut }: DashboardSidebarProps) => {
  return (
    <div className="w-64 bg-card border-r flex flex-col">
      <div className="p-6 border-b">
        <h2 className="font-semibold text-lg">Career Center</h2>
        <p className="text-sm text-muted-foreground">Your AI-powered workspace</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeView === item.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                activeView === item.id && "bg-primary/10 text-primary"
              )}
              onClick={() => onViewChange(item.id)}
            >
              <Icon className="h-4 w-4 mr-3" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default DashboardSidebar;