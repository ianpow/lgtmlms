import React from "react";
import { Card } from "../../ui/card";
import { Progress } from "../../ui/progress";

interface SkillRadarProps {
  data: Array<{
    skill: string;
    current: number;
    target: number;
    average: number;
  }>;
  title: string;
}

const SkillRadar = ({ data, title }: SkillRadarProps) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.skill} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">{item.skill}</span>
              <span className="text-sm text-muted-foreground">
                {item.current}/{item.target} (Avg: {item.average})
              </span>
            </div>
            <Progress value={(item.current / item.target) * 100} />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SkillRadar;
