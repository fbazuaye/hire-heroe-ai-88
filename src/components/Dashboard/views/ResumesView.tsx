import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Upload, Edit, Trash2, Star, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Resume {
  id: string;
  title: string;
  content: any;
  file_url?: string;
  is_primary: boolean;
  ats_score?: number;
  created_at: string;
  updated_at: string;
}

interface ResumesViewProps {
  user: User;
}

const ResumesView = ({ user }: ResumesViewProps) => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newResume, setNewResume] = useState({
    title: "",
    content: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchResumes();
  }, [user.id]);

  const fetchResumes = async () => {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResumes(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch resumes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createResume = async () => {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .insert([{
          user_id: user.id,
          title: newResume.title,
          content: { text: newResume.content },
          is_primary: resumes.length === 0
        }])
        .select()
        .single();

      if (error) throw error;

      setResumes([data, ...resumes]);
      setNewResume({ title: "", content: "" });
      setShowCreateForm(false);
      
      toast({
        title: "Success",
        description: "Resume created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create resume",
        variant: "destructive",
      });
    }
  };

  const deleteResume = async (id: string) => {
    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setResumes(resumes.filter(r => r.id !== id));
      
      toast({
        title: "Success",
        description: "Resume deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive",
      });
    }
  };

  const setPrimary = async (id: string) => {
    try {
      // First, unset all primary flags
      await supabase
        .from('resumes')
        .update({ is_primary: false })
        .eq('user_id', user.id);

      // Then set the selected one as primary
      const { error } = await supabase
        .from('resumes')
        .update({ is_primary: true })
        .eq('id', id);

      if (error) throw error;

      setResumes(resumes.map(r => ({
        ...r,
        is_primary: r.id === id
      })));

      toast({
        title: "Success",
        description: "Primary resume updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update primary resume",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Resumes</h1>
          <p className="text-muted-foreground">
            Manage your resumes and get AI-powered optimization suggestions
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <FileText className="h-4 w-4 mr-2" />
          Create Resume
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Resume</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Resume Title</Label>
              <Input
                id="title"
                value={newResume.title}
                onChange={(e) => setNewResume(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Software Engineer Resume"
              />
            </div>
            <div>
              <Label htmlFor="content">Resume Content</Label>
              <Textarea
                id="content"
                value={newResume.content}
                onChange={(e) => setNewResume(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Paste your resume content here..."
                rows={10}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={createResume} disabled={!newResume.title || !newResume.content}>
                Create Resume
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
              Loading resumes...
            </CardContent>
          </Card>
        ) : resumes.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Resumes Yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first resume to get started with AI-powered optimization
              </p>
              <Button onClick={() => setShowCreateForm(true)}>
                Create Your First Resume
              </Button>
            </CardContent>
          </Card>
        ) : (
          resumes.map((resume) => (
            <Card key={resume.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>{resume.title}</span>
                      {resume.is_primary && (
                        <Badge variant="secondary">
                          <Star className="h-3 w-3 mr-1" />
                          Primary
                        </Badge>
                      )}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Created: {new Date(resume.created_at).toLocaleDateString()}</span>
                      {resume.ats_score && (
                        <Badge variant="outline">
                          ATS Score: {resume.ats_score}%
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    {!resume.is_primary && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setPrimary(resume.id)}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => deleteResume(resume.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    {resume.content?.text?.substring(0, 200) || "No content"}
                    {resume.content?.text?.length > 200 && "..."}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Analyze with AI
                    </Button>
                    <Button variant="outline" size="sm">
                      Optimize for ATS
                    </Button>
                    <Button variant="outline" size="sm">
                      Generate Cover Letter
                    </Button>
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

export default ResumesView;