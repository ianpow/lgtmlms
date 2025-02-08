export interface Course {
  id: string;
  title: string;
  description: string;
  duration: number;
  level: string;
  skillsGained: string[];
  prerequisites?: string[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: Course[];
  skillGaps: string[];
  estimatedDuration: number;
  difficulty: string;
  skillsGained: string[];
  enrolledStudents?: number;
  completionRate?: number;
  prerequisites?: string[];
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  currentLevel: number;
  targetLevel: number;
  lastAssessed?: string;
  verifiedBy?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  subcategories?: Array<{
    id: string;
    name: string;
  }>;
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

export interface SkillAssessment {
  id: string;
  skillId: string;
  assessedLevel: number;
  date: string;
  notes?: string;
  verificationStatus: "pending" | "verified" | "rejected";
}

export interface UserSkill extends Skill {
  subcategory: string;
}
