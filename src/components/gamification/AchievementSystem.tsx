import React from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Trophy, Star, Target } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: "trophy" | "star" | "target";
  progress: number;
  unlocked: boolean;
  points: number;
}

interface AchievementSystemProps {
  achievements: Achievement[];
  totalPoints: number;
  level: number;
}

const AchievementSystem = ({
  achievements = [],
  totalPoints = 0,
  level = 1,
}: AchievementSystemProps) => {
  const getIcon = (icon: Achievement["icon"]) => {
    switch (icon) {
      case "trophy":
        return <Trophy className="h-5 w-5" />;
      case "star":
        return <Star className="h-5 w-5" />;
      case "target":
        return <Target className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold">Level {level}</h3>
            <p className="text-sm text-muted-foreground">
              {totalPoints} points
            </p>
          </div>
          <Badge variant="secondary" className="text-lg">
            {achievements.filter((a) => a.unlocked).length} /{" "}
            {achievements.length}
          </Badge>
        </div>
        <Progress
          value={
            (achievements.filter((a) => a.unlocked).length /
              achievements.length) *
            100
          }
        />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={`p-4 ${achievement.unlocked ? "bg-primary/5" : ""}`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-2 rounded-full ${achievement.unlocked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
              >
                {getIcon(achievement.icon)}
              </div>
              <div>
                <h4 className="font-medium">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
                <div className="mt-2">
                  <Progress value={achievement.progress} className="h-1" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {achievement.points} points
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AchievementSystem;
