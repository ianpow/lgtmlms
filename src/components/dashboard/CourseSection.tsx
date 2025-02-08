import React from "react";
import CourseCard from "./CourseCard";

interface Course {
  id: string;
  title: string;
  thumbnail: string;
  progress?: number;
}

interface CourseSectionProps {
  title?: string;
  courses?: Course[];
  type?: "continue" | "popular";
  onCourseAction?: (courseId: string) => void;
}

const CourseSection = ({
  title = "Continue Learning",
  type = "continue",
  courses = [
    {
      id: "1",
      title: "Introduction to Web Development",
      thumbnail:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=300&h=200&fit=crop",
      progress: 45,
    },
    {
      id: "2",
      title: "Advanced JavaScript Concepts",
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
  ],
  onCourseAction = () => {},
}: CourseSectionProps) => {
  return (
    <section className="w-full bg-gray-50 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <button className="text-blue-600 hover:text-blue-800 font-medium">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            title={course.title}
            thumbnail={course.thumbnail}
            progress={course.progress}
            isEnrolled={type === "continue"}
            onAction={() => onCourseAction(course.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default CourseSection;
