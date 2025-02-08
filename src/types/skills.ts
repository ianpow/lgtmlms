export interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  level: number; // 1-5 scale
  prerequisites?: string[];
  requiredFor?: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  subcategories?: SkillSubcategory[];
}

export interface SkillSubcategory {
  id: string;
  name: string;
  description: string;
}

export interface UserSkill extends Skill {
  currentLevel: number;
  targetLevel: number;
  lastAssessed: string;
  source: "self" | "admin" | "assessment";
  verifiedBy?: string;
}

export interface RoleSkillRequirement {
  id: string;
  roleId: string;
  skillId: string;
  requiredLevel: number;
  priority: "critical" | "important" | "nice-to-have";
}

export interface Department {
  id: string;
  name: string;
  requiredSkills: RoleSkillRequirement[];
}

export interface Location {
  id: string;
  name: string;
  requiredSkills: RoleSkillRequirement[];
}

export interface SkillGapAnalysis {
  skillId: string;
  currentLevel: number;
  requiredLevel: number;
  gap: number;
  priority: "critical" | "important" | "nice-to-have";
  suggestedCourses: string[];
}

export interface SkillAssessment {
  id: string;
  userId: string;
  skillId: string;
  assessedLevel: number;
  assessedBy: string;
  date: string;
  notes?: string;
  verificationStatus: "pending" | "verified" | "rejected";
}
