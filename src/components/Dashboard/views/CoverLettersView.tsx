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
import { FileText, Plus, Edit, Trash2, Download, Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CoverLetter {
  id: string;
  title: string;
  company_name: string;
  position_title: string;
  content: string;
  job_description?: string;
  tone: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface CoverLettersViewProps {
  user: User;
}

const CoverLettersView = ({ user }: CoverLettersViewProps) => {
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCoverLetter, setNewCoverLetter] = useState({
    title: "",
    company_name: "",
    position_title: "",
    job_description: "",
    tone: "professional",
    content: "",
  });
  const { toast } = useToast();

  const toneOptions = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "enthusiastic", label: "Enthusiastic" },
    { value: "formal", label: "Formal" },
    { value: "creative", label: "Creative" },
  ];

  const statusOptions = [
    { value: "draft", label: "Draft", color: "bg-gray-500" },
    { value: "ready", label: "Ready", color: "bg-green-500" },
    { value: "sent", label: "Sent", color: "bg-blue-500" },
  ];

  useEffect(() => {
    fetchCoverLetters();
  }, [user.id]);

  const fetchCoverLetters = async () => {
    try {
      const { data, error } = await supabase
        .from('cover_letters')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCoverLetters(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch cover letters",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateAICoverLetter = async () => {
    if (!newCoverLetter.company_name || !newCoverLetter.position_title) {
      toast({
        title: "Error",
        description: "Please fill in company name and position title",
        variant: "destructive",
      });
      return;
    }

    // Generate AI cover letter content based on form data
    const generatedContent = `Dear Hiring Manager,

I am writing to express my strong interest in the ${newCoverLetter.position_title} position at ${newCoverLetter.company_name}. With my background in software development and passion for innovative technology solutions, I am confident that I would be a valuable addition to your team.

${newCoverLetter.job_description ? 
  `After reviewing the job description, I am particularly excited about the opportunity to contribute to ${newCoverLetter.company_name}'s mission. My experience aligns well with the requirements you've outlined.` : 
  `I have been following ${newCoverLetter.company_name}'s work and am impressed by your commitment to excellence and innovation.`}

Throughout my career, I have developed strong skills in:
• Problem-solving and analytical thinking
• Team collaboration and communication
• Adaptability to new technologies and methodologies
• Project management and deadline adherence

I am excited about the opportunity to bring my unique perspective and skills to ${newCoverLetter.company_name}. I would welcome the chance to discuss how my background and enthusiasm can contribute to your team's continued success.

Thank you for considering my application. I look forward to hearing from you.

Sincerely,
[Your Name]`;

    setNewCoverLetter(prev => ({ ...prev, content: generatedContent }));
    
    toast({
      title: "Success",
      description: "AI cover letter generated! You can now edit and customize it.",
    });
  };

  const createCoverLetter = async () => {
    try {
      const { data, error } = await supabase
        .from('cover_letters')
        .insert([{
          user_id: user.id,
          ...newCoverLetter,
          status: 'draft'
        }])
        .select()
        .single();

      if (error) throw error;

      setCoverLetters([data, ...coverLetters]);
      setNewCoverLetter({
        title: "",
        company_name: "",
        position_title: "",
        job_description: "",
        tone: "professional",
        content: "",
      });
      setShowCreateForm(false);
      
      toast({
        title: "Success",
        description: "Cover letter created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create cover letter",
        variant: "destructive",
      });
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('cover_letters')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setCoverLetters(coverLetters.map(cl => 
        cl.id === id ? { ...cl, status: newStatus } : cl
      ));

      toast({
        title: "Success",
        description: "Status updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const deleteCoverLetter = async (id: string) => {
    try {
      const { error } = await supabase
        .from('cover_letters')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCoverLetters(coverLetters.filter(cl => cl.id !== id));
      
      toast({
        title: "Success",
        description: "Cover letter deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete cover letter",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusInfo = statusOptions.find(s => s.value === status);
    return statusInfo || { label: status, color: "bg-gray-500" };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Cover Letters</h1>
          <p className="text-muted-foreground">
            Create personalized cover letters with AI assistance
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Cover Letter
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        {statusOptions.map((status) => {
          const count = coverLetters.filter(cl => cl.status === status.value).length;
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
            <CardTitle className="flex items-center space-x-2">
              <Wand2 className="h-5 w-5" />
              <span>Create AI Cover Letter</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newCoverLetter.title}
                  onChange={(e) => setNewCoverLetter(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Google Software Engineer Cover Letter"
                />
              </div>
              <div>
                <Label htmlFor="tone">Tone</Label>
                <Select 
                  value={newCoverLetter.tone} 
                  onValueChange={(value) => setNewCoverLetter(prev => ({ ...prev, tone: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {toneOptions.map((tone) => (
                      <SelectItem key={tone.value} value={tone.value}>
                        {tone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  value={newCoverLetter.company_name}
                  onChange={(e) => setNewCoverLetter(prev => ({ ...prev, company_name: e.target.value }))}
                  placeholder="e.g., Google"
                />
              </div>
              <div>
                <Label htmlFor="position">Position Title</Label>
                <Input
                  id="position"
                  value={newCoverLetter.position_title}
                  onChange={(e) => setNewCoverLetter(prev => ({ ...prev, position_title: e.target.value }))}
                  placeholder="e.g., Software Engineer"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="job_description">Job Description (Optional)</Label>
              <Textarea
                id="job_description"
                value={newCoverLetter.job_description}
                onChange={(e) => setNewCoverLetter(prev => ({ ...prev, job_description: e.target.value }))}
                placeholder="Paste the job description here for more personalized content..."
                rows={3}
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={generateAICoverLetter}>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate with AI
              </Button>
            </div>

            {newCoverLetter.content && (
              <div>
                <Label htmlFor="content">Generated Content (Edit as needed)</Label>
                <Textarea
                  id="content"
                  value={newCoverLetter.content}
                  onChange={(e) => setNewCoverLetter(prev => ({ ...prev, content: e.target.value }))}
                  rows={15}
                />
              </div>
            )}

            <div className="flex space-x-2">
              <Button 
                onClick={createCoverLetter} 
                disabled={!newCoverLetter.title || !newCoverLetter.content}
              >
                Save Cover Letter
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
              Loading cover letters...
            </CardContent>
          </Card>
        ) : coverLetters.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Cover Letters Yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first AI-powered cover letter to stand out from the competition
              </p>
              <Button onClick={() => setShowCreateForm(true)}>
                Create Your First Cover Letter
              </Button>
            </CardContent>
          </Card>
        ) : (
          coverLetters.map((coverLetter) => {
            const statusInfo = getStatusBadge(coverLetter.status);
            return (
              <Card key={coverLetter.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="h-5 w-5" />
                        <span>{coverLetter.title}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{coverLetter.position_title} at {coverLetter.company_name}</span>
                        <Badge variant="outline">{coverLetter.tone}</Badge>
                        <Badge 
                          variant="outline"
                          className="text-white"
                          style={{ backgroundColor: statusInfo.color.replace('bg-', '#') }}
                        >
                          {statusInfo.label}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => deleteCoverLetter(coverLetter.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      {coverLetter.content.substring(0, 300)}...
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>Created: {new Date(coverLetter.created_at).toLocaleDateString()}</span>
                    </div>

                    <div className="flex space-x-2">
                      <Select 
                        value={coverLetter.status} 
                        onValueChange={(value) => updateStatus(coverLetter.id, value)}
                      >
                        <SelectTrigger className="w-32">
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
                        <Wand2 className="h-4 w-4 mr-1" />
                        Optimize with AI
                      </Button>
                      <Button variant="outline" size="sm">
                        Copy to Clipboard
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

export default CoverLettersView;