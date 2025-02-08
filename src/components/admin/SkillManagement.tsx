import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Skill, SkillCategory, RoleSkillRequirement } from "@/types/skills";

interface SkillManagementProps {
  skills: Skill[];
  categories: SkillCategory[];
  roles: Array<{
    id: string;
    name: string;
    requirements: RoleSkillRequirement[];
  }>;
  onSkillCreate: (skill: Partial<Skill>) => void;
  onSkillUpdate: (id: string, updates: Partial<Skill>) => void;
  onSkillDelete: (id: string) => void;
  onRoleRequirementUpdate: (
    roleId: string,
    requirements: RoleSkillRequirement[],
  ) => void;
}

const SkillManagement = ({
  skills = [],
  categories = [],
  roles = [],
  onSkillCreate,
  onSkillUpdate,
  onSkillDelete,
  onRoleRequirementUpdate,
}: SkillManagementProps) => {
  const [selectedRole, setSelectedRole] = React.useState<string>();
  const [editingSkill, setEditingSkill] = React.useState<Skill>();

  const handleRoleRequirementChange = (skillId: string, level: number) => {
    if (!selectedRole) return;

    const role = roles.find((r) => r.id === selectedRole);
    if (!role) return;

    const newRequirements = [...role.requirements];
    const existingIndex = newRequirements.findIndex(
      (r) => r.skillId === skillId,
    );

    if (existingIndex >= 0) {
      newRequirements[existingIndex] = {
        ...newRequirements[existingIndex],
        requiredLevel: level,
      };
    } else {
      newRequirements.push({
        id: Date.now().toString(),
        roleId: selectedRole,
        skillId,
        requiredLevel: level,
        priority: "important",
      });
    }

    onRoleRequirementUpdate(selectedRole, newRequirements);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Skills & Categories</h3>
          <Button onClick={() => setEditingSkill(undefined)}>
            <Plus className="h-4 w-4 mr-2" /> Add Skill
          </Button>
        </div>

        <ScrollArea className="h-[600px]">
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category.id} className="space-y-4">
                <h4 className="font-medium">{category.name}</h4>
                {skills
                  .filter((skill) => skill.category === category.id)
                  .map((skill) => (
                    <Card key={skill.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium">{skill.name}</h5>
                          <p className="text-sm text-muted-foreground">
                            {skill.description}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingSkill(skill)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onSkillDelete(skill.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Select Role</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedRole && (
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {skills.map((skill) => {
                  const requirement = roles
                    .find((r) => r.id === selectedRole)
                    ?.requirements.find((r) => r.skillId === skill.id);

                  return (
                    <Card key={skill.id} className="p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium">{skill.name}</h5>
                            <p className="text-sm text-muted-foreground">
                              {skill.description}
                            </p>
                          </div>
                          <Badge>
                            Level {requirement?.requiredLevel || "N/A"}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <Label>Required Level</Label>
                          <Select
                            value={requirement?.requiredLevel?.toString()}
                            onValueChange={(value) =>
                              handleRoleRequirementChange(
                                skill.id,
                                parseInt(value),
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Set required level" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5].map((level) => (
                                <SelectItem
                                  key={level}
                                  value={level.toString()}
                                >
                                  Level {level}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SkillManagement;
