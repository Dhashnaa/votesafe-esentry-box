import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, Volume2, Eye, Plus, Minus } from "lucide-react";

interface VotingBallotProps {
  voter: any;
  onVoteSubmitted: () => void;
}

const VotingBallot = ({ voter, onVoteSubmitted }: VotingBallotProps) => {
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [fontSize, setFontSize] = useState("text-base");
  const [highContrast, setHighContrast] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const candidates = [
    { id: "C001", name: "Alice Johnson", party: "Democratic Progressive Party", symbol: "🌟" },
    { id: "C002", name: "Robert Smith", party: "National Unity Alliance", symbol: "🏛️" },
    { id: "C003", name: "Maria Garcia", party: "People's Reform Movement", symbol: "🌿" },
    { id: "C004", name: "David Kumar", party: "Innovation First Party", symbol: "🚀" },
  ];

  const fontSizes = ["text-sm", "text-base", "text-lg", "text-xl"];

  const handleVoteSubmit = () => {
    if (!selectedCandidate) return;
    
    setIsSubmitting(true);
    // Simulate vote encryption and submission
    setTimeout(() => {
      onVoteSubmitted();
    }, 3000);
  };

  const readCandidate = (candidate: any) => {
    if ('speechSynthesis' in window && audioEnabled) {
      const text = `${candidate.name}, ${candidate.party}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      speechSynthesis.speak(utterance);
    }
  };

  const increaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex < fontSizes.length - 1) {
      setFontSize(fontSizes[currentIndex + 1]);
    }
  };

  const decreaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex > 0) {
      setFontSize(fontSizes[currentIndex - 1]);
    }
  };

  return (
    <div className={`min-h-screen bg-background p-4 ${highContrast ? 'contrast-125' : ''}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Voter Info Header */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl text-foreground">Official Ballot</CardTitle>
                <CardDescription>
                  Constituency: {voter.constituency} • Voter ID: {voter.id}
                </CardDescription>
              </div>
              <Badge className="bg-success text-success-foreground">
                <CheckCircle className="h-4 w-4 mr-1" />
                Verified Voter
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Accessibility Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Accessibility Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={audioEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => setAudioEnabled(!audioEnabled)}
              >
                <Volume2 className="h-4 w-4 mr-2" />
                Audio Assistance
              </Button>
              <Button
                variant={highContrast ? "default" : "outline"}
                size="sm"
                onClick={() => setHighContrast(!highContrast)}
              >
                <Eye className="h-4 w-4 mr-2" />
                High Contrast
              </Button>
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decreaseFontSize}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-sm px-2">Font Size</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={increaseFontSize}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ballot */}
        <Card>
          <CardHeader>
            <CardTitle className={`${fontSize} text-foreground`}>
              Select Your Candidate
            </CardTitle>
            <CardDescription className={fontSize}>
              Choose one candidate by selecting the radio button next to their name
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedCandidate}
              onValueChange={setSelectedCandidate}
              className="space-y-4"
            >
              {candidates.map((candidate) => (
                <div key={candidate.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={candidate.id} id={candidate.id} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={candidate.id} className="cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{candidate.symbol}</span>
                            <div>
                              <div className={`font-semibold ${fontSize} text-foreground`}>
                                {candidate.name}
                              </div>
                              <div className={`text-muted-foreground ${fontSize}`}>
                                {candidate.party}
                              </div>
                            </div>
                          </div>
                          {audioEnabled && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => readCandidate(candidate)}
                            >
                              <Volume2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </Label>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Vote Submission */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {selectedCandidate ? (
                  <span className="text-success">
                    ✓ Candidate selected: {candidates.find(c => c.id === selectedCandidate)?.name}
                  </span>
                ) : (
                  "Please select a candidate to proceed"
                )}
              </div>
              <Button
                onClick={handleVoteSubmit}
                disabled={!selectedCandidate || isSubmitting}
                className="bg-primary hover:bg-primary-dark"
              >
                {isSubmitting ? "Encrypting & Submitting Vote..." : "Submit Vote"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {isSubmitting && (
          <Card className="border-success">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="animate-pulse">
                  <div className="text-success font-medium">Processing Your Vote</div>
                  <div className="text-sm text-muted-foreground">
                    Applying AES-256 encryption and digital signatures...
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VotingBallot;