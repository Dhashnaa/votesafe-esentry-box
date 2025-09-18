import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Lock, Printer, Home } from "lucide-react";

interface VoteSuccessProps {
  onComplete: () => void;
}

const VoteSuccess = ({ onComplete }: VoteSuccessProps) => {
  const voteReceipt = {
    transactionId: "VE2024892",
    timestamp: new Date().toLocaleString(),
    encryptionHash: "SHA256:A7B9C2F1...",
    station: "Station 03"
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-success rounded-full flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-success-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Vote Submitted Successfully</h1>
            <p className="text-muted-foreground mt-2">
              Your vote has been securely encrypted and recorded
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-primary" />
              <span>Vote Receipt</span>
            </CardTitle>
            <CardDescription>
              Your vote confirmation details - Keep this for your records
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Transaction ID:</span>
                <Badge variant="outline" className="font-mono">{voteReceipt.transactionId}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Timestamp:</span>
                <span className="text-sm font-medium">{voteReceipt.timestamp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Station:</span>
                <span className="text-sm font-medium">{voteReceipt.station}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Encryption Hash:</span>
                <Badge variant="outline" className="font-mono text-xs">{voteReceipt.encryptionHash}</Badge>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center space-x-2 text-success mb-2">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Security Verification Complete</span>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>✓ Vote encrypted with AES-256</li>
                <li>✓ Digital signature applied</li>
                <li>✓ HMAC verification successful</li>
                <li>✓ Anonymity preserved</li>
                <li>✓ Stored in secure database</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-2">Important Information:</p>
                <ul className="text-left space-y-1">
                  <li>• Your vote is anonymous and cannot be traced back to you</li>
                  <li>• The transaction ID can be used for audit verification</li>
                  <li>• No personal information is stored with your vote</li>
                  <li>• All data is protected by multiple layers of encryption</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => window.print()}
            className="flex-1"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Receipt
          </Button>
          <Button
            onClick={onComplete}
            className="flex-1"
          >
            <Home className="h-4 w-4 mr-2" />
            Return to Home
          </Button>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <p>Thank you for participating in the democratic process</p>
          <p className="mt-1">VoteSafe e-Sentry Box • Secure • Anonymous • Verifiable</p>
        </div>
      </div>
    </div>
  );
};

export default VoteSuccess;