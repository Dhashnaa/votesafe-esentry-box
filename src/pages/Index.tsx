import { useState } from "react";
import VoteSafeHeader from "@/components/VoteSafeHeader";
import VoterAuthentication from "@/components/VoterAuthentication";
import VotingBallot from "@/components/VotingBallot";
import AdminDashboard from "@/components/AdminDashboard";
import VoteSuccess from "@/components/VoteSuccess";

type AppState = "home" | "auth" | "voting" | "success" | "admin";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("home");
  const [currentView, setCurrentView] = useState<"voter" | "admin">("voter");
  const [authenticatedVoter, setAuthenticatedVoter] = useState<any>(null);

  const handleViewChange = (view: "voter" | "admin") => {
    setCurrentView(view);
    if (view === "admin") {
      setCurrentState("admin");
    } else {
      setCurrentState("home");
    }
  };

  const handleVoterAuthenticated = (voter: any) => {
    setAuthenticatedVoter(voter);
    setCurrentState("voting");
  };

  const handleVoteSubmitted = () => {
    setCurrentState("success");
  };

  const handleComplete = () => {
    setCurrentState("home");
    setAuthenticatedVoter(null);
    setCurrentView("voter");
  };

  // Simulate security status based on current state
  const getSecurityStatus = (): "secure" | "warning" | "alert" => {
    // For demo purposes, randomly show different statuses
    const statuses: ("secure" | "warning" | "alert")[] = ["secure", "secure", "secure", "warning"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  if (currentState === "admin") {
    return (
      <div className="min-h-screen bg-background">
        <VoteSafeHeader 
          currentView={currentView}
          onViewChange={handleViewChange}
          securityStatus={getSecurityStatus()}
        />
        <AdminDashboard />
      </div>
    );
  }

  if (currentState === "auth") {
    return <VoterAuthentication onAuthenticated={handleVoterAuthenticated} />;
  }

  if (currentState === "voting" && authenticatedVoter) {
    return <VotingBallot voter={authenticatedVoter} onVoteSubmitted={handleVoteSubmitted} />;
  }

  if (currentState === "success") {
    return <VoteSuccess onComplete={handleComplete} />;
  }

  // Home state
  return (
    <div className="min-h-screen bg-background">
      <VoteSafeHeader 
        currentView={currentView}
        onViewChange={handleViewChange}
        securityStatus={getSecurityStatus()}
      />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-foreground">
                VoteSafe
                <span className="block text-3xl text-primary mt-2">e-Sentry Box</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Secure Digital Voting System with Advanced Biometric Authentication, 
                Multi-Layer Encryption, and Comprehensive Fraud Prevention
              </p>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={() => setCurrentState("auth")}
                className="bg-primary hover:bg-primary-dark text-primary-foreground px-12 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
              >
                Start Voting Process
              </button>
            </div>
          </div>

          {/* Security Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border rounded-lg p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">AES-256 Encryption</h3>
              <p className="text-sm text-muted-foreground">
                Military-grade encryption protects every vote with dual-layer security
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-success-light rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">👤</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Biometric Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Aadhaar-based fingerprint and iris scanning ensures voter identity
              </p>
            </div>

            <div className="bg-card border rounded-lg p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-warning-light rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Fraud Prevention</h3>
              <p className="text-sm text-muted-foreground">
                Real-time monitoring with tamper detection and audit trails
              </p>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="bg-card border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              System Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Security Features</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Two-layer encryption (AES-256 + RSA)</li>
                  <li>• HMAC verification and digital signatures</li>
                  <li>• Biometric authentication (fingerprint/iris)</li>
                  <li>• Tamper-proof hardware enclosure</li>
                  <li>• Real-time fraud detection alerts</li>
                  <li>• Anonymous voting with audit capability</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Accessibility & Operations</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Touchscreen with Braille keypad support</li>
                  <li>• Audio feedback for visually impaired</li>
                  <li>• Offline operation (no internet required)</li>
                  <li>• Battery backup protection</li>
                  <li>• Thermal printer for incident logs</li>
                  <li>• 2-person rule for data export</li>
                </ul>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">System Status</h3>
                <p className="text-sm text-muted-foreground">All security systems operational</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-success font-medium">SECURE</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
