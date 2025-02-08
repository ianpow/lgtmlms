import React from "react";
import { Progress } from "../ui/progress";
import { Card } from "../ui/card";
import { BookOpen, Users } from "lucide-react";

interface StatusBarProps {
  completionPercentage?: number;
  activeEnrollments?: number;
  totalCourses?: number;
}

const StatusBar = ({
  completionPercentage = 65,
  activeEnrollments = 3,
  totalCourses = 12,
}: StatusBarProps) => {
  return (
    <Card className="w-full p-6 bg-white shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">
              Overall Progress
            </h3>
            <span className="text-sm font-semibold">
              {completionPercentage}%
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>

        {/* Active Enrollments */}
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600">
              Active Enrollments
            </h3>
            <p className="text-2xl font-semibold">{activeEnrollments}</p>
          </div>
        </div>

        {/* Total Courses */}
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-full">
            <BookOpen className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600">Total Courses</h3>
            <p className="text-2xl font-semibold">{totalCourses}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StatusBar;
