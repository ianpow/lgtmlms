import React from "react";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";

interface SkillAssessmentToolProps {
  skill: {
    id: string;
    name: string;
    description: string;
    currentLevel: number;
    targetLevel: number;
  };
  onAssessmentSubmit: (assessment: {
    skillId: string;
    level: number;
    notes: string;
  }) => void;
}

const SkillAssessmentTool = ({
  skill,
  onAssessmentSubmit,
}: SkillAssessmentToolProps) => {
  const [level, setLevel] = React.useState(skill.currentLevel);
  const [notes, setNotes] = React.useState("");

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{skill.name}</h3>
          <p className="text-sm text-muted-foreground">{skill.description}</p>
        </div>
        <Badge>{level}/5</Badge>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Skill Level Assessment</Label>
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

        <div className="space-y-2">
          <Label>Assessment Notes</Label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Provide details about your skill level..."
          />
        </div>

        <Button
          onClick={() =>
            onAssessmentSubmit({ skillId: skill.id, level, notes })
          }
          className="w-full"
        >
          Submit Assessment
        </Button>
      </div>
    </Card>
  );
};

export default SkillAssessmentTool;
