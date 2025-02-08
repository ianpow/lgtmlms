import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Progress } from "../ui/progress";
import { Download, FileDown } from "lucide-react";
import { generateTemplate } from "@/lib/templates/bulkImport";

interface SkillExportProps {
  data: {
    users: Array<{
      id: string;
      name: string;
      department: string;
      location: string;
      role: string;
      skills: Array<{
        name: string;
        current: number;
        target: number;
      }>;
    }>;
    departmentGaps: Array<{
      department: string;
      skills: Array<{
        name: string;
        current: number;
        target: number;
        gap: number;
      }>;
    }>;
    locationGaps: Array<{
      location: string;
      skills: Array<{
        name: string;
        current: number;
        target: number;
        gap: number;
      }>;
    }>;
  };
  onExport: (
    format: "csv" | "pdf",
    type: "users" | "departments" | "locations",
    data: any,
  ) => void;
}

const SkillExport = ({ data, onExport }: SkillExportProps) => {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">Skill Reports</h3>
          <p className="text-sm text-muted-foreground">
            Export detailed skill reports by user, department, or location
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <h4 className="font-medium mb-4">User Skills</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Individual skill levels and gaps for all users
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onExport("csv", "users", data.users)}
            >
              <FileDown className="h-4 w-4 mr-2" /> CSV
            </Button>
            <Button onClick={() => onExport("pdf", "users", data.users)}>
              <Download className="h-4 w-4 mr-2" /> PDF
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="font-medium mb-4">Department Gaps</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Skill gaps aggregated by department
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() =>
                onExport("csv", "departments", data.departmentGaps)
              }
            >
              <FileDown className="h-4 w-4 mr-2" /> CSV
            </Button>
            <Button
              onClick={() =>
                onExport("pdf", "departments", data.departmentGaps)
              }
            >
              <Download className="h-4 w-4 mr-2" /> PDF
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="font-medium mb-4">Location Gaps</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Skill gaps aggregated by location
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onExport("csv", "locations", data.locationGaps)}
            >
              <FileDown className="h-4 w-4 mr-2" /> CSV
            </Button>
            <Button
              onClick={() => onExport("pdf", "locations", data.locationGaps)}
            >
              <Download className="h-4 w-4 mr-2" /> PDF
            </Button>
          </div>
        </Card>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-4">Department Skill Gaps</h4>
            <div className="space-y-4">
              {data.departmentGaps.map((dept) => (
                <Card key={dept.department} className="p-4">
                  <h5 className="font-medium mb-2">{dept.department}</h5>
                  <div className="space-y-2">
                    {dept.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{skill.name}</span>
                          <span>Gap: {skill.gap.toFixed(1)}</span>
                        </div>
                        <Progress
                          value={(skill.current / skill.target) * 100}
                          className={
                            skill.gap > 1 ? "bg-red-100" : "bg-green-100"
                          }
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Location Skill Gaps</h4>
            <div className="space-y-4">
              {data.locationGaps.map((loc) => (
                <Card key={loc.location} className="p-4">
                  <h5 className="font-medium mb-2">{loc.location}</h5>
                  <div className="space-y-2">
                    {loc.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{skill.name}</span>
                          <span>Gap: {skill.gap.toFixed(1)}</span>
                        </div>
                        <Progress
                          value={(skill.current / skill.target) * 100}
                          className={
                            skill.gap > 1 ? "bg-red-100" : "bg-green-100"
                          }
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
};

export default SkillExport;
