import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Progress } from "../ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

interface EnrollmentReportProps {
  data: {
    userId?: string;
    courseId?: string;
    departmentId?: string;
    locationId?: string;
    enrollments: Array<{
      id: string;
      userId: string;
      userName: string;
      courseId: string;
      courseName: string;
      progress: number;
      mandatory: boolean;
      enrollmentDate: string;
      completionDate?: string;
      deadline: string;
      department: string;
      location: string;
    }>;
  };
  onFilterChange: (filters: any) => void;
  onExport: (format: "pdf" | "csv", data: any) => void;
}

const EnrollmentReport = ({
  data,
  onFilterChange,
  onExport,
}: EnrollmentReportProps) => {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">Enrollment Report</h3>
          <p className="text-sm text-muted-foreground">
            {data.enrollments.length} enrollments found
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onExport("csv", data)}>
            Export CSV
          </Button>
          <Button onClick={() => onExport("pdf", data)}>Export PDF</Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>Department</Label>
          <Select
            onValueChange={(value) => onFilterChange({ departmentId: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {/* Add department options */}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Location</Label>
          <Select
            onValueChange={(value) => onFilterChange({ locationId: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {/* Add location options */}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Course Type</Label>
          <Select onValueChange={(value) => onFilterChange({ type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="All Courses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="mandatory">Mandatory Only</SelectItem>
              <SelectItem value="optional">Optional Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select onValueChange={(value) => onFilterChange({ status: value })}>
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea className="h-[400px]">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">User</th>
              <th className="text-left py-2">Course</th>
              <th className="text-left py-2">Progress</th>
              <th className="text-left py-2">Department</th>
              <th className="text-left py-2">Location</th>
              <th className="text-left py-2">Enrollment Date</th>
              <th className="text-left py-2">Deadline</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.enrollments.map((enrollment) => (
              <tr key={enrollment.id} className="border-b">
                <td className="py-2">{enrollment.userName}</td>
                <td className="py-2">{enrollment.courseName}</td>
                <td className="py-2 w-32">
                  <Progress value={enrollment.progress} />
                </td>
                <td className="py-2">{enrollment.department}</td>
                <td className="py-2">{enrollment.location}</td>
                <td className="py-2">
                  {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                </td>
                <td className="py-2">
                  {new Date(enrollment.deadline).toLocaleDateString()}
                </td>
                <td className="py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      enrollment.completionDate
                        ? "bg-green-100 text-green-700"
                        : new Date(enrollment.deadline) < new Date()
                          ? "bg-red-100 text-red-700"
                          : enrollment.progress > 0
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {enrollment.completionDate
                      ? "Completed"
                      : new Date(enrollment.deadline) < new Date()
                        ? "Overdue"
                        : enrollment.progress > 0
                          ? "In Progress"
                          : "Not Started"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </Card>
  );
};

export default EnrollmentReport;
