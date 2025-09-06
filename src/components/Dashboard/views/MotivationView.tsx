import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";

interface MotivationViewProps {
  user: User;
}

const MotivationView = ({ user }: MotivationViewProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Motivation</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BrainCircuit className="h-5 w-5" />
            <span>Coming Soon</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Motivational content and progress tracking features are being developed.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MotivationView;