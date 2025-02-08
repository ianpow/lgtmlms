import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import type {
  UserSkill,
  SkillAssessment as SkillAssessmentType,
} from "@/types/skills";

interface SkillAssessmentProps {
  skill: UserSkill;
  onAssessmentSubmit: (assessment: Partial<SkillAssessmentType>) => void;
  isAdmin?: boolean;
}

const SkillAssessment = ({
  skill,
  onAssessmentSubmit,
  isAdmin = false,
}: SkillAssessmentProps) => {
  const [level, setLevel] = React.useState(skill.currentLevel);
  const [notes, setNotes] = React.useState("");

  const handleSubmit = () => {
    onAssessmentSubmit({
      skillId: skill.id,
      assessedLevel: level,
      notes,
      verificationStatus: isAdmin ? "verified" : "pending",
    });
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{skill.name}</h3>
          <p className="text-sm text-muted-foreground">{skill.description}</p>
        </div>
        <Badge variant={isAdmin ? "default" : "secondary"}>
          {isAdmin ? "Admin Assessment" : "Self Assessment"}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Skill Level (1-5)</Label>
          <div className="space-y-4">
            <Slider
              value={[level]}
              onValueChange={([value]) => setLevel(value)}
              min={1}
              max={5}
              step={1}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Expert</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Assessment Notes</Label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Provide details about your assessment..."
          />
        </div>

        <div className="pt-4">
          <Button onClick={handleSubmit} className="w-full">
            Submit Assessment
          </Button>
        </div>
      </div>

      {skill.lastAssessed && (
        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Last assessed: {new Date(skill.lastAssessed).toLocaleDateString()}
          </p>
          {skill.verifiedBy && (
            <p className="text-sm text-muted-foreground">
              Verified by: {skill.verifiedBy}
            </p>
          )}
        </div>
      )}
    </Card>
  );
};

export default SkillAssessment;
