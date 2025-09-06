import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

interface SkillsViewProps {
  user: User;
}

const SkillsView = ({ user }: SkillsViewProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Skills & Learning</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>Coming Soon</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Skills assessment and learning path features are being developed.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsView;