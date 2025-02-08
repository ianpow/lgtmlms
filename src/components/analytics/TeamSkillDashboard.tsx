import React from "react";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Users, Target, TrendingUp } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  managerEmail: string;
  skills: Array<{
    name: string;
    current: number;
    target: number;
  }>;
}

interface TeamSkillDashboardProps {
  teamMembers: TeamMember[];
  departmentAverages: Array<{
    skill: string;
    average: number;
    target: number;
  }>;
  organizationAverages: Array<{
    skill: string;
    average: number;
    target: number;
  }>;
}

const TeamSkillDashboard = ({
  teamMembers = [],
  departmentAverages = [],
  organizationAverages = [],
}: TeamSkillDashboardProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Team Skill Gaps</h3>
          <ScrollArea className="h-[400px]">
            <div className="space-y-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {member.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {skill.current}/{skill.target}
                          </span>
                        </div>
                        <Progress
                          value={(skill.current / skill.target) * 100}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Department vs Organization
          </h3>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {departmentAverages.map((skill) => (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.skill}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Department</span>
                      <span>
                        {skill.average.toFixed(1)}/{skill.target}
                      </span>
                    </div>
                    <Progress
                      value={(skill.average / skill.target) * 100}
                      className="bg-blue-100"
                    />
                    <div className="flex justify-between text-sm">
                      <span>Organization</span>
                      <span>
                        {organizationAverages
                          .find((org) => org.skill === skill.skill)
                          ?.average.toFixed(1)}
                        /
                        {
                          organizationAverages.find(
                            (org) => org.skill === skill.skill,
                          )?.target
                        }
                      </span>
                    </div>
                    <Progress
                      value={
                        ((organizationAverages.find(
                          (org) => org.skill === skill.skill,
                        )?.average || 0) /
                          (organizationAverages.find(
                            (org) => org.skill === skill.skill,
                          )?.target || 1)) *
                        100
                      }
                      className="bg-green-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

export default TeamSkillDashboard;
