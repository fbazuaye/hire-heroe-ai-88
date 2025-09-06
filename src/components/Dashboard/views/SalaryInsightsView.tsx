import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface SalaryInsightsViewProps {
  user: User;
}

const SalaryInsightsView = ({ user }: SalaryInsightsViewProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Salary Insights</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Coming Soon</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Salary benchmarking and negotiation features are being developed.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalaryInsightsView;