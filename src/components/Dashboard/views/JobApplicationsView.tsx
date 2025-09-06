import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, Plus, Calendar, ExternalLink, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface JobApplication {
  id: string;
  company_name: string;
  position_title: string;
  job_url?: string;
  status: string;
  application_date?: string;
  salary_range?: string;
  location?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface JobApplicationsViewProps {
  user: User;
}

const JobApplicationsView = ({ user }: JobApplicationsViewProps) => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newApplication, setNewApplication] = useState({
    company_name: "",
    position_title: "",
    job_url: "",
    status: "applied",
    salary_range: "",
    location: "",
    notes: "",
  });
  const { toast } = useToast();

  const statusOptions = [
    { value: "applied", label: "Applied", color: "bg-blue-500" },
    { value: "screening", label: "Screening", color: "bg-yellow-500" },
    { value: "interview", label: "Interview", color: "bg-purple-500" },
    { value: "offer", label: "Offer", color: "bg-green-500" },
    { value: "rejected", label: "Rejected", color: "bg-red-500" },
    { value: "withdrawn", label: "Withdrawn", color: "bg-gray-500" },
  ];

  useEffect(() => {
    fetchApplications();
  }, [user.id]);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch job applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createApplication = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .insert([{
          user_id: user.id,
          ...newApplication,
          application_date: new Date().toISOString().split('T')[0]
        }])
        .select()
        .single();

      if (error) throw error;

      setApplications([data, ...applications]);
      setNewApplication({
        company_name: "",
        position_title: "",
        job_url: "",
        status: "applied",
        salary_range: "",
        location: "",
        notes: "",
      });
      setShowCreateForm(false);
      
      toast({
        title: "Success",
        description: "Job application added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add job application",
        variant: "destructive",
      });
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setApplications(applications.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      ));

      toast({
        title: "Success",
        description: "Application status updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const deleteApplication = async (id: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setApplications(applications.filter(app => app.id !== id));
      
      toast({
        title: "Success",
        description: "Application deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete application",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusInfo = statusOptions.find(s => s.value === status);
    return statusInfo ? statusInfo : { label: status, color: "bg-gray-500" };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Job Applications</h1>
          <p className="text-muted-foreground">
            Track your job applications and manage the hiring process
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Application
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        {statusOptions.map((status) => {
          const count = applications.filter(app => app.status === status.value).length;
          return (
            <Card key={status.value}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                  <div>
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-sm text-muted-foreground">{status.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Application</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  value={newApplication.company_name}
                  onChange={(e) => setNewApplication(prev => ({ ...prev, company_name: e.target.value }))}
                  placeholder="e.g., Google"
                />
              </div>
              <div>
                <Label htmlFor="position">Position Title</Label>
                <Input
                  id="position"
                  value={newApplication.position_title}
                  onChange={(e) => setNewApplication(prev => ({ ...prev, position_title: e.target.value }))}
                  placeholder="e.g., Software Engineer"
                />
              </div>
              <div>
                <Label htmlFor="url">Job URL</Label>
                <Input
                  id="url"
                  value={newApplication.job_url}
                  onChange={(e) => setNewApplication(prev => ({ ...prev, job_url: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newApplication.location}
                  onChange={(e) => setNewApplication(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
              <div>
                <Label htmlFor="salary">Salary Range</Label>
                <Input
                  id="salary"
                  value={newApplication.salary_range}
                  onChange={(e) => setNewApplication(prev => ({ ...prev, salary_range: e.target.value }))}
                  placeholder="e.g., $120k - $150k"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={newApplication.status} 
                  onValueChange={(value) => setNewApplication(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={newApplication.notes}
                onChange={(e) => setNewApplication(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional notes about this application..."
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={createApplication} 
                disabled={!newApplication.company_name || !newApplication.position_title}
              >
                Add Application
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {loading ? (
          <Card>
            <CardContent className="p-6 text-center">
              Loading applications...
            </CardContent>
          </Card>
        ) : applications.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Applications Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start tracking your job applications to organize your job search
              </p>
              <Button onClick={() => setShowCreateForm(true)}>
                Add Your First Application
              </Button>
            </CardContent>
          </Card>
        ) : (
          applications.map((application) => {
            const statusInfo = getStatusBadge(application.status);
            return (
              <Card key={application.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="flex items-center space-x-2">
                        <Briefcase className="h-5 w-5" />
                        <span>{application.position_title}</span>
                        <span className="text-muted-foreground">at {application.company_name}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-4">
                        <Badge 
                          variant="outline"
                          className="text-white"
                          style={{ backgroundColor: statusInfo.color.replace('bg-', '#') }}
                        >
                          {statusInfo.label}
                        </Badge>
                        {application.location && (
                          <span className="text-sm text-muted-foreground">{application.location}</span>
                        )}
                        {application.salary_range && (
                          <span className="text-sm text-muted-foreground">{application.salary_range}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {application.job_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={application.job_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => deleteApplication(application.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {application.notes && (
                      <p className="text-sm text-muted-foreground">{application.notes}</p>
                    )}
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Applied: {application.application_date ? 
                            new Date(application.application_date).toLocaleDateString() : 
                            new Date(application.created_at).toLocaleDateString()
                          }
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Select 
                        value={application.status} 
                        onValueChange={(value) => updateStatus(application.id, value)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm">
                        Schedule Follow-up
                      </Button>
                      <Button variant="outline" size="sm">
                        Add Interview
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default JobApplicationsView;