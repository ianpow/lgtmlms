import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  skillRequirements: Array<{
    id: string;
    roleId: string;
    skillId: string;
    requiredLevel: number;
    priority: "critical" | "important" | "nice-to-have";
  }>;
}

const RoleManagement = () => {
  const [roles, setRoles] = React.useState<Role[]>([
    {
      id: "1",
      name: "Course Creator",
      description: "Can create and manage courses",
      permissions: ["create_course", "edit_course", "delete_course"],
      skillRequirements: [
        {
          id: "1",
          roleId: "1",
          skillId: "1",
          requiredLevel: 3,
          priority: "important",
        },
        {
          id: "2",
          roleId: "1",
          skillId: "2",
          requiredLevel: 2,
          priority: "important",
        },
      ],
    },
  ]);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Roles</h3>
          <Button
            onClick={() => {
              setRoles([
                ...roles,
                {
                  id: Date.now().toString(),
                  name: "New Role",
                  description: "Role description",
                  permissions: [],
                  skillRequirements: [],
                },
              ]);
            }}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Role
          </Button>
        </div>

        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            {roles.map((role) => (
              <Card key={role.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{role.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {role.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newName = window.prompt(
                          "Enter new role name",
                          role.name,
                        );
                        if (newName) {
                          setRoles(
                            roles.map((r) =>
                              r.id === role.id ? { ...r, name: newName } : r,
                            ),
                          );
                        }
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setRoles(roles.filter((r) => r.id !== role.id))
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-2">Permissions</h5>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-2">Required Skills</h5>
                  <div className="space-y-2">
                    {role.skillRequirements.map((req) => (
                      <div
                        key={req.skillId}
                        className="flex items-center justify-between"
                      >
                        <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-xs">
                          Skill {req.skillId} (Level {req.requiredLevel})
                        </span>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const newLevel = parseInt(
                                window.prompt(
                                  "Enter new required level (1-5)",
                                  req.requiredLevel.toString(),
                                ) || "1",
                              );
                              if (newLevel >= 1 && newLevel <= 5) {
                                setRoles(
                                  roles.map((r) =>
                                    r.id === role.id
                                      ? {
                                          ...r,
                                          skillRequirements:
                                            r.skillRequirements.map((s) =>
                                              s.skillId === req.skillId
                                                ? {
                                                    ...s,
                                                    requiredLevel: newLevel,
                                                  }
                                                : s,
                                            ),
                                        }
                                      : r,
                                  ),
                                );
                              }
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setRoles(
                                roles.map((r) =>
                                  r.id === role.id
                                    ? {
                                        ...r,
                                        skillRequirements:
                                          r.skillRequirements.filter(
                                            (s) => s.skillId !== req.skillId,
                                          ),
                                      }
                                    : r,
                                ),
                              );
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        const skillId = window.prompt("Enter skill ID");
                        const level = parseInt(
                          window.prompt("Enter required level (1-5)") || "1",
                        );
                        if (skillId && level >= 1 && level <= 5) {
                          setRoles(
                            roles.map((r) =>
                              r.id === role.id
                                ? {
                                    ...r,
                                    skillRequirements: [
                                      ...r.skillRequirements,
                                      {
                                        id: Date.now().toString(),
                                        roleId: role.id,
                                        skillId,
                                        requiredLevel: level,
                                        priority: "important",
                                      },
                                    ],
                                  }
                                : r,
                            ),
                          );
                        }
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Skill Requirement
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default RoleManagement;
