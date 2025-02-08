import React from "react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  points: number;
  level: number;
  rank: number;
  trend: "up" | "down" | "stable";
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
}

const Leaderboard = ({ entries = [], currentUserId }: LeaderboardProps) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Leaderboard</h3>
      <div className="space-y-4">
        {entries.map((entry) => (
          <Card
            key={entry.id}
            className={`p-4 ${entry.id === currentUserId ? "bg-primary/5" : ""}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 text-center font-bold">
                {getRankIcon(entry.rank) || `#${entry.rank}`}
              </div>
              <Avatar>
                <AvatarImage src={entry.avatar} />
                <AvatarFallback>{entry.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{entry.name}</span>
                  <Badge variant="secondary">Level {entry.level}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {entry.points} points
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default Leaderboard;
