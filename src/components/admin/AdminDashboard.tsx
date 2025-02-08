import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  Plus,
  Users,
  BookOpen,
  GraduationCap,
  Link,
  Image,
  Brain,
  MessageSquare,
  UserCog,
  Building2,
  GitBranch,
  BarChart2,
  Settings,
} from "lucide-react";
import CourseForm from "./CourseForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import ExternalContentSource from "./ExternalContentSource";
import LogoUpload from "./LogoUpload";

interface AdminDashboardProps {
  totalStudents?: number;
  totalCourses?: number;
  completedCourses?: number;
  onCreateCourse?: (courseData: any) => void;
}

const AdminDashboard = ({
  totalStudents = 1250,
  totalCourses = 45,
  completedCourses = 3200,
  onCreateCourse = () => {},
}: AdminDashboardProps) => {
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showExternalSource, setShowExternalSource] = useState(false);
  const [showLogoUpload, setShowLogoUpload] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateCourse = async (courseData: any) => {
    setIsCreating(true);
    try {
      await onCreateCourse(courseData);
      setShowCourseForm(false);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button onClick={() => setShowCourseForm(true)}>
              <Plus className="h-4 w-4 mr-2" /> Create Course
            </Button>
            <Button variant="outline" onClick={() => setShowLogoUpload(true)}>
              <Image className="h-4 w-4 mr-2" /> Update Logo
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowExternalSource(true)}
            >
              <Link className="h-4 w-4 mr-2" /> Connect Source
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Button
            variant="outline"
            className="h-32 flex flex-col items-center justify-center gap-2"
            onClick={() => (window.location.href = "/admin/courses/builder")}
          >
            <BookOpen className="h-8 w-8" />
            Course Builder
          </Button>
          <Button
            variant="outline"
            className="h-32 flex flex-col items-center justify-center gap-2"
            onClick={() => (window.location.href = "/admin/skills")}
          >
            <Brain className="h-8 w-8" />
            Skill Management
          </Button>
          <Button
            variant="outline"
            className="h-32 flex flex-col items-center justify-center gap-2"
            onClick={() => (window.location.href = "/admin/users")}
          >
            <Users className="h-8 w-8" />
            User Management
          </Button>
          <Button
            variant="outline"
            className="h-32 flex flex-col items-center justify-center gap-2"
            onClick={() => (window.location.href = "/admin/roles")}
          >
            <UserCog className="h-8 w-8" />
            Role Management
          </Button>
          <Button
            variant="outline"
            className="h-32 flex flex-col items-center justify-center gap-2"
            onClick={() => (window.location.href = "/admin/departments")}
          >
            <Building2 className="h-8 w-8" />
            Departments & Locations
          </Button>
          <Button
            variant="outline"
            className="h-32 flex flex-col items-center justify-center gap-2"
            onClick={() => (window.location.href = "/admin/learning-paths")}
          >
            <GitBranch className="h-8 w-8" />
            Learning Paths
          </Button>
          <Button
            variant="outline"
            className="h-32 flex flex-col items-center justify-center gap-2"
            onClick={() => (window.location.href = "/admin/analytics")}
          >
            <BarChart2 className="h-8 w-8" />
            Analytics
          </Button>
          <Button
            variant="outline"
            className="h-32 flex flex-col items-center justify-center gap-2"
            onClick={() => (window.location.href = "/admin/surveys")}
          >
            <MessageSquare className="h-8 w-8" />
            Survey Builder
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Students</p>
              <h3 className="text-2xl font-bold">{totalStudents}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Courses</p>
              <h3 className="text-2xl font-bold">{totalCourses}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <GraduationCap className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Course Completions
              </p>
              <h3 className="text-2xl font-bold">{completedCourses}</h3>
            </div>
          </div>
        </Card>
      </div>

      <Dialog open={showCourseForm} onOpenChange={setShowCourseForm}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
          </DialogHeader>
          <CourseForm
            onSubmit={handleCreateCourse}
            onCancel={() => setShowCourseForm(false)}
            isLoading={isCreating}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showLogoUpload} onOpenChange={setShowLogoUpload}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Platform Logo</DialogTitle>
          </DialogHeader>
          <LogoUpload
            currentLogo={localStorage.getItem("platformLogo") || undefined}
            onUpload={(logo) => {
              localStorage.setItem("platformLogo", logo);
              setShowLogoUpload(false);
            }}
            onRemove={() => {
              localStorage.removeItem("platformLogo");
              setShowLogoUpload(false);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showExternalSource} onOpenChange={setShowExternalSource}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Connect External Content Source</DialogTitle>
          </DialogHeader>
          <ExternalContentSource
            onSave={async (config) => {
              console.log("External source config:", config);
              setShowExternalSource(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
