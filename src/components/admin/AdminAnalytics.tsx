import React from "react";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Users, BookOpen, Brain, TrendingUp } from "lucide-react";
import CourseMetrics from "../analytics/CourseMetrics";
import SkillGapDashboard from "../analytics/SkillGapDashboard";
import TeamSkillDashboard from "../analytics/TeamSkillDashboard";
import ReportGenerator from "../analytics/ReportGenerator";
import EnrollmentReport from "../analytics/EnrollmentReport";
import SkillExport from "../analytics/SkillExport";
import { generateTemplate } from "@/lib/templates/bulkImport";
import { jsPDF } from "jspdf";

const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <h3 className="text-2xl font-bold">1,234</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Course Completions
              </p>
              <h3 className="text-2xl font-bold">856</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Skills Gained</p>
              <h3 className="text-2xl font-bold">2,567</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Engagement</p>
              <h3 className="text-2xl font-bold">78%</h3>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="courses">
        <TabsList>
          <TabsTrigger value="courses">Course Analytics</TabsTrigger>
          <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
          <TabsTrigger value="skills">Skill Gaps</TabsTrigger>
          <TabsTrigger value="teams">Team Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <CourseMetrics
            metrics={{
              completionRate: 85,
              averageScore: 92,
              totalEnrollments: 1250,
              averageTimeToComplete: 14,
              studentSatisfaction: 4.5,
            }}
          />
        </TabsContent>

        <TabsContent value="enrollments">
          <EnrollmentReport
            data={{
              enrollments: [
                {
                  id: "1",
                  userId: "1",
                  userName: "John Doe",
                  courseId: "1",
                  courseName: "Web Development Fundamentals",
                  progress: 75,
                  mandatory: true,
                  enrollmentDate: "2024-03-01",
                  deadline: "2024-04-01",
                  department: "Engineering",
                  location: "San Francisco",
                },
                {
                  id: "2",
                  userId: "2",
                  userName: "Jane Smith",
                  courseId: "2",
                  courseName: "Advanced JavaScript",
                  progress: 45,
                  mandatory: false,
                  enrollmentDate: "2024-03-05",
                  deadline: "2024-04-05",
                  department: "Engineering",
                  location: "New York",
                },
              ],
            }}
            onFilterChange={(filters) => {
              console.log("Filter change:", filters);
              // Implement filter logic
            }}
            onExport={(format, data) => {
              if (format === "csv") {
                const { template, headers } = generateTemplate("enrollments");
                const csvContent = [
                  headers.join(","),
                  ...data.enrollments.map((row: any) =>
                    headers
                      .map((header) => {
                        const value = row[header];
                        if (typeof value === "object")
                          return JSON.stringify(value);
                        if (typeof value === "string" && value.includes(","))
                          return `"${value}"`;
                        return value;
                      })
                      .join(","),
                  ),
                ].join("\n");

                const blob = new Blob([csvContent], { type: "text/csv" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `enrollment-report-${new Date().toISOString().split("T")[0]}.csv`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              } else {
                // PDF export using jsPDF
                const doc = new jsPDF();
                doc.text("Enrollment Report", 20, 20);

                // Add headers
                const headers = [
                  "User",
                  "Course",
                  "Progress",
                  "Department",
                  "Location",
                  "Status",
                ];
                let yPos = 30;

                data.enrollments.forEach((enrollment: any, index: number) => {
                  if (yPos > 250) {
                    doc.addPage();
                    yPos = 20;
                  }

                  doc.text(`${enrollment.userName}`, 20, yPos);
                  doc.text(`${enrollment.courseName}`, 60, yPos);
                  doc.text(`${enrollment.progress}%`, 100, yPos);
                  doc.text(`${enrollment.department}`, 140, yPos);
                  doc.text(`${enrollment.location}`, 180, yPos);

                  yPos += 10;
                });

                doc.save(
                  `enrollment-report-${new Date().toISOString().split("T")[0]}.pdf`,
                );
              }
            }}
          />
        </TabsContent>

        <TabsContent value="skills">
          <div className="space-y-6">
            <SkillGapDashboard
              departmentSkills={[
                {
                  skill: "React",
                  current: 3,
                  target: 4,
                  average: 3.5,
                },
                {
                  skill: "TypeScript",
                  current: 2,
                  target: 4,
                  average: 2.8,
                },
              ]}
              recommendations={[
                {
                  courseId: "1",
                  title: "Advanced React Patterns",
                  skills: ["React", "TypeScript"],
                  matchScore: 95,
                },
              ]}
              onCourseSelect={() => {}}
            />
            <SkillExport
              data={{
                users: [
                  {
                    id: "1",
                    name: "John Doe",
                    department: "Engineering",
                    location: "San Francisco",
                    role: "Developer",
                    skills: [
                      { name: "React", current: 4, target: 5 },
                      { name: "TypeScript", current: 3, target: 4 },
                    ],
                  },
                ],
                departmentGaps: [
                  {
                    department: "Engineering",
                    skills: [
                      { name: "React", current: 3.5, target: 4, gap: 0.5 },
                      { name: "TypeScript", current: 2.8, target: 4, gap: 1.2 },
                    ],
                  },
                ],
                locationGaps: [
                  {
                    location: "San Francisco",
                    skills: [
                      { name: "React", current: 3.2, target: 4, gap: 0.8 },
                      { name: "TypeScript", current: 2.5, target: 4, gap: 1.5 },
                    ],
                  },
                ],
              }}
              onExport={(format, type, data) => {
                if (format === "csv") {
                  const { template, headers } = generateTemplate("users");
                  const csvContent = [
                    headers.join(","),
                    ...data.map((row: any) =>
                      headers
                        .map((header) => {
                          const value = row[header];
                          if (typeof value === "object")
                            return JSON.stringify(value);
                          if (typeof value === "string" && value.includes(","))
                            return `"${value}"`;
                          return value;
                        })
                        .join(","),
                    ),
                  ].join("\n");

                  const blob = new Blob([csvContent], { type: "text/csv" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${type}-skills-${new Date().toISOString().split("T")[0]}.csv`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                } else {
                  const doc = new jsPDF();
                  doc.text(
                    `${type.charAt(0).toUpperCase() + type.slice(1)} Skills Report`,
                    20,
                    20,
                  );

                  let yPos = 40;

                  if (type === "users") {
                    data.forEach((user: any) => {
                      if (yPos > 250) {
                        doc.addPage();
                        yPos = 20;
                      }

                      doc.text(`${user.name} (${user.department})`, 20, yPos);
                      yPos += 10;

                      user.skills.forEach((skill: any) => {
                        doc.text(
                          `${skill.name}: ${skill.current}/${skill.target}`,
                          30,
                          yPos,
                        );
                        yPos += 10;
                      });

                      yPos += 10;
                    });
                  } else {
                    data.forEach((item: any) => {
                      if (yPos > 250) {
                        doc.addPage();
                        yPos = 20;
                      }

                      doc.text(
                        `${item[type === "departments" ? "department" : "location"]}`,
                        20,
                        yPos,
                      );
                      yPos += 10;

                      item.skills.forEach((skill: any) => {
                        doc.text(
                          `${skill.name}: Gap ${skill.gap.toFixed(1)}`,
                          30,
                          yPos,
                        );
                        yPos += 10;
                      });

                      yPos += 10;
                    });
                  }

                  doc.save(
                    `${type}-skills-${new Date().toISOString().split("T")[0]}.pdf`,
                  );
                }
              }}
            />
          </div>
        </TabsContent>

        <TabsContent value="teams">
          <TeamSkillDashboard
            teamMembers={[
              {
                id: "1",
                name: "John Doe",
                role: "Developer",
                managerEmail: "manager@example.com",
                skills: [
                  { name: "React", current: 4, target: 5 },
                  { name: "TypeScript", current: 3, target: 4 },
                ],
              },
            ]}
            departmentAverages={[
              { skill: "React", average: 3.5, target: 4 },
              { skill: "TypeScript", average: 3.0, target: 4 },
            ]}
            organizationAverages={[
              { skill: "React", average: 3.2, target: 4 },
              { skill: "TypeScript", average: 2.8, target: 4 },
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalytics;
