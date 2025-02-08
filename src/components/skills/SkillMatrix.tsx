import React from "react";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Skill, UserSkill, SkillCategory } from "@/types/skills";

interface SkillMatrixProps {
  skills: UserSkill[];
  categories: SkillCategory[];
  onSkillClick?: (skill: UserSkill) => void;
}

const SkillMatrix = ({
  skills = [],
  categories = [],
  onSkillClick,
}: SkillMatrixProps) => {
  const getLevelColor = (current: number, target: number) => {
    if (current >= target) return "bg-green-100 text-green-700";
    if (current >= target - 1) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <ScrollArea className="h-[600px]">
      <div className="space-y-6 p-4">
        {categories.map((category) => (
          <Card key={category.id} className="p-6">
            <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
            <div className="space-y-4">
              {category.subcategories?.map((subcategory) => (
                <div key={subcategory.id}>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">
                    {subcategory.name}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skills
                      .filter((skill) => skill.subcategory === subcategory.id)
                      .map((skill) => (
                        <Card
                          key={skill.id}
                          className={`p-4 cursor-pointer hover:shadow-md transition-shadow`}
                          onClick={() => onSkillClick?.(skill)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h5 className="font-medium">{skill.name}</h5>
                              <p className="text-sm text-muted-foreground">
                                {skill.description}
                              </p>
                            </div>
                            <Badge
                              className={getLevelColor(
                                skill.currentLevel,
                                skill.targetLevel,
                              )}
                            >
                              {skill.currentLevel}/{skill.targetLevel}
                            </Badge>
                          </div>
                          <Progress
                            value={(skill.currentLevel / 5) * 100}
                            className="h-2"
                          />
                          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                            <span>Current Level: {skill.currentLevel}</span>
                            <span>Target Level: {skill.targetLevel}</span>
                          </div>
                        </Card>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default SkillMatrix;
