import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

interface AnalyticsViewProps {
  user: User;
}

const AnalyticsView = ({ user }: AnalyticsViewProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Coming Soon</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Analytics and insights features are being developed.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsView;