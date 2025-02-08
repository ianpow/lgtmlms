import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Slider } from "../ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";

interface PathPreferences {
  learningStyle: string;
  pacePreference: number;
  timeCommitment: number;
  includedSkills: string[];
  excludedSkills: string[];
  preferredContentTypes: string[];
  deadlineFlexibility: "strict" | "flexible" | "none";
  includeAssessments: boolean;
  includeProjects: boolean;
}

interface PathCustomizerProps {
  availableSkills: string[];
  onPreferencesChange: (preferences: PathPreferences) => void;
  initialPreferences?: Partial<PathPreferences>;
}

const PathCustomizer = ({
  availableSkills = [],
  onPreferencesChange,
  initialPreferences = {},
}: PathCustomizerProps) => {
  const [preferences, setPreferences] = useState<PathPreferences>({
    learningStyle: "balanced",
    pacePreference: 50,
    timeCommitment: 5,
    includedSkills: [],
    excludedSkills: [],
    preferredContentTypes: ["video", "interactive"],
    deadlineFlexibility: "flexible",
    includeAssessments: true,
    includeProjects: true,
    ...initialPreferences,
  });

  const handleChange = (key: keyof PathPreferences, value: any) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    onPreferencesChange(newPreferences);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Learning Preferences</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Learning Style</Label>
            <Select
              value={preferences.learningStyle}
              onValueChange={(value) => handleChange("learningStyle", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select learning style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visual">Visual Learning</SelectItem>
                <SelectItem value="practical">Hands-on Practice</SelectItem>
                <SelectItem value="theoretical">Theoretical</SelectItem>
                <SelectItem value="balanced">Balanced Mix</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Learning Pace</Label>
            <Slider
              value={[preferences.pacePreference]}
              onValueChange={([value]) => handleChange("pacePreference", value)}
              max={100}
              step={10}
              className="py-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Relaxed</span>
              <span>Intensive</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Weekly Time Commitment (hours)</Label>
            <Slider
              value={[preferences.timeCommitment]}
              onValueChange={([value]) => handleChange("timeCommitment", value)}
              min={1}
              max={20}
              step={1}
              className="py-4"
            />
            <div className="text-sm text-muted-foreground text-center">
              {preferences.timeCommitment} hours per week
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Skills & Content</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Priority Skills</Label>
            <ScrollArea className="h-[200px] border rounded-md p-4">
              <div className="space-y-2">
                {availableSkills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <Switch
                      checked={preferences.includedSkills.includes(skill)}
                      onCheckedChange={(checked) => {
                        const skills = checked
                          ? [...preferences.includedSkills, skill]
                          : preferences.includedSkills.filter(
                              (s) => s !== skill,
                            );
                        handleChange("includedSkills", skills);
                      }}
                    />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="space-y-2">
            <Label>Content Types</Label>
            <div className="flex gap-4">
              {["video", "interactive", "reading", "audio", "practice"].map(
                (type) => (
                  <div key={type} className="flex items-center gap-2">
                    <Switch
                      checked={preferences.preferredContentTypes.includes(type)}
                      onCheckedChange={(checked) => {
                        const types = checked
                          ? [...preferences.preferredContentTypes, type]
                          : preferences.preferredContentTypes.filter(
                              (t) => t !== type,
                            );
                        handleChange("preferredContentTypes", types);
                      }}
                    />
                    <span className="capitalize">{type}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Additional Options</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Include Assessments</Label>
              <p className="text-sm text-muted-foreground">
                Regular knowledge checks and quizzes
              </p>
            </div>
            <Switch
              checked={preferences.includeAssessments}
              onCheckedChange={(checked) =>
                handleChange("includeAssessments", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Include Projects</Label>
              <p className="text-sm text-muted-foreground">
                Hands-on projects and assignments
              </p>
            </div>
            <Switch
              checked={preferences.includeProjects}
              onCheckedChange={(checked) =>
                handleChange("includeProjects", checked)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Deadline Flexibility</Label>
            <Select
              value={preferences.deadlineFlexibility}
              onValueChange={(value: "strict" | "flexible" | "none") =>
                handleChange("deadlineFlexibility", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select deadline preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="strict">Strict Deadlines</SelectItem>
                <SelectItem value="flexible">Flexible Deadlines</SelectItem>
                <SelectItem value="none">No Deadlines</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PathCustomizer;
