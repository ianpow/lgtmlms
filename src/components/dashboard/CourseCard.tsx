import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { PlayCircle, BookOpen } from "lucide-react";

interface CourseCardProps {
  id?: string;
  title?: string;
  thumbnail?: string;
  progress?: number;
  isEnrolled?: boolean;
  onAction?: () => void;
}

const CourseCard = ({
  id = "1",
  title = "Introduction to Web Development",
  thumbnail = "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=300&h=200&fit=crop",
  progress = 45,
  isEnrolled = false,
  onAction = () => {},
}: CourseCardProps) => {
  return (
    <Card className="w-[300px] bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-[160px] object-cover"
        />
        {isEnrolled && (
          <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded-md text-sm">
            {progress}% Complete
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
        {isEnrolled && <Progress value={progress} className="h-2 mb-4" />}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={onAction}
          className="w-full"
          variant={isEnrolled ? "default" : "secondary"}
        >
          {isEnrolled ? (
            <>
              <PlayCircle className="mr-2 h-4 w-4" />
              Continue Learning
            </>
          ) : (
            <>
              <BookOpen className="mr-2 h-4 w-4" />
              Enroll Now
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
