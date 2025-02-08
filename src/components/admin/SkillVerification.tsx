import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface SkillVerificationProps {
  pendingAssessments: Array<{
    id: string;
    skillId: string;
    assessedLevel: number;
    date: string;
    notes?: string;
    verificationStatus: "pending" | "verified" | "rejected";
  }>;
  onVerify: (assessmentId: string, verified: boolean, notes?: string) => void;
}

const SkillVerification: React.FC<SkillVerificationProps> = ({
  pendingAssessments,
  onVerify,
}) => {
  return (
    <div className="space-y-4">
      {pendingAssessments.map((assessment) => (
        <Card key={assessment.id} className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">Skill Assessment</h3>
              <p className="text-sm text-muted-foreground">
                Level {assessment.assessedLevel}
              </p>
            </div>
            <Badge variant="outline">{assessment.verificationStatus}</Badge>
          </div>
          {/* Rest of your component JSX */}
        </Card>
      ))}
    </div>
  );
};

export default SkillVerification;
