import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface PortfolioViewProps {
  user: User;
}

const PortfolioView = ({ user }: PortfolioViewProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Portfolio</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5" />
            <span>Coming Soon</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Portfolio management features are being developed.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioView;