import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";

interface CareerGoalsViewProps {
  user: User;
}

const CareerGoalsView = ({ user }: CareerGoalsViewProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Career Goals</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Coming Soon</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Career goal tracking features are being developed.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerGoalsView;