import React from "react";
import { Card } from "./ui/card";
import LoginForm from "./auth/LoginForm";
import DashboardHeader from "./dashboard/DashboardHeader";
import Sidebar from "./dashboard/Sidebar";
import StatusBar from "./dashboard/StatusBar";
import CourseSection from "./dashboard/CourseSection";
import { findDemoUser } from "@/lib/demo-auth";

interface HomeProps {
  isAuthenticated?: boolean;
  isAdmin?: boolean;
  onLogin?: (email: string, password: string) => Promise<void>;
}

const Home: React.FC<HomeProps> = ({
  isAuthenticated = true,
  isAdmin = true,
  onLogin = async (email: string, password: string) => {
    const demoUser = findDemoUser(email);
    if (demoUser) {
      localStorage.setItem("demoUser", JSON.stringify(demoUser));
      window.location.reload();
    }
  },
}) => {
  const [enrolledCourses, setEnrolledCourses] = React.useState([]);
  const [recommendedCourses, setRecommendedCourses] = React.useState([
    {
      id: "1",
      title: "Web Development Fundamentals",
      thumbnail:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=300&h=200&fit=crop",
      progress: 45,
    },
    {
      id: "2",
      title: "Advanced JavaScript",
      thumbnail:
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=300&h=200&fit=crop",
      progress: 72,
    },
    {
      id: "3",
      title: "UI/UX Design Fundamentals",
      thumbnail:
        "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=300&h=200&fit=crop",
      progress: 23,
    },
  ]);

  React.useEffect(() => {
    // Get current user
    const currentUser = JSON.parse(localStorage.getItem("demoUser") || "{}");
    if (!currentUser.id) return;

    // Get enrollments for current user
    const enrollments = JSON.parse(localStorage.getItem("enrollments") || "[]");
    const userEnrollments = enrollments.filter(
      (e) => e.userId === currentUser.id,
    );

    // Get courses
    const allCourses = JSON.parse(localStorage.getItem("courses") || "[]");
    const userCourses = userEnrollments
      .map((enrollment) => {
        const course = allCourses.find((c) => c.id === enrollment.courseId);
        if (!course) return null;
        return {
          ...course,
          progress: enrollment.progress,
        };
      })
      .filter(Boolean);

    setEnrolledCourses(userCourses);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
        <LoginForm onSubmit={onLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex">
        <Sidebar isAdmin={isAdmin} />
        <main className="flex-1 p-6 mt-16">
          <div className="max-w-7xl mx-auto space-y-6">
            <StatusBar />
            <CourseSection
              title="Continue Learning"
              type="continue"
              courses={enrolledCourses}
            />
            <CourseSection
              title="Popular Courses"
              type="popular"
              courses={recommendedCourses}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
