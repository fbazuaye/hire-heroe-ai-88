import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Network } from "lucide-react";

interface NetworkingViewProps {
  user: User;
}

const NetworkingView = ({ user }: NetworkingViewProps) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Networking</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Network className="h-5 w-5" />
            <span>Coming Soon</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Networking and contact management features are being developed.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NetworkingView;