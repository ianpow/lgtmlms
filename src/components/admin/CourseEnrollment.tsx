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

interface CourseEnrollmentProps {
  courseId: string;
  departments: Array<{ id: string; name: string }>;
  roles: Array<{ id: string; name: string }>;
  locations: Array<{ id: string; name: string }>;
  onEnroll: (enrollment: {
    courseId: string;
    targetGroup: "all" | "individual" | "role" | "department" | "location";
    targetIds?: string[];
    startDate?: Date;
    completionDeadline: Date;
    isMandatory: boolean;
    notificationSchedule: {
      onEnrollment: boolean;
      beforeDeadline: number[];
      afterDeadline: number[];
    };
  }) => void;
  onError?: (error: string) => void;
}

const CourseEnrollment = ({
  courseId,
  departments = [],
  roles = [],
  locations = [],
  onEnroll,
}: CourseEnrollmentProps) => {
  const [enrollment, setEnrollment] = React.useState({
    courseId,
    targetGroup: "all" as
      | "all"
      | "individual"
      | "role"
      | "department"
      | "location",
    targetIds: [] as string[],
    startDate: undefined as Date | undefined,
    completionDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    isMandatory: false,
    notificationSchedule: {
      onEnrollment: true,
      beforeDeadline: [7, 3, 1], // Days before deadline
      afterDeadline: [1, 7], // Days after deadline
    },
  });

  const handleTargetGroupChange = (value: typeof enrollment.targetGroup) => {
    setEnrollment((prev) => ({
      ...prev,
      targetGroup: value,
      targetIds: [],
    }));
  };

  const handleTargetSelection = (ids: string[]) => {
    setEnrollment((prev) => ({
      ...prev,
      targetIds: ids,
    }));
  };

  const getTargetOptions = () => {
    switch (enrollment.targetGroup) {
      case "department":
        return departments;
      case "role":
        return roles;
      case "location":
        return locations;
      default:
        return [];
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Target Group</Label>
          <Select
            value={enrollment.targetGroup}
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
              <SelectItem value="location">By Location</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {enrollment.targetGroup !== "all" && (
          <div className="space-y-2">
            <Label>
              Select{" "}
              {enrollment.targetGroup === "individual"
                ? "Employees"
                : enrollment.targetGroup === "role"
                  ? "Roles"
                  : enrollment.targetGroup === "department"
                    ? "Departments"
                    : "Locations"}
            </Label>
            <ScrollArea className="h-[200px] border rounded-md p-4">
              <div className="space-y-2">
                {getTargetOptions().map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <Switch
                      checked={enrollment.targetIds?.includes(item.id)}
                      onCheckedChange={(checked) => {
                        const newIds = checked
                          ? [...(enrollment.targetIds || []), item.id]
                          : enrollment.targetIds?.filter(
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
            date={enrollment.startDate}
            onChange={(date) =>
              setEnrollment((prev) => ({ ...prev, startDate: date }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Completion Deadline</Label>
          <DatePicker
            date={enrollment.completionDeadline}
            onChange={(date) =>
              setEnrollment((prev) => ({ ...prev, completionDeadline: date }))
            }
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={enrollment.isMandatory}
            onCheckedChange={(checked) =>
              setEnrollment((prev) => ({ ...prev, isMandatory: checked }))
            }
          />
          <Label>Mandatory Course</Label>
        </div>

        <div className="space-y-4">
          <Label>Notification Schedule</Label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Switch
                checked={enrollment.notificationSchedule.onEnrollment}
                onCheckedChange={(checked) =>
                  setEnrollment((prev) => ({
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
              value={enrollment.notificationSchedule.beforeDeadline.join(", ")}
              onChange={(e) => {
                const days = e.target.value
                  .split(",")
                  .map((d) => parseInt(d.trim()))
                  .filter((d) => !isNaN(d));
                setEnrollment((prev) => ({
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
              value={enrollment.notificationSchedule.afterDeadline.join(", ")}
              onChange={(e) => {
                const days = e.target.value
                  .split(",")
                  .map((d) => parseInt(d.trim()))
                  .filter((d) => !isNaN(d));
                setEnrollment((prev) => ({
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

        <Button onClick={() => onEnroll(enrollment)} className="w-full">
          Enroll Users
        </Button>
      </div>
    </Card>
  );
};

export default CourseEnrollment;
