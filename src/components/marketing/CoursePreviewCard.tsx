import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Star, Users, Clock, TrendingUp } from "lucide-react";

interface CoursePreviewCardProps {
  title: string;
  description: string;
  thumbnail: string;
  rating: number;
  enrollments: number;
  duration: string;
  popularity: number;
  skills: string[];
  onEnroll: () => void;
}

const CoursePreviewCard = ({
  title = "React Fundamentals",
  description = "Learn the basics of React development",
  thumbnail = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
  rating = 4.5,
  enrollments = 1200,
  duration = "10 hours",
  popularity = 85,
  skills = ["React", "JavaScript", "Web Development"],
  onEnroll,
}: CoursePreviewCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
        <Badge
          className="absolute top-2 right-2"
          variant={popularity >= 80 ? "default" : "secondary"}
        >
          <TrendingUp className="w-4 h-4 mr-1" />
          {popularity}% Popular
        </Badge>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            {rating.toFixed(1)}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 text-muted-foreground mr-1" />
            {enrollments.toLocaleString()} enrolled
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-muted-foreground mr-1" />
            {duration}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>

        <Button onClick={onEnroll} className="w-full">
          Enroll Now
        </Button>
      </div>
    </Card>
  );
};

export default CoursePreviewCard;
