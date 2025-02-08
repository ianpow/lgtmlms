import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Switch } from "../ui/switch";
import { DatePicker } from "../ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CourseRequirement {
  id: string;
  courseId: string;
  targetGroup: "all" | "individual" | "role" | "department";
  targetIds?: string[];
  startDate?: Date;
  completionDeadline: Date;
  notificationSchedule: {
    onEnrollment: boolean;
    beforeDeadline: number[];
    afterDeadline: number[];
  };
}

interface CourseRequirementsProps {
  courseId: string;
  departments: Array<{ id: string; name: string }>;
  roles: Array<{ id: string; name: string }>;
  employees: Array<{ id: string; name: string }>;
  onSave: (requirement: CourseRequirement) => void;
}

const CourseRequirements = ({
  courseId,
  departments = [],
  roles = [],
  employees = [],
  onSave,
}: CourseRequirementsProps) => {
  const [requirement, setRequirement] = React.useState<CourseRequirement>({
    id: Date.now().toString(),
    courseId,
    targetGroup: "all",
    completionDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    notificationSchedule: {
      onEnrollment: true,
      beforeDeadline: [7, 3, 1], // Days before deadline
      afterDeadline: [1, 7], // Days after deadline
    },
  });

  const handleTargetGroupChange = (
    value: "all" | "individual" | "role" | "department",
  ) => {
    setRequirement((prev) => ({
      ...prev,
      targetGroup: value,
      targetIds: [],
    }));
  };

  const handleTargetSelection = (ids: string[]) => {
    setRequirement((prev) => ({
      ...prev,
      targetIds: ids,
    }));
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Target Group</Label>
          <Select
            value={requirement.targetGroup}
            onValueChange={handleTargetGroupChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select target group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Employees</SelectItem>
              <SelectItem value="individual">Specific Employees</SelectItem>
              <SelectItem value="role">By Role</SelectItem>
              <SelectItem value="department">By Department</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {requirement.targetGroup !== "all" && (
          <div className="space-y-2">
            <Label>
              Select{" "}
              {requirement.targetGroup === "individual"
                ? "Employees"
                : requirement.targetGroup === "role"
                  ? "Roles"
                  : "Departments"}
            </Label>
            <ScrollArea className="h-[200px] border rounded-md p-4">
              <div className="space-y-2">
                {(requirement.targetGroup === "individual"
                  ? employees
                  : requirement.targetGroup === "role"
                    ? roles
                    : departments
                ).map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <Switch
                      checked={requirement.targetIds?.includes(item.id)}
                      onCheckedChange={(checked) => {
                        const newIds = checked
                          ? [...(requirement.targetIds || []), item.id]
                          : requirement.targetIds?.filter(
                              (id) => id !== item.id,
                            ) || [];
                        handleTargetSelection(newIds);
                      }}
                    />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        <div className="space-y-2">
          <Label>Start Date (for new hires)</Label>
          <DatePicker
            date={requirement.startDate}
            onChange={(date) =>
              setRequirement((prev) => ({ ...prev, startDate: date }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Completion Deadline</Label>
          <DatePicker
            date={requirement.completionDeadline}
            onChange={(date) =>
              setRequirement((prev) => ({ ...prev, completionDeadline: date }))
            }
          />
        </div>

        <div className="space-y-4">
          <Label>Notification Schedule</Label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Switch
                checked={requirement.notificationSchedule.onEnrollment}
                onCheckedChange={(checked) =>
                  setRequirement((prev) => ({
                    ...prev,
                    notificationSchedule: {
                      ...prev.notificationSchedule,
                      onEnrollment: checked,
                    },
                  }))
                }
              />
              <span>Send notification on enrollment</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Days before deadline</Label>
            <Input
              value={requirement.notificationSchedule.beforeDeadline.join(", ")}
              onChange={(e) => {
                const days = e.target.value
                  .split(",")
                  .map((d) => parseInt(d.trim()))
                  .filter((d) => !isNaN(d));
                setRequirement((prev) => ({
                  ...prev,
                  notificationSchedule: {
                    ...prev.notificationSchedule,
                    beforeDeadline: days,
                  },
                }));
              }}
              placeholder="e.g., 7, 3, 1"
            />
          </div>

          <div className="space-y-2">
            <Label>Days after deadline (if not completed)</Label>
            <Input
              value={requirement.notificationSchedule.afterDeadline.join(", ")}
              onChange={(e) => {
                const days = e.target.value
                  .split(",")
                  .map((d) => parseInt(d.trim()))
                  .filter((d) => !isNaN(d));
                setRequirement((prev) => ({
                  ...prev,
                  notificationSchedule: {
                    ...prev.notificationSchedule,
                    afterDeadline: days,
                  },
                }));
              }}
              placeholder="e.g., 1, 7"
            />
          </div>
        </div>

        <Button onClick={() => onSave(requirement)} className="w-full">
          Save Requirements
        </Button>
      </div>
    </Card>
  );
};

export default CourseRequirements;
