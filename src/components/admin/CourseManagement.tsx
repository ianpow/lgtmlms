import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Plus, Edit, Trash2, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CourseForm from "./CourseForm";
import CourseEnrollment from "./CourseEnrollment";
import CourseBuilder from "./CourseBuilder";

interface Course {
  id: string;
  title: string;
  description: string;
  enrollments: number;
  lastUpdated: string;
}

const CourseManagement = () => {
  const [courses, setCourses] = React.useState<Course[]>(
    JSON.parse(localStorage.getItem("courses") || "[]"),
  );
  const [showNewCourse, setShowNewCourse] = React.useState(false);
  const [showEnrollment, setShowEnrollment] = React.useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState<string>();
  const [showEdit, setShowEdit] = React.useState(false);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Courses</h3>
          <Button onClick={() => setShowNewCourse(true)}>
            <Plus className="h-4 w-4 mr-2" /> Create Course
          </Button>
        </div>

        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            {courses.map((course) => (
              <Card key={course.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{course.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {course.description}
                    </p>
                    <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.enrollments} enrolled
                      </div>
                      <div>
                        Last updated:{" "}
                        {new Date(course.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedCourse(course.id);
                        setShowEnrollment(true);
                      }}
                    >
                      <Users className="h-4 w-4 mr-2" /> Manage Enrollment
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedCourse(course.id);
                        setShowEdit(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        const newCourses = courses.filter(
                          (c) => c.id !== course.id,
                        );
                        setCourses(newCourses);
                        localStorage.setItem(
                          "courses",
                          JSON.stringify(newCourses),
                        );
                      }}
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

      <Dialog open={showNewCourse} onOpenChange={setShowNewCourse}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
          </DialogHeader>
          <CourseForm
            onSubmit={(courseData) => {
              const newCourse = {
                id: Date.now().toString(),
                ...courseData,
                enrollments: 0,
                lastUpdated: new Date().toISOString(),
              };
              const updatedCourses = [...courses, newCourse];
              setCourses(updatedCourses);
              localStorage.setItem("courses", JSON.stringify(updatedCourses));
              setShowNewCourse(false);
            }}
            onCancel={() => setShowNewCourse(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
          </DialogHeader>
          <CourseForm
            onSubmit={(courseData) => {
              const updatedCourses = courses.map((c) => {
                if (c.id === selectedCourse) {
                  return {
                    ...c,
                    ...courseData,
                    lastUpdated: new Date().toISOString(),
                  };
                }
                return c;
              });
              setCourses(updatedCourses);
              localStorage.setItem("courses", JSON.stringify(updatedCourses));
              setShowEdit(false);
            }}
            onCancel={() => setShowEdit(false)}
            initialData={
              courses.find((c) => c.id === selectedCourse) || undefined
            }
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showEnrollment} onOpenChange={setShowEnrollment}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Course Enrollment</DialogTitle>
          </DialogHeader>
          <CourseEnrollment
            courseId={selectedCourse || ""}
            departments={[
              { id: "1", name: "Engineering" },
              { id: "2", name: "Design" },
              { id: "3", name: "Marketing" },
            ]}
            roles={[
              { id: "1", name: "Developer" },
              { id: "2", name: "Designer" },
              { id: "3", name: "Manager" },
            ]}
            locations={[
              { id: "1", name: "San Francisco" },
              { id: "2", name: "New York" },
              { id: "3", name: "London" },
            ]}
            onEnroll={(enrollment) => {
              // Get current user from localStorage
              const currentUser = JSON.parse(
                localStorage.getItem("demoUser") || "{}",
              );
              if (!currentUser.id) {
                console.error("No user found");
                return;
              }

              // Get current enrollments
              const enrollments = JSON.parse(
                localStorage.getItem("enrollments") || "[]",
              );

              // Add new enrollment
              enrollments.push({
                userId: currentUser.id,
                courseId: selectedCourse,
                enrollmentDate: new Date().toISOString(),
                ...enrollment,
              });

              // Save enrollments
              localStorage.setItem("enrollments", JSON.stringify(enrollments));

              // Update course enrollments count
              const courses = JSON.parse(
                localStorage.getItem("courses") || "[]",
              );
              const updatedCourses = courses.map((c) => {
                if (c.id === selectedCourse) {
                  return {
                    ...c,
                    enrollments: (c.enrollments || 0) + 1,
                  };
                }
                return c;
              });
              localStorage.setItem("courses", JSON.stringify(updatedCourses));

              setShowEnrollment(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseManagement;
