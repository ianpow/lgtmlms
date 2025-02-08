import React from "react";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { ScrollArea } from "../ui/scroll-area";
import { Clock, Target, Brain, Users } from "lucide-react";

interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  estimatedDuration: number;
  enrolledStudents?: number;
  completionRate?: number;
  skillsGained: string[];
  prerequisites?: string[];
}

interface PathComparisonProps {
  paths: LearningPath[];
  selectedPathId?: string;
  onPathSelect: (pathId: string) => void;
}

const PathComparison = ({
  paths = [
    {
      id: "1",
      title: "Web Development Path",
      description: "Learn web development from scratch",
      difficulty: "beginner",
      estimatedDuration: 40,
      skillsGained: ["HTML", "CSS", "JavaScript"],
    },
  ],
  selectedPathId,
  onPathSelect,
}: PathComparisonProps) => {
  return (
    <ScrollArea className="h-[500px]">
      <div className="space-y-4 p-4">
        {paths.map((path) => (
          <Card
            key={path.id}
            className={`p-6 cursor-pointer transition-all ${selectedPathId === path.id ? "ring-2 ring-primary" : "hover:shadow-md"}`}
            onClick={() => onPathSelect(path.id)}
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{path.title}</h3>
                <p className="text-muted-foreground">{path.description}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{path.estimatedDuration}h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{path.difficulty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {path.enrolledStudents} enrolled
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {path.skillsGained.length} skills
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completion Rate</span>
                  <span>{path.completionRate}%</span>
                </div>
                <Progress value={path.completionRate} />
              </div>

              <div className="flex flex-wrap gap-2">
                {path.skillsGained.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default PathComparison;
