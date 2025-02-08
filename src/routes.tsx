import { RouteObject } from "react-router-dom";
import Home from "./components/home";
import CoursePlayer from "./components/student/CoursePlayer";
import LearningPath from "./components/student/LearningPath";
import StudentProfile from "./components/student/StudentProfile";
import AdminDashboard from "./components/admin/AdminDashboard";
import CourseBuilder from "./components/admin/CourseBuilder";
import SkillManagement from "./components/admin/SkillManagement";
import DepartmentLocationManager from "./components/admin/DepartmentLocationManager";
import SurveyBuilder from "./components/admin/SurveyBuilder";
import UserManagement from "./components/admin/UserManagement";
import RoleManagement from "./components/admin/RoleManagement";
import LearningPathManagement from "./components/admin/LearningPathManagement";
import AdminAnalytics from "./components/admin/AdminAnalytics";
import DiscoverPage from "./components/discover/DiscoverPage";
import CommunityPage from "./components/community/CommunityPage";
import DiscussionsPage from "./components/discussions/DiscussionsPage";

import AchievementSystem from "./components/gamification/AchievementSystem";
import Leaderboard from "./components/gamification/Leaderboard";
import VirtualClassroom from "./components/collaboration/VirtualClassroom";
import QuizSystem from "./components/assessment/QuizSystem";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/courses",
    children: [
      { index: true, element: <Home /> },
      { path: ":courseId", element: <CoursePlayer sections={[]} /> },
    ],
  },
  {
    path: "/progress",
    element: (
      <LearningPath
        studentData={{
          skillScores: [],
          learningPatterns: [],
          completedCourses: [],
          preferredContentTypes: {},
        }}
        recommendedPaths={[]}
        onPathSelect={() => {}}
        onCourseStart={() => {}}
      />
    ),
  },
  {
    path: "/discover",
    element: <DiscoverPage />,
  },
  {
    path: "/community",
    element: <CommunityPage />,
  },
  {
    path: "/discussions",
    element: <DiscussionsPage />,
  },
  {
    path: "/profile",
    children: [
      { index: true, element: <StudentProfile /> },
      { path: "edit", element: <StudentProfile isEditing={true} /> },
    ],
  },
  {
    path: "/admin",
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "courses/builder", element: <CourseBuilder onSave={() => {}} /> },
      {
        path: "skills",
        element: (
          <SkillManagement
            skills={[]}
            categories={[]}
            roles={[]}
            onSkillCreate={() => {}}
            onSkillUpdate={() => {}}
            onSkillDelete={() => {}}
            onRoleRequirementUpdate={() => {}}
          />
        ),
      },
      {
        path: "users",
        element: <UserManagement />,
      },
      {
        path: "roles",
        element: <RoleManagement />,
      },
      {
        path: "departments",
        element: (
          <DepartmentLocationManager
            departments={[]}
            locations={[]}
            onDepartmentCreate={() => {}}
            onDepartmentUpdate={() => {}}
            onDepartmentDelete={() => {}}
            onLocationCreate={() => {}}
            onLocationUpdate={() => {}}
            onLocationDelete={() => {}}
            onBulkImport={() => Promise.resolve()}
            onBulkExport={() => Promise.resolve()}
          />
        ),
      },
      {
        path: "learning-paths",
        element: <LearningPathManagement />,
      },
      {
        path: "analytics",
        element: <AdminAnalytics />,
      },
      {
        path: "surveys",
        element: <SurveyBuilder onSave={() => {}} />,
      },
    ],
  },
  {
    path: "/gamification",
    children: [
      {
        index: true,
        element: (
          <AchievementSystem achievements={[]} totalPoints={0} level={1} />
        ),
      },
      { path: "leaderboard", element: <Leaderboard entries={[]} /> },
    ],
  },
  {
    path: "/virtual-classroom",
    element: (
      <VirtualClassroom
        sessionTitle="Demo Session"
        participants={[]}
        messages={[]}
        onSendMessage={() => {}}
        onRaiseHand={() => {}}
        onLeaveSession={() => {}}
      />
    ),
  },
  {
    path: "/quiz",
    element: (
      <QuizSystem
        questions={[
          {
            id: "1",
            text: "What is React?",
            options: [
              "A JavaScript library",
              "A programming language",
              "A database",
              "An operating system",
            ],
            correctAnswer: "A JavaScript library",
          },
        ]}
        onComplete={() => {}}
      />
    ),
  },
];

export default routes;
