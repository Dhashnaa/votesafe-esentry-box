import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Fingerprint, Eye, CheckCircle, AlertCircle, Volume2 } from "lucide-react";

interface VoterAuthenticationProps {
  onAuthenticated: (voter: any) => void;
}

const VoterAuthentication = ({ onAuthenticated }: VoterAuthenticationProps) => {
  const [step, setStep] = useState<"aadhaar" | "biometric" | "verification">("aadhaar");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const handleAadhaarSubmit = () => {
    setIsLoading(true);
    // Simulate Aadhaar validation
    setTimeout(() => {
      setStep("biometric");
      setIsLoading(false);
    }, 2000);
  };

  const handleBiometricScan = (type: "fingerprint" | "iris") => {
    setIsLoading(true);
    // Simulate biometric scan
    setTimeout(() => {
      setStep("verification");
      setIsLoading(false);
    }, 3000);
  };

  const handleVerificationComplete = () => {
    // Simulate successful authentication
    const mockVoter = {
      id: "V2024001",
      name: "Demo Voter",
      aadhaar: aadhaarNumber,
      constituency: "Demo Constituency 001",
      verified: true
    };
    onAuthenticated(mockVoter);
  };

  const playAudioInstruction = (text: string) => {
    if ('speechSynthesis' in window && audioEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Voter Authentication</h2>
          <p className="text-muted-foreground">Secure biometric verification system</p>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <Button
            variant={audioEnabled ? "default" : "outline"}
            size="sm"
            onClick={() => setAudioEnabled(!audioEnabled)}
          >
            <Volume2 className="h-4 w-4 mr-2" />
            Audio Assistance
          </Button>
        </div>

        {step === "aadhaar" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Step 1: Aadhaar Verification</span>
              </CardTitle>
              <CardDescription>
                Enter your 12-digit Aadhaar number for identity verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aadhaar">Aadhaar Number</Label>
                <Input
                  id="aadhaar"
                  type="text"
                  placeholder="XXXX XXXX XXXX"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value)}
                  maxLength={12}
                  className="text-center text-lg tracking-widest"
                />
              </div>
              <Button
                onClick={handleAadhaarSubmit}
                disabled={aadhaarNumber.length !== 12 || isLoading}
                className="w-full"
              >
                {isLoading ? "Verifying..." : "Verify Aadhaar"}
              </Button>
            </CardContent>
          </Card>
        )}

        {step === "biometric" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Fingerprint className="h-5 w-5 text-primary" />
                <span>Step 2: Biometric Authentication</span>
              </CardTitle>
              <CardDescription>
                Choose your preferred biometric verification method
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => handleBiometricScan("fingerprint")}
                  disabled={isLoading}
                  className="h-24 flex-col space-y-2"
                >
                  <Fingerprint className="h-8 w-8" />
                  <span>Fingerprint</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleBiometricScan("iris")}
                  disabled={isLoading}
                  className="h-24 flex-col space-y-2"
                >
                  <Eye className="h-8 w-8" />
                  <span>Iris Scan</span>
                </Button>
              </div>
              {isLoading && (
                <div className="text-center">
                  <div className="animate-pulse">
                    <div className="text-sm text-muted-foreground">Scanning biometric data...</div>
                    <div className="text-xs text-muted-foreground mt-1">Please hold steady</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {step === "verification" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Step 3: Verification Complete</span>
              </CardTitle>
              <CardDescription>
                Your identity has been successfully verified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Voter ID:</span>
                  <Badge variant="outline">V2024001</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge className="bg-success text-success-foreground">Verified</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Constituency:</span>
                  <span className="text-sm">Demo Constituency 001</span>
                </div>
              </div>
              <Button
                onClick={handleVerificationComplete}
                className="w-full"
              >
                Proceed to Voting
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="text-center text-xs text-muted-foreground">
          <p>Secured with AES-256 encryption • Biometric data not stored</p>
        </div>
      </div>
    </div>
  );
};

export default VoterAuthentication;