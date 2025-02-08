import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Plus, Edit, Trash2, Building2, Users } from "lucide-react";
import { Department, Location, RoleSkillRequirement } from "@/types/skills";
import BulkOperations from "./BulkOperations";

interface DepartmentLocationManagerProps {
  departments: Department[];
  locations: Location[];
  onDepartmentCreate: (department: Partial<Department>) => void;
  onDepartmentUpdate: (id: string, updates: Partial<Department>) => void;
  onDepartmentDelete: (id: string) => void;
  onLocationCreate: (location: Partial<Location>) => void;
  onLocationUpdate: (id: string, updates: Partial<Location>) => void;
  onLocationDelete: (id: string) => void;
  onBulkImport: (data: any) => Promise<void>;
  onBulkExport: () => Promise<any>;
}

const DepartmentLocationManager = ({
  departments = [],
  locations = [],
  onDepartmentCreate,
  onDepartmentUpdate,
  onDepartmentDelete,
  onLocationCreate,
  onLocationUpdate,
  onLocationDelete,
  onBulkImport,
  onBulkExport,
}: DepartmentLocationManagerProps) => {
  const [newDepartment, setNewDepartment] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [editingDepartment, setEditingDepartment] = useState<string>();
  const [editingLocation, setEditingLocation] = useState<string>();

  const handleCreateDepartment = () => {
    if (!newDepartment.trim()) return;
    onDepartmentCreate({
      name: newDepartment,
      requiredSkills: [],
    });
    setNewDepartment("");
  };

  const handleCreateLocation = () => {
    if (!newLocation.trim()) return;
    onLocationCreate({
      name: newLocation,
      requiredSkills: [],
    });
    setNewLocation("");
  };

  return (
    <div className="space-y-6">
      <BulkOperations
        type="departments"
        onImport={onBulkImport}
        onExport={onBulkExport}
      />

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Departments</h3>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <Input
              value={newDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
              placeholder="New department name"
            />
            <Button onClick={handleCreateDepartment}>
              <Plus className="h-4 w-4 mr-2" /> Add
            </Button>
          </div>

          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {departments.map((dept) => (
                <Card key={dept.id} className="p-4">
                  <div className="flex items-center justify-between">
                    {editingDepartment === dept.id ? (
                      <Input
                        value={dept.name}
                        onChange={(e) =>
                          onDepartmentUpdate(dept.id, { name: e.target.value })
                        }
                        className="flex-1 mr-2"
                      />
                    ) : (
                      <span className="font-medium">{dept.name}</span>
                    )}
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setEditingDepartment(
                            editingDepartment === dept.id ? undefined : dept.id,
                          )
                        }
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDepartmentDelete(dept.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Locations</h3>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <Input
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              placeholder="New location name"
            />
            <Button onClick={handleCreateLocation}>
              <Plus className="h-4 w-4 mr-2" /> Add
            </Button>
          </div>

          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {locations.map((loc) => (
                <Card key={loc.id} className="p-4">
                  <div className="flex items-center justify-between">
                    {editingLocation === loc.id ? (
                      <Input
                        value={loc.name}
                        onChange={(e) =>
                          onLocationUpdate(loc.id, { name: e.target.value })
                        }
                        className="flex-1 mr-2"
                      />
                    ) : (
                      <span className="font-medium">{loc.name}</span>
                    )}
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setEditingLocation(
                            editingLocation === loc.id ? undefined : loc.id,
                          )
                        }
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onLocationDelete(loc.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

export default DepartmentLocationManager;
