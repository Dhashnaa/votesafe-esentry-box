import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Users, 
  Vote, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  Database,
  Lock,
  Eye,
  Printer
} from "lucide-react";

const AdminDashboard = () => {
  const systemStats = {
    totalVoters: 1247,
    votesRecorded: 892,
    activeStations: 12,
    securityAlerts: 2
  };

  const recentActivity = [
    { time: "14:32", event: "Voter V2024567 authenticated successfully", type: "success" },
    { time: "14:31", event: "Biometric scan completed - Station 03", type: "info" },
    { time: "14:29", event: "Security alert: Tamper switch activated - Station 07", type: "warning" },
    { time: "14:27", event: "Vote encrypted and stored - ID: VE2024892", type: "success" },
    { time: "14:25", event: "System health check completed", type: "info" },
  ];

  const securityStatus = [
    { component: "Encryption System", status: "Active", type: "success" },
    { component: "Tamper Detection", status: "Active", type: "success" },
    { component: "Biometric Scanner", status: "Active", type: "success" },
    { component: "Network Isolation", status: "Active", type: "success" },
    { component: "Thermal Printer", status: "Warning", type: "warning" },
    { component: "Battery Backup", status: "85%", type: "success" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">VoteSafe e-Sentry Box System Control</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print Report
            </Button>
            <Button variant="outline" size="sm">
              <Database className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Voters</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalVoters}</div>
              <p className="text-xs text-muted-foreground">Registered in system</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Votes Recorded</CardTitle>
              <Vote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.votesRecorded}</div>
              <p className="text-xs text-muted-foreground">
                {((systemStats.votesRecorded / systemStats.totalVoters) * 100).toFixed(1)}% turnout
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Stations</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.activeStations}</div>
              <p className="text-xs text-muted-foreground">Online and operational</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{systemStats.securityAlerts}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Security Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>System Security Status</span>
              </CardTitle>
              <CardDescription>
                Real-time monitoring of all security components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securityStatus.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{item.component}</span>
                    <Badge 
                      variant={item.type === "success" ? "default" : "secondary"}
                      className={
                        item.type === "success" 
                          ? "bg-success text-success-foreground" 
                          : item.type === "warning"
                          ? "bg-warning text-warning-foreground"
                          : ""
                      }
                    >
                      {item.type === "success" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {item.type === "warning" && <AlertTriangle className="h-3 w-3 mr-1" />}
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-primary" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>
                Live system events and voter interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Badge variant="outline" className="text-xs">
                      {activity.time}
                    </Badge>
                    <div className="flex-1">
                      <p className="text-sm">{activity.event}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {activity.type === "success" && (
                        <CheckCircle className="h-4 w-4 text-success" />
                      )}
                      {activity.type === "warning" && (
                        <AlertTriangle className="h-4 w-4 text-warning" />
                      )}
                      {activity.type === "info" && (
                        <Activity className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Encryption & Database Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-primary" />
                <span>Encryption Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">AES-256 Encryption</span>
                  <Badge className="bg-success text-success-foreground">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">RSA Key Exchange</span>
                  <Badge className="bg-success text-success-foreground">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">HMAC Verification</span>
                  <Badge className="bg-success text-success-foreground">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Digital Signatures</span>
                  <Badge className="bg-success text-success-foreground">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-primary" />
                <span>Database Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Voter Records</span>
                  <span className="text-sm font-medium">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Encrypted Votes</span>
                  <span className="text-sm font-medium">892</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Audit Log Entries</span>
                  <span className="text-sm font-medium">2,156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Storage Used</span>
                  <span className="text-sm font-medium">34.2 MB</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span>Security Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border border-warning rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <span className="text-sm font-medium">Tamper Switch Alert</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Station 07 - Physical enclosure opened
                  </p>
                </div>
                <div className="p-3 border border-warning rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <span className="text-sm font-medium">Printer Status</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Low paper warning - Replace soon
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;