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
import { Upload, Plus, Trash2 } from "lucide-react";
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
    type: "scorm" | "cmi5" | "thumbnail",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === "thumbnail") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, thumbnail: reader.result as string });
        };
        reader.readAsDataURL(file);
      } else {
        setFormData({
          ...formData,
          [`${type}File`]: file,
          type,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <div className="flex items-start gap-6">
          <div className="w-[200px] h-[120px] relative rounded-lg overflow-hidden bg-muted">
            {formData.thumbnail ? (
              <img
                src={formData.thumbnail}
                alt="Course thumbnail"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No thumbnail
              </div>
            )}
            <input
              type="file"
              id="thumbnail-upload"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "thumbnail")}
            />
            <Button
              type="button"
              variant="secondary"
              className="absolute bottom-2 right-2"
              size="sm"
              onClick={() =>
                document.getElementById("thumbnail-upload")?.click()
              }
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
          <div className="flex-1 space-y-2">
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
            <Select
              value={
                formData.skills.length === availableSkills?.length
                  ? "all"
                  : formData.skills.map((s) => s.skillId).join(",")
              }
              onValueChange={(value) => {
                if (value === "all") {
                  const allSkills =
                    availableSkills?.map((skill) => ({
                      skillId: skill.id,
                      requiredLevel: 1,
                      targetLevel: 3,
                    })) || [];
                  setFormData({ ...formData, skills: allSkills });
                } else {
                  const selectedSkills = value
                    .split(",")
                    .filter(Boolean)
                    .map((id) => ({
                      skillId: id,
                      requiredLevel: 1,
                      targetLevel: 3,
                    }));
                  setFormData({ ...formData, skills: selectedSkills });
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select skills" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                {availableSkills?.map((skill) => (
                  <SelectItem key={skill.id} value={skill.id}>
                    {skill.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Departments</Label>
              <Select
                value={
                  formData.departmentIds.length === departments?.length
                    ? "all"
                    : formData.departmentIds.join(",")
                }
                onValueChange={(value) => {
                  if (value === "all") {
                    setFormData({
                      ...formData,
                      departmentIds: departments?.map((d) => d.id) || [],
                    });
                  } else {
                    setFormData({
                      ...formData,
                      departmentIds: value.split(",").filter(Boolean),
                    });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments?.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Locations</Label>
              <Select
                value={
                  formData.locationIds.length === locations?.length
                    ? "all"
                    : formData.locationIds.join(",")
                }
                onValueChange={(value) => {
                  if (value === "all") {
                    setFormData({
                      ...formData,
                      locationIds: locations?.map((l) => l.id) || [],
                    });
                  } else {
                    setFormData({
                      ...formData,
                      locationIds: value.split(",").filter(Boolean),
                    });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations?.map((loc) => (
                    <SelectItem key={loc.id} value={loc.id}>
                      {loc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
