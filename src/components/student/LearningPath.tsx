import React from "react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Alert, AlertDescription } from "../ui/alert";
import { Clock, Target, Brain, AlertTriangle } from "lucide-react";
import PathCustomizer from "./PathCustomizer";
import PathProgress from "./PathProgress";
import PathComparison from "./PathComparison";

interface LearningPathProps {
  studentData: {
    skillScores: Array<{ name: string; score: number }>;
    learningPatterns: Array<{ timeOfDay: string; sessions: number }>;
    completedCourses: string[];
    preferredContentTypes: Record<string, number>;
  };
  recommendedPaths: Array<{
    id: string;
    title: string;
    description: string;
    courses: Course[];
    skillGaps: string[];
    estimatedDuration: number;
    difficulty: string;
  }>;
  onPathSelect: (pathId: string) => void;
  onCourseStart: (courseId: string) => void;
}

interface Course {
  id: string;
  title: string;
  description: string;
  duration: number;
  level: string;
  skillsGained: string[];
  prerequisites: string[];
}

const LearningPath: React.FC<LearningPathProps> = ({
  studentData,
  recommendedPaths,
  onPathSelect,
  onCourseStart,
}) => {
  const [selectedPath, setSelectedPath] = React.useState<string>();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <Tabs defaultValue="recommendations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="progress">My Progress</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations">
          <PathComparison
            paths={recommendedPaths.map((path) => ({
              ...path,
              skillsGained: path.skillGaps,
              enrolledStudents: 0,
              completionRate: 0,
            }))}
            selectedPathId={selectedPath}
            onPathSelect={(pathId) => {
              setSelectedPath(pathId);
              onPathSelect(pathId);
            }}
          />
        </TabsContent>

        <TabsContent value="progress">
          <PathProgress
            milestones={studentData.completedCourses.map((course) => ({
              id: course,
              title: course,
              type: "course",
              completed: true,
              estimatedHours: 0,
            }))}
            overallProgress={
              (studentData.completedCourses.length /
                (studentData.completedCourses.length + 5)) *
              100
            }
          />
        </TabsContent>

        <TabsContent value="customize">
          <PathCustomizer
            availableSkills={studentData.skillScores.map((s) => s.name)}
            onPreferencesChange={(prefs) => {
              console.log("Updated preferences:", prefs);
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningPath;
