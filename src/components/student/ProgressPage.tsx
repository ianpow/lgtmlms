import React, { useState } from "react";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import { Textarea } from "../ui/textarea";

const ProgressPage = () => {
  const [showSkillAssessment, setShowSkillAssessment] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [skillLevel, setSkillLevel] = useState(1);
  const [assessmentNotes, setAssessmentNotes] = useState("");

  const availableSkills = [
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "Java",
    "SQL",
    "AWS",
    "Docker",
  ];

  const currentCourses = [
    {
      id: "1",
      title: "Web Development Fundamentals",
      progress: 65,
      lastAccessed: "2024-03-15",
    },
    {
      id: "2",
      title: "Advanced JavaScript",
      progress: 32,
      lastAccessed: "2024-03-14",
    },
  ];

  const achievements = [
    {
      id: "1",
      title: "First Course Completed",
      date: "2024-02-01",
      icon: "🎓",
    },
    {
      id: "2",
      title: "Perfect Quiz Score",
      date: "2024-02-15",
      icon: "🎯",
    },
  ];

  const skills = [
    { name: "React", level: 4, lastAssessed: "2024-03-01" },
    { name: "TypeScript", level: 3, lastAssessed: "2024-02-15" },
    { name: "Node.js", level: 3, lastAssessed: "2024-02-01" },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Tabs defaultValue="courses" className="w-full">
        <TabsList>
          <TabsTrigger value="courses">Current Courses</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          {currentCourses.map((course) => (
            <Card key={course.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{course.title}</h3>
                <span className="text-sm text-muted-foreground">
                  Last accessed:{" "}
                  {new Date(course.lastAccessed).toLocaleDateString()}
                </span>
              </div>
              <Progress value={course.progress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                {course.progress}% Complete
              </p>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className="p-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                  {achievement.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Earned on {new Date(achievement.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">My Skills</h3>
                <Button
                  variant="outline"
                  onClick={() => setShowSkillAssessment(true)}
                >
                  Assess New Skill
                </Button>
              </div>

              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <Badge>{skill.level}/5</Badge>
                  </div>
                  <Progress value={(skill.level / 5) * 100} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Last assessed:{" "}
                    {new Date(skill.lastAssessed).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showSkillAssessment} onOpenChange={setShowSkillAssessment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Skill Self-Assessment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Skill</Label>
              <Select onValueChange={(value) => setSelectedSkill(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a skill" />
                </SelectTrigger>
                <SelectContent>
                  {availableSkills.map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Current Level (1-5)</Label>
              <Slider
                min={1}
                max={5}
                step={1}
                value={[skillLevel]}
                onValueChange={([value]) => setSkillLevel(value)}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Expert</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                value={assessmentNotes}
                onChange={(e) => setAssessmentNotes(e.target.value)}
                placeholder="Add any relevant notes about your skill level..."
              />
            </div>

            <Button
              className="w-full"
              onClick={() => {
                // Handle skill assessment submission
                setShowSkillAssessment(false);
              }}
            >
              Submit Assessment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProgressPage;
