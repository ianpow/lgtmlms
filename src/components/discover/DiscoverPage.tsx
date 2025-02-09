import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CoursePreviewCard from "../marketing/CoursePreviewCard";
import { Search } from "lucide-react";
import React from "react";

const DiscoverPage = () => {
  const recommendedCourses = [
    {
      id: "rec1",
      title: "Advanced React Patterns",
      description: "Master advanced React concepts and patterns",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      rating: 4.8,
      enrollments: 1500,
      duration: "12 hours",
      popularity: 92,
      skills: ["React", "TypeScript", "State Management"],
    },
    {
      id: "rec2",
      title: "TypeScript Fundamentals",
      description: "Learn TypeScript from the ground up",
      thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
      rating: 4.6,
      enrollments: 1200,
      duration: "8 hours",
      popularity: 85,
      skills: ["TypeScript", "JavaScript"],
    },
  ];

  const [searchTerm, setSearchTerm] = React.useState("");
  const [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses") || "[]");
    setCourses(storedCourses);
  }, []);

  const allCourses = [...courses, ...recommendedCourses];
  const filteredCourses = allCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEnroll = (courseId: string) => {
    // Get current user
    const currentUser = JSON.parse(localStorage.getItem("demoUser") || "{}");
    if (!currentUser.id) {
      alert("Please log in first");
      return;
    }

    // Check if already enrolled
    const enrollments = JSON.parse(localStorage.getItem("enrollments") || "[]");
    const alreadyEnrolled = enrollments.some(
      (e: any) => e.userId === currentUser.id && e.courseId === courseId,
    );
    if (alreadyEnrolled) {
      alert("You are already enrolled in this course");
      return;
    }

    // Add enrollment
    const newEnrollment = {
      userId: currentUser.id,
      courseId: courseId,
      enrollmentDate: new Date().toISOString(),
      progress: 0,
    };
    enrollments.push(newEnrollment);
    localStorage.setItem("enrollments", JSON.stringify(enrollments));

    // Update course enrollments
    const updatedCourses = allCourses.map((c) => {
      if (c.id === courseId) {
        return { ...c, enrollments: (c.enrollments || 0) + 1 };
      }
      return c;
    });
    localStorage.setItem(
      "courses",
      JSON.stringify(updatedCourses.filter((c) => !c.id.startsWith("rec"))),
    );

    alert("Successfully enrolled in course!");
    window.location.href = "/";
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search courses, skills, or topics..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CoursePreviewCard
            key={course.id}
            {...course}
            onEnroll={() => handleEnroll(course.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DiscoverPage;
