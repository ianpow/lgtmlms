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

        <TabsContent value="skills">
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

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Reports</h3>
        <ReportGenerator
          data={{
            performance_summary: [
              { date: "2024-03-01", completions: 25, enrollments: 45 },
              { date: "2024-03-02", completions: 30, enrollments: 50 },
            ],
            time_distribution: [
              { hour: 9, count: 120 },
              { hour: 10, count: 150 },
            ],
            achievement_highlights: [
              "25% increase in course completions",
              "15 new skills mastered",
            ],
          }}
          onGenerate={(report) => {
            report.save(
              `analytics-report-${new Date().toISOString().split("T")[0]}.pdf`,
            );
          }}
        />
      </Card>
    </div>
  );
};

export default AdminAnalytics;
