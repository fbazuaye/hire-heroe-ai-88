import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { Search, ExternalLink, Heart, Bookmark, MapPin, DollarSign, Building } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface JobMatch {
  id: string;
  job_title: string;
  company_name: string;
  job_description?: string;
  job_url?: string;
  location?: string;
  salary_range?: string;
  match_score?: number;
  missing_skills?: string[];
  matching_skills?: string[];
  application_status: string;
  saved_at: string;
  created_at: string;
}

interface JobMatchesViewProps {
  user: User;
}

const JobMatchesView = ({ user }: JobMatchesViewProps) => {
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchJobMatches();
  }, [user.id]);

  const fetchJobMatches = async () => {
    try {
      const { data, error } = await supabase
        .from('job_matches')
        .select('*')
        .eq('user_id', user.id)
        .order('match_score', { ascending: false });

      if (error) throw error;
      setJobMatches(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch job matches",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('job_matches')
        .update({ application_status: status })
        .eq('id', id);

      if (error) throw error;

      setJobMatches(jobMatches.map(job => 
        job.id === id ? { ...job, application_status: status } : job
      ));

      toast({
        title: "Success",
        description: `Job ${status === 'applied' ? 'application added' : 'saved'}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const getMatchScoreColor = (score?: number) => {
    if (!score) return "bg-gray-500";
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const filteredJobs = jobMatches.filter(job => {
    const matchesSearch = 
      job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || job.application_status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  // Demo data for when no jobs are available
  const demoJobs: JobMatch[] = [
    {
      id: "demo-1",
      job_title: "Senior Software Engineer",
      company_name: "TechCorp Inc.",
      job_description: "We're looking for a Senior Software Engineer to join our team...",
      job_url: "#",
      location: "San Francisco, CA",
      salary_range: "$130k - $160k",
      match_score: 85,
      matching_skills: ["JavaScript", "React", "Node.js", "TypeScript"],
      missing_skills: ["GraphQL", "AWS"],
      application_status: "not_applied",
      saved_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
    {
      id: "demo-2",
      job_title: "Frontend Developer",
      company_name: "StartupXYZ",
      job_description: "Join our dynamic team as a Frontend Developer...",
      job_url: "#",
      location: "Remote",
      salary_range: "$90k - $120k",
      match_score: 72,
      matching_skills: ["React", "CSS", "JavaScript"],
      missing_skills: ["Vue.js", "Testing"],
      application_status: "not_applied",
      saved_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    },
  ];

  const displayJobs = jobMatches.length > 0 ? filteredJobs : demoJobs;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Job Matching</h1>
          <p className="text-muted-foreground">
            AI-powered job recommendations based on your skills and preferences
          </p>
        </div>
        <Button>
          <Search className="h-4 w-4 mr-2" />
          Find New Jobs
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search jobs or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="border rounded-md px-3 py-2"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Jobs</option>
              <option value="not_applied">Not Applied</option>
              <option value="saved">Saved</option>
              <option value="applied">Applied</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Job Matches */}
      <div className="grid gap-4">
        {loading ? (
          <Card>
            <CardContent className="p-6 text-center">
              Loading job matches...
            </CardContent>
          </Card>
        ) : displayJobs.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Job Matches Found</h3>
              <p className="text-muted-foreground mb-4">
                We haven't found any job matches yet. Update your skills or search preferences.
              </p>
              <Button>
                Update Profile
              </Button>
            </CardContent>
          </Card>
        ) : (
          displayJobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5" />
                      <span>{job.job_title}</span>
                      <span className="text-muted-foreground">at {job.company_name}</span>
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      {job.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                      )}
                      {job.salary_range && (
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{job.salary_range}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {job.match_score && (
                      <Badge 
                        variant="outline"
                        className={`${getMatchScoreColor(job.match_score)} text-white`}
                      >
                        {job.match_score}% Match
                      </Badge>
                    )}
                    <Badge variant="secondary">
                      {job.application_status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {job.job_description && (
                    <p className="text-sm text-muted-foreground">
                      {job.job_description.substring(0, 200)}...
                    </p>
                  )}

                  {job.match_score && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Match Score</span>
                        <span>{job.match_score}%</span>
                      </div>
                      <Progress value={job.match_score} className="h-2" />
                    </div>
                  )}

                  {job.matching_skills && job.matching_skills.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-green-600">Matching Skills:</h4>
                      <div className="flex flex-wrap gap-1">
                        {job.matching_skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-green-600 border-green-600">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {job.missing_skills && job.missing_skills.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-orange-600">Skills to Develop:</h4>
                      <div className="flex flex-wrap gap-1">
                        {job.missing_skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-orange-600 border-orange-600">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-2 pt-2">
                    {job.application_status === 'not_applied' && (
                      <Button 
                        onClick={() => updateApplicationStatus(job.id, 'applied')}
                        className="flex-1"
                      >
                        Quick Apply
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      onClick={() => updateApplicationStatus(job.id, 'saved')}
                    >
                      <Bookmark className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    {job.job_url && (
                      <Button variant="outline" asChild>
                        <a href={job.job_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default JobMatchesView;