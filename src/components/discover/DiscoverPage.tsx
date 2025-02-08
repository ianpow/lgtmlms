import React from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CoursePreviewCard from "../marketing/CoursePreviewCard";
import { Search } from "lucide-react";

const DiscoverPage = () => {
  const recommendedCourses = [
    {
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

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search courses, skills, or topics..."
            className="pl-10"
          />
        </div>
        <Button>Filter</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedCourses.map((course, index) => (
          <CoursePreviewCard
            key={index}
            {...course}
            onEnroll={() => console.log(`Enrolled in ${course.title}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default DiscoverPage;
