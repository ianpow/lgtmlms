import React from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { ArrowRight, Clock, Target, Brain } from "lucide-react";

interface PathNode {
  id: string;
  title: string;
  type: "course" | "assessment" | "project";
  status: "locked" | "available" | "in-progress" | "completed";
  dependencies: string[];
  estimatedHours: number;
  skillsGained: string[];
}

interface PathVisualizerProps {
  nodes: PathNode[];
  onNodeClick: (nodeId: string) => void;
  currentProgress: number;
}

const PathVisualizer = ({
  nodes = [],
  onNodeClick,
  currentProgress = 0,
}: PathVisualizerProps) => {
  const getStatusColor = (status: PathNode["status"]) => {
    switch (status) {
      case "locked":
        return "bg-gray-200 text-gray-500";
      case "available":
        return "bg-blue-100 text-blue-700 hover:bg-blue-200";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="relative">
      <Progress value={currentProgress} className="mb-8" />
      <div className="flex flex-col gap-4">
        {nodes.map((node, index) => (
          <div key={node.id} className="flex items-center gap-4">
            <Card
              className={`p-4 flex-1 cursor-pointer transition-colors ${getStatusColor(
                node.status,
              )}`}
              onClick={() => onNodeClick(node.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{node.title}</h3>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">{node.type}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {node.estimatedHours}h
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {node.skillsGained.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
            {index < nodes.length - 1 && (
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PathVisualizer;
