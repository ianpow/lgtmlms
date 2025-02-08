import React, { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Switch } from "../ui/switch";
import CourseBuilder from "./CourseBuilder";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CourseFormProps {
  onSubmit?: (courseData: CourseData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  availableSkills?: Array<{
    id: string;
    name: string;
    category: string;
  }>;
  departments?: Array<{
    id: string;
    name: string;
  }>;
  locations?: Array<{
    id: string;
    name: string;
  }>;
}

interface CourseData {
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  level: string;
  type: "external" | "scorm" | "cmi5" | "xapi" | "builder";
  url?: string;
  scormFile?: File;
  cmi5File?: File;
  sections?: any[];
  skills: Array<{
    skillId: string;
    requiredLevel: number;
    targetLevel: number;
  }>;
  departmentIds: string[];
  locationIds: string[];
  lrsEndpoint?: string;
  lrsKey?: string;
  lrsSecret?: string;
  activityId?: string;
  registration?: string;
}

const CourseForm = ({
  onSubmit = () => {},
  onCancel = () => {},
  isLoading = false,
  availableSkills = [],
  departments = [],
  locations = [],
}: CourseFormProps) => {
  const [formData, setFormData] = useState<CourseData>({
    title: "",
    description: "",
    thumbnail: "",
    duration: "",
    level: "beginner",
    type: "external",
    skills: [],
    departmentIds: [],
    locationIds: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "scorm" | "cmi5",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        [`${type}File`]: file,
        type,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Course Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Enter course title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Enter course description"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (in hours)</Label>
            <Input
              id="duration"
              type="number"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              placeholder="Enter duration"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">Level</Label>
            <Select
              value={formData.level}
              onValueChange={(value) =>
                setFormData({ ...formData, level: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="external" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="external">External URL</TabsTrigger>
            <TabsTrigger value="scorm">SCORM</TabsTrigger>
            <TabsTrigger value="cmi5">cmi5</TabsTrigger>
            <TabsTrigger value="xapi">xAPI</TabsTrigger>
            <TabsTrigger value="builder">Builder</TabsTrigger>
          </TabsList>

          <TabsContent value="external" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">Course URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="Enter course URL"
                value={formData.url || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: "external",
                    url: e.target.value,
                  })
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="scorm" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="scorm">SCORM Package (.zip)</Label>
              <Input
                id="scorm"
                type="file"
                accept=".zip"
                onChange={(e) => handleFileUpload(e, "scorm")}
              />
              <p className="text-sm text-muted-foreground">
                Upload a SCORM compliant .zip file
              </p>
            </div>
          </TabsContent>

          <TabsContent value="cmi5" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cmi5">cmi5 Package (.zip)</Label>
              <Input
                id="cmi5"
                type="file"
                accept=".zip"
                onChange={(e) => handleFileUpload(e, "cmi5")}
              />
              <p className="text-sm text-muted-foreground">
                Upload a cmi5 compliant .zip file
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cmi5-endpoint">LRS Endpoint URL</Label>
              <Input
                id="cmi5-endpoint"
                type="url"
                placeholder="https://your-lrs.com/data/xAPI"
                value={formData.lrsEndpoint || ""}
                onChange={(e) =>
                  setFormData({ ...formData, lrsEndpoint: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cmi5-key">LRS Key</Label>
                <Input
                  id="cmi5-key"
                  type="text"
                  value={formData.lrsKey || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, lrsKey: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cmi5-secret">LRS Secret</Label>
                <Input
                  id="cmi5-secret"
                  type="password"
                  value={formData.lrsSecret || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, lrsSecret: e.target.value })
                  }
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="xapi" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="xapi-content">xAPI Content URL</Label>
              <Input
                id="xapi-content"
                type="url"
                placeholder="Enter content URL"
                value={formData.url || ""}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="xapi-endpoint">LRS Endpoint URL</Label>
              <Input
                id="xapi-endpoint"
                type="url"
                placeholder="https://your-lrs.com/data/xAPI"
                value={formData.lrsEndpoint || ""}
                onChange={(e) =>
                  setFormData({ ...formData, lrsEndpoint: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="xapi-key">LRS Key</Label>
                <Input
                  id="xapi-key"
                  type="text"
                  value={formData.lrsKey || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, lrsKey: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="xapi-secret">LRS Secret</Label>
                <Input
                  id="xapi-secret"
                  type="password"
                  value={formData.lrsSecret || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, lrsSecret: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="xapi-activity-id">Activity ID</Label>
              <Input
                id="xapi-activity-id"
                type="text"
                placeholder="https://example.com/activities/course-123"
                value={formData.activityId || ""}
                onChange={(e) =>
                  setFormData({ ...formData, activityId: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="xapi-registration">Registration UUID</Label>
              <Input
                id="xapi-registration"
                type="text"
                placeholder="Optional: UUID for this registration"
                value={formData.registration || ""}
                onChange={(e) =>
                  setFormData({ ...formData, registration: e.target.value })
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="builder" className="space-y-4">
            <CourseBuilder
              onSave={(sections) =>
                setFormData({ ...formData, type: "builder", sections })
              }
            />
          </TabsContent>
        </Tabs>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Required Skills</Label>
            <ScrollArea className="h-[200px] border rounded-md p-4">
              <div className="space-y-4">
                {availableSkills?.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-4">
                    <Switch
                      checked={formData.skills.some(
                        (s) => s.skillId === skill.id,
                      )}
                      onCheckedChange={(checked) => {
                        const newSkills = checked
                          ? [
                              ...formData.skills,
                              {
                                skillId: skill.id,
                                requiredLevel: 1,
                                targetLevel: 3,
                              },
                            ]
                          : formData.skills.filter(
                              (s) => s.skillId !== skill.id,
                            );
                        setFormData({ ...formData, skills: newSkills });
                      }}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{skill.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {skill.category}
                      </p>
                    </div>
                    {formData.skills.some((s) => s.skillId === skill.id) && (
                      <div className="flex items-center gap-4">
                        <div className="space-y-1">
                          <Label className="text-xs">Required Level</Label>
                          <Select
                            value={formData.skills
                              .find((s) => s.skillId === skill.id)
                              ?.requiredLevel.toString()}
                            onValueChange={(value) => {
                              const newSkills = formData.skills.map((s) =>
                                s.skillId === skill.id
                                  ? { ...s, requiredLevel: parseInt(value) }
                                  : s,
                              );
                              setFormData({ ...formData, skills: newSkills });
                            }}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue placeholder="Level" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5].map((level) => (
                                <SelectItem
                                  key={level}
                                  value={level.toString()}
                                >
                                  {level}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Target Level</Label>
                          <Select
                            value={formData.skills
                              .find((s) => s.skillId === skill.id)
                              ?.targetLevel.toString()}
                            onValueChange={(value) => {
                              const newSkills = formData.skills.map((s) =>
                                s.skillId === skill.id
                                  ? { ...s, targetLevel: parseInt(value) }
                                  : s,
                              );
                              setFormData({ ...formData, skills: newSkills });
                            }}
                          >
                            <SelectTrigger className="w-20">
                              <SelectValue placeholder="Level" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5].map((level) => (
                                <SelectItem
                                  key={level}
                                  value={level.toString()}
                                >
                                  {level}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Departments</Label>
              <ScrollArea className="h-[150px] border rounded-md p-4">
                <div className="space-y-2">
                  {departments?.map((dept) => (
                    <div key={dept.id} className="flex items-center gap-2">
                      <Switch
                        checked={formData.departmentIds.includes(dept.id)}
                        onCheckedChange={(checked) => {
                          const newDepts = checked
                            ? [...formData.departmentIds, dept.id]
                            : formData.departmentIds.filter(
                                (id) => id !== dept.id,
                              );
                          setFormData({
                            ...formData,
                            departmentIds: newDepts,
                          });
                        }}
                      />
                      <span>{dept.name}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="space-y-2">
              <Label>Locations</Label>
              <ScrollArea className="h-[150px] border rounded-md p-4">
                <div className="space-y-2">
                  {locations?.map((loc) => (
                    <div key={loc.id} className="flex items-center gap-2">
                      <Switch
                        checked={formData.locationIds.includes(loc.id)}
                        onCheckedChange={(checked) => {
                          const newLocs = checked
                            ? [...formData.locationIds, loc.id]
                            : formData.locationIds.filter(
                                (id) => id !== loc.id,
                              );
                          setFormData({ ...formData, locationIds: newLocs });
                        }}
                      />
                      <span>{loc.name}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Course"}
        </Button>
      </div>
    </form>
  );
};

export default CourseForm;
