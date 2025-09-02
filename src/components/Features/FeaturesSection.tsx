import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Target, 
  MessageSquare, 
  Users, 
  BrainCircuit, 
  BarChart3,
  Mail,
  Calendar
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "AI Resume Review",
    description: "Upload your resume and get instant AI-powered feedback on structure, keywords, and alignment with your target roles.",
    color: "text-primary"
  },
  {
    icon: Target,
    title: "Job Search Strategy",
    description: "Personalized guidance based on your industry, experience level, and career goals to maximize your success rate.",
    color: "text-accent"
  },
  {
    icon: MessageSquare,
    title: "Interview Preparation",
    description: "Practice with AI-generated questions tailored to your target roles, plus STAR method coaching and feedback.",
    color: "text-success"
  },
  {
    icon: Mail,
    title: "Outreach Templates",
    description: "Professional templates for cold outreach, LinkedIn connections, follow-ups, and thank-you messages.",
    color: "text-primary"
  },
  {
    icon: BrainCircuit,
    title: "Role-Specific Insights",
    description: "Deep analysis of job requirements, industry trends, and skill gaps for your target positions.",
    color: "text-accent"
  },
  {
    icon: BarChart3,
    title: "Application Tracking",
    description: "Smart dashboard to manage your applications, follow-ups, interviews, and track your progress.",
    color: "text-success"
  },
  {
    icon: Users,
    title: "Career Coaching",
    description: "AI guidance for career transitions, skill development, and identifying transferable skills.",
    color: "text-primary"
  },
  {
    icon: Calendar,
    title: "Interview Scheduling",
    description: "Automated reminders, prep materials, and post-interview follow-up templates to stay organized.",
    color: "text-accent"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="section-spacing bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Everything You Need to Land Your Dream Job
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered platform provides comprehensive support throughout your entire job search journey
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="card-elevated border-0 bg-card/50 backdrop-blur">
                <CardHeader className="space-y-4">
                  <div className={`inline-flex w-12 h-12 items-center justify-center rounded-lg bg-gradient-primary ${feature.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;