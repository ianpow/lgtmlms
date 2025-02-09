import { RouteObject } from "react-router-dom";
import Home from "@/components/home";
import AdminDashboard from "@/components/admin/AdminDashboard";
import CourseManagement from "@/components/admin/CourseManagement";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import SkillManagement from "@/components/admin/SkillManagement";
import UserManagement from "@/components/admin/UserManagement";
import RoleManagement from "@/components/admin/RoleManagement";
import DepartmentLocationManager from "@/components/admin/DepartmentLocationManager";
import LearningPathManagement from "@/components/admin/LearningPathManagement";
import SurveyBuilder from "@/components/admin/SurveyBuilder";
import ProgressPage from "@/components/student/ProgressPage";
import CourseSection from "@/components/dashboard/CourseSection";
import DiscoverPage from "@/components/discover/DiscoverPage";
import CommunityPage from "@/components/community/CommunityPage";
import DiscussionsPage from "@/components/discussions/DiscussionsPage";
import StudentProfile from "@/components/student/StudentProfile";
import VirtualClassroom from "@/components/collaboration/VirtualClassroom";
import AwardsPage from "@/components/awards/AwardsPage";
import QuizSystem from "@/components/assessment/QuizSystem";
import CoursePlayer from "@/components/student/CoursePlayer";

const routes: RouteObject[] = [
  {
    path: "/",
    children: [
      { index: true, element: <Home /> },
      { path: "courses", element: <CourseSection /> },
      {
        path: "courses/:courseId",
        element: (
          <CoursePlayer
            sections={[
              {
                id: "1",
                title: "Introduction",
                content: [
                  {
                    id: "1",
                    type: "text",
                    title: "Welcome",
                    content:
                      "Welcome to the course! This is the first section of your course. Feel free to navigate through the content using the sidebar.",
                  },
                  {
                    id: "2",
                    type: "video",
                    title: "Course Overview",
                    content: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                  },
                ],
              },
            ]}
          />
        ),
      },
      { path: "progress", element: <ProgressPage /> },
      { path: "discover", element: <DiscoverPage /> },
      { path: "community", element: <CommunityPage /> },
      { path: "discussions", element: <DiscussionsPage /> },
      { path: "gamification", element: <AwardsPage /> },
      {
        path: "virtual-classroom",
        element: (
          <VirtualClassroom
            sessionTitle="Demo Class"
            onSendMessage={() => {}}
            onRaiseHand={() => {}}
            onLeaveSession={() => {}}
          />
        ),
      },
      {
        path: "quiz",
        element: <QuizSystem questions={[]} onComplete={() => {}} />,
      },
      { path: "profile", element: <StudentProfile /> },
      { path: "admin", element: <AdminDashboard /> },
      { path: "admin/courses", element: <CourseManagement /> },
      { path: "admin/analytics", element: <AdminAnalytics /> },
      { path: "admin/skill-management", element: <SkillManagement /> },
      { path: "admin/user-management", element: <UserManagement /> },
      { path: "admin/role-management", element: <RoleManagement /> },
      {
        path: "admin/departments-locations",
        element: <DepartmentLocationManager />,
      },
      { path: "admin/learning-paths", element: <LearningPathManagement /> },
      { path: "admin/survey-builder", element: <SurveyBuilder /> },
      { path: "*", element: <Home /> },
    ],
  },
];

export default routes;
