import React from "react";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Brain, Target, TrendingUp } from "lucide-react";

interface SkillGapDashboardProps {
  departmentSkills: Array<{
    skill: string;
    current: number;
    target: number;
    average: number;
  }>;
  recommendations: Array<{
    courseId: string;
    title: string;
    skills: string[];
    matchScore: number;
  }>;
  onCourseSelect: (courseId: string) => void;
}

const SkillGapDashboard = ({
  departmentSkills = [],
  recommendations = [],
  onCourseSelect,
}: SkillGapDashboardProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Department Skill Gaps</h3>
          <div className="space-y-4">
            {departmentSkills.map((item) => (
              <div key={item.skill} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.skill}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.current}/{item.target} (Avg: {item.average})
                  </span>
                </div>
                <Progress value={(item.current / item.target) * 100} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recommended Courses</h3>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {recommendations.map((course) => (
                <Card key={course.courseId} className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h4 className="font-medium">{course.title}</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Badge className="ml-2">{course.matchScore}% Match</Badge>
                  </div>
                  <Button
                    onClick={() => onCourseSelect(course.courseId)}
                    className="w-full mt-4"
                  >
                    View Course
                  </Button>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

export default SkillGapDashboard;
