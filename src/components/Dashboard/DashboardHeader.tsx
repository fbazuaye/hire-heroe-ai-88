import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Brain, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  user: User;
  onSignOut: () => void;
}

const DashboardHeader = ({ user, onSignOut }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="border-b bg-card px-6 py-4 flex items-center justify-between">
      <div 
        className="flex items-center space-x-2 cursor-pointer" 
        onClick={() => navigate("/")}
      >
        <div className="flex items-center justify-center w-8 h-8 bg-gradient-primary rounded-lg">
          <Brain className="h-5 w-5 text-white" />
        </div>
        <span className="font-bold text-xl text-primary">CareerAI</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-sm">
          <span className="text-muted-foreground">Welcome, </span>
          <span className="font-medium">{user.email}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onSignOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;