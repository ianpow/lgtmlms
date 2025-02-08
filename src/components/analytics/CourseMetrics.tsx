import React from "react";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { Users, Clock, Award, TrendingUp } from "lucide-react";

interface CourseMetricsProps {
  metrics: {
    completionRate: number;
    averageScore: number;
    totalEnrollments: number;
    averageTimeToComplete: number;
    studentSatisfaction: number;
  };
}

const CourseMetrics = ({
  metrics = {
    completionRate: 85,
    averageScore: 92,
    totalEnrollments: 1250,
    averageTimeToComplete: 14,
    studentSatisfaction: 4.5,
  },
}: CourseMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-100 rounded-full">
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Completion Rate</p>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold">{metrics.completionRate}%</h3>
            </div>
          </div>
        </div>
        <Progress value={metrics.completionRate} className="mt-4" />
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-green-100 rounded-full">
            <Award className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Average Score</p>
            <h3 className="text-2xl font-bold">{metrics.averageScore}%</h3>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-purple-100 rounded-full">
            <Users className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Enrollments</p>
            <h3 className="text-2xl font-bold">{metrics.totalEnrollments}</h3>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CourseMetrics;
