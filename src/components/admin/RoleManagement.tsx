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
    skillId: string;
    level: number;
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
        { skillId: "1", level: 3 },
        { skillId: "2", level: 2 },
      ],
    },
  ]);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Roles</h3>
          <Button>
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
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
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
                  <div className="flex flex-wrap gap-2">
                    {role.skillRequirements.map((req) => (
                      <span
                        key={req.skillId}
                        className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-xs"
                      >
                        Skill {req.skillId} (Level {req.level})
                      </span>
                    ))}
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
