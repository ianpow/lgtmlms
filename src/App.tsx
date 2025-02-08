import { Suspense } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import routes from "tempo-routes";
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

function App() {
  const demoUser = localStorage.getItem("demoUser")
    ? JSON.parse(localStorage.getItem("demoUser")!)
    : { email: "admin@example.com", role: "admin" };

  // Handle Tempo routes
  const tempoRoutes =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        {tempoRoutes}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isAuthenticated={!!demoUser}
                isAdmin={demoUser?.role === "admin"}
              />
            }
          />
          <Route
            path="/courses/:courseId"
            element={<CoursePlayer sections={[]} />}
          />
          <Route
            path="/progress"
            element={
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
            }
          />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/discussions" element={<DiscussionsPage />} />
          <Route path="/profile">
            <Route index element={<StudentProfile />} />
            <Route path="edit" element={<StudentProfile isEditing={true} />} />
          </Route>
          <Route path="/admin">
            <Route index element={<AdminDashboard />} />
            <Route
              path="courses/builder"
              element={<CourseBuilder onSave={() => {}} />}
            />
            <Route
              path="skills"
              element={
                <SkillManagement
                  skills={[]}
                  categories={[]}
                  roles={[]}
                  onSkillCreate={() => {}}
                  onSkillUpdate={() => {}}
                  onSkillDelete={() => {}}
                  onRoleRequirementUpdate={() => {}}
                />
              }
            />
            <Route path="users" element={<UserManagement />} />
            <Route path="roles" element={<RoleManagement />} />
            <Route
              path="departments"
              element={
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
              }
            />
            <Route path="learning-paths" element={<LearningPathManagement />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route
              path="surveys"
              element={<SurveyBuilder onSave={() => {}} />}
            />
          </Route>
          <Route
            path="/gamification"
            element={
              <AchievementSystem achievements={[]} totalPoints={0} level={1} />
            }
          />
          <Route
            path="/gamification/leaderboard"
            element={<Leaderboard entries={[]} />}
          />
          <Route
            path="/virtual-classroom"
            element={
              <VirtualClassroom
                sessionTitle="Demo Session"
                participants={[]}
                messages={[]}
                onSendMessage={() => {}}
                onRaiseHand={() => {}}
                onLeaveSession={() => {}}
              />
            }
          />
          <Route
            path="/quiz"
            element={
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
            }
          />

          {/* Add a catch-all route */}
          <Route
            path="*"
            element={
              <Home
                isAuthenticated={!!demoUser}
                isAdmin={demoUser?.role === "admin"}
              />
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
