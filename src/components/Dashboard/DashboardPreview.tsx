import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  FileText, 
  MessageSquare,
  Target,
  Calendar
} from "lucide-react";

const DashboardPreview = () => {
  return (
    <section id="how-it-works" className="section-spacing">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Your AI-Powered Career Command Center
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how our intelligent dashboard helps you manage every aspect of your job search
          </p>
        </div>
        
        {/* Dashboard Mockup */}
        <div className="bg-gradient-to-br from-primary-light/20 to-accent-light/20 rounded-3xl p-8 backdrop-blur">
          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Resume Analysis Card */}
              <Card className="card-elevated">
                <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Resume Analysis Complete</CardTitle>
                      <CardDescription>AI found 12 improvement opportunities</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-auto bg-success-light text-success">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Analyzed
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Resume Score</span>
                      <span className="font-medium">78/100</span>
                    </div>
                    <Progress value={78} className="h-2" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span>Keywords: Strong</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span>Format: Needs work</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View Detailed Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Interview Prep Card */}
              <Card className="card-elevated">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Interview Preparation</CardTitle>
                      <CardDescription>Practice sessions for Software Engineer roles</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">5/10 questions completed</span>
                    </div>
                    <Progress value={50} className="h-2" />
                    <Button variant="default" size="sm" className="w-full">
                      Continue Practice Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Quick Stats */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Job Search Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Applications Sent</span>
                    <span className="font-bold text-primary">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Interviews Scheduled</span>
                    <span className="font-bold text-accent">4</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Response Rate</span>
                    <span className="font-bold text-success">17%</span>
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Upcoming Tasks */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Tasks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 rounded-lg bg-primary-light">
                    <Clock className="h-4 w-4 text-primary" />
                    <div className="flex-1 text-sm">
                      <div className="font-medium">Interview with Google</div>
                      <div className="text-muted-foreground">Tomorrow at 2:00 PM</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 rounded-lg bg-accent-light">
                    <Upload className="h-4 w-4 text-accent" />
                    <div className="flex-1 text-sm">
                      <div className="font-medium">Update LinkedIn profile</div>
                      <div className="text-muted-foreground">Due today</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 rounded-lg bg-success-light">
                    <Target className="h-4 w-4 text-success" />
                    <div className="flex-1 text-sm">
                      <div className="font-medium">Follow up with recruiter</div>
                      <div className="text-muted-foreground">Friday</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;