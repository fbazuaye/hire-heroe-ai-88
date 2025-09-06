import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { 
  Briefcase, 
  FileText, 
  Target, 
  TrendingUp,
  Calendar,
  Star,
  Users,
  Award,
  PlusCircle
} from "lucide-react";

interface DashboardOverviewProps {
  user: User;
}

interface Stats {
  totalApplications: number;
  totalResumes: number;
  totalGoals: number;
  activeInterviews: number;
  recentQuote?: {
    quote_text: string;
    author: string;
  };
}

const DashboardOverview = ({ user }: DashboardOverviewProps) => {
  const [stats, setStats] = useState<Stats>({
    totalApplications: 0,
    totalResumes: 0,
    totalGoals: 0,
    activeInterviews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch various statistics
        const [applications, resumes, goals, interviews, quotes] = await Promise.all([
          supabase.from('job_applications').select('id').eq('user_id', user.id),
          supabase.from('resumes').select('id').eq('user_id', user.id),
          supabase.from('career_goals').select('id').eq('user_id', user.id),
          supabase.from('interview_preparations').select('id').eq('user_id', user.id),
          supabase.from('motivational_quotes').select('quote_text, author').limit(1)
        ]);

        setStats({
          totalApplications: applications.data?.length || 0,
          totalResumes: resumes.data?.length || 0,
          totalGoals: goals.data?.length || 0,
          activeInterviews: interviews.data?.length || 0,
          recentQuote: quotes.data?.[0],
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user.id]);

  const quickActions = [
    { label: "Upload Resume", icon: FileText, action: "resumes" },
    { label: "Add Application", icon: Briefcase, action: "job-applications" },
    { label: "Set Goal", icon: Target, action: "career-goals" },
    { label: "Prep Interview", icon: Calendar, action: "interview-prep" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {user.email?.split('@')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Here's your career progress overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">
              Total job applications
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resumes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalResumes}</div>
            <p className="text-xs text-muted-foreground">
              Resumes created
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGoals}</div>
            <p className="text-xs text-muted-foreground">
              Career goals set
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeInterviews}</div>
            <p className="text-xs text-muted-foreground">
              Interview preps
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PlusCircle className="h-5 w-5" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.action}
                  variant="outline"
                  className="h-auto flex-col space-y-2 p-4"
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Motivation */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">Welcome to CareerAI!</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">Account created successfully</span>
              </div>
              <div className="text-xs text-muted-foreground mt-4">
                Start by uploading your resume or setting career goals
              </div>
            </div>
          </CardContent>
        </Card>

        {stats.recentQuote && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Daily Motivation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <blockquote className="text-sm italic text-muted-foreground">
                  "{stats.recentQuote.quote_text}"
                </blockquote>
                <p className="text-xs font-medium">
                  — {stats.recentQuote.author}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;