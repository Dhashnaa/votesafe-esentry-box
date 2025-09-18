import { Shield, Users, Settings, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoteSafeHeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  securityStatus: "secure" | "warning" | "alert";
}

const VoteSafeHeader = ({ currentView, onViewChange, securityStatus }: VoteSafeHeaderProps) => {
  const getStatusColor = () => {
    switch (securityStatus) {
      case "secure": return "text-success";
      case "warning": return "text-warning";
      case "alert": return "text-danger";
      default: return "text-muted-foreground";
    }
  };

  return (
    <header className="border-b bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">VoteSafe</h1>
              <p className="text-sm text-muted-foreground">e-Sentry Box Digital Voting System</p>
            </div>
          </div>

          <nav className="flex items-center space-x-2">
            <Button
              variant={currentView === "voter" ? "default" : "ghost"}
              onClick={() => onViewChange("voter")}
              className="flex items-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>Voter Portal</span>
            </Button>
            <Button
              variant={currentView === "admin" ? "default" : "ghost"}
              onClick={() => onViewChange("admin")}
              className="flex items-center space-x-2"
            >
              <Settings className="h-4 w-4" />
              <span>Admin Panel</span>
            </Button>
          </nav>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className={`h-5 w-5 ${getStatusColor()}`} />
              <span className={`text-sm font-medium ${getStatusColor()}`}>
                {securityStatus.toUpperCase()}
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">System Status</div>
              <div className="text-xs text-muted-foreground">Offline Mode Active</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default VoteSafeHeader;