import React from "react";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { ScrollArea } from "../ui/scroll-area";
import { Calendar, Clock, CheckCircle, Circle } from "lucide-react";

interface PathMilestone {
  id: string;
  title: string;
  type: "course" | "assessment" | "project";
  completed: boolean;
  dueDate?: string;
  estimatedHours: number;
}

interface PathProgressProps {
  milestones: PathMilestone[];
  overallProgress: number;
  nextMilestone?: PathMilestone;
  estimatedCompletion?: string;
}

const PathProgress = ({
  milestones = [],
  overallProgress = 0,
  nextMilestone,
  estimatedCompletion,
}: PathProgressProps) => {
  const completedMilestones = milestones.filter((m) => m.completed).length;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Overall Progress</h3>
          <Progress value={overallProgress} />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              {completedMilestones} of {milestones.length} milestones completed
            </span>
            <span>{Math.round(overallProgress)}%</span>
          </div>
        </div>
      </Card>

      {nextMilestone && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Next Up</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{nextMilestone.title}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {nextMilestone.estimatedHours}h
                </div>
                {nextMilestone.dueDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(nextMilestone.dueDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Milestones</h3>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent"
              >
                {milestone.completed ? (
                  <CheckCircle className="h-5 w-5 text-primary" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
                <div className="flex-1">
                  <p className="font-medium">{milestone.title}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="capitalize">{milestone.type}</span>
                    <span>•</span>
                    <span>{milestone.estimatedHours}h</span>
                  </div>
                </div>
                {milestone.dueDate && (
                  <div className="text-sm text-muted-foreground">
                    {new Date(milestone.dueDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {estimatedCompletion && (
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Estimated completion date
            </span>
            <span className="font-medium">
              {new Date(estimatedCompletion).toLocaleDateString()}
            </span>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PathProgress;
