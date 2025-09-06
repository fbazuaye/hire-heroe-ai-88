import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

interface InterviewPrepViewProps {
  user: User;
}

const InterviewPrepView = ({ user }: InterviewPrepViewProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Interview Preparation</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Coming Soon</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Interview preparation features are being developed.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewPrepView;