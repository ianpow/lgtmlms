import {
  analyzePerformanceTrends,
  predictEngagement,
} from "../analytics/models";

interface SkillGap {
  skill: string;
  currentLevel: number;
  targetLevel: number;
  priority: number;
}

interface LearningPattern {
  timeOfDay: string;
  sessions: number;
  averageDuration: number;
  completionRate: number;
}

export const analyzeSkillGaps = (
  studentSkills: any[],
  requiredSkills: any[],
) => {
  const gaps: SkillGap[] = [];

  requiredSkills.forEach((required) => {
    const studentSkill = studentSkills.find((s) => s.name === required.name);
    if (!studentSkill || studentSkill.score < required.minimumScore) {
      gaps.push({
        skill: required.name,
        currentLevel: studentSkill?.score || 0,
        targetLevel: required.minimumScore,
        priority: required.priority || 1,
      });
    }
  });

  return gaps.sort((a, b) => {
    // Sort by largest gap and highest priority
    const gapA = a.targetLevel - a.currentLevel;
    const gapB = b.targetLevel - b.currentLevel;
    return gapB * b.priority - gapA * a.priority;
  });
};

export const analyzeLearningPatterns = (activityData: any[]) => {
  const patterns: Record<string, LearningPattern> = {};

  activityData.forEach((activity) => {
    const timeOfDay = getTimeOfDay(new Date(activity.timestamp));
    if (!patterns[timeOfDay]) {
      patterns[timeOfDay] = {
        timeOfDay,
        sessions: 0,
        averageDuration: 0,
        completionRate: 0,
      };
    }

    patterns[timeOfDay].sessions++;
    patterns[timeOfDay].averageDuration =
      (patterns[timeOfDay].averageDuration *
        (patterns[timeOfDay].sessions - 1) +
        activity.duration) /
      patterns[timeOfDay].sessions;
    patterns[timeOfDay].completionRate =
      (patterns[timeOfDay].completionRate * (patterns[timeOfDay].sessions - 1) +
        (activity.completed ? 1 : 0)) /
      patterns[timeOfDay].sessions;
  });

  return Object.values(patterns).sort((a, b) => {
    // Sort by completion rate and number of sessions
    return b.completionRate * b.sessions - a.completionRate * a.sessions;
  });
};

export const generateLearningPath = (
  studentData: any,
  availableCourses: any[],
  targetSkills: string[],
) => {
  const skillGaps = analyzeSkillGaps(studentData.skillScores, targetSkills);
  const learningPatterns = analyzeLearningPatterns(studentData.activityData);
  const engagement = predictEngagement(studentData.activityData);

  // Filter courses that address skill gaps
  const relevantCourses = availableCourses.filter((course) => {
    return course.skillsGained.some((skill: string) =>
      skillGaps.some((gap) => gap.skill === skill),
    );
  });

  // Sort courses by relevance and student's learning patterns
  const sortedCourses = relevantCourses.sort((a, b) => {
    const aScore = calculateCourseRelevanceScore(a, {
      skillGaps,
      learningPatterns,
      engagement,
      studentData,
    });
    const bScore = calculateCourseRelevanceScore(b, {
      skillGaps,
      learningPatterns,
      engagement,
      studentData,
    });
    return bScore - aScore;
  });

  // Group courses into learning paths
  return groupCoursesIntoPaths(sortedCourses, skillGaps);
};

const calculateCourseRelevanceScore = (
  course: any,
  {
    skillGaps,
    learningPatterns,
    engagement,
    studentData,
  }: {
    skillGaps: SkillGap[];
    learningPatterns: LearningPattern[];
    engagement: any;
    studentData: any;
  },
) => {
  let score = 0;

  // Skill gap relevance
  course.skillsGained.forEach((skill: string) => {
    const gap = skillGaps.find((g) => g.skill === skill);
    if (gap) {
      score += gap.priority * (gap.targetLevel - gap.currentLevel);
    }
  });

  // Learning pattern match
  const bestPattern = learningPatterns[0];
  if (course.estimatedDuration <= bestPattern.averageDuration * 1.2) {
    score += 10;
  }

  // Content type preference match
  const preferredType = Object.entries(studentData.preferredContentTypes).sort(
    ([, a]: any, [, b]: any) => b - a,
  )[0][0];
  if (course.contentType === preferredType) {
    score += 15;
  }

  // Difficulty level appropriateness
  const averageSkillScore =
    studentData.skillScores.reduce(
      (sum: number, skill: any) => sum + skill.score,
      0,
    ) / studentData.skillScores.length;

  if (
    (averageSkillScore < 40 && course.level === "beginner") ||
    (averageSkillScore >= 40 &&
      averageSkillScore < 70 &&
      course.level === "intermediate") ||
    (averageSkillScore >= 70 && course.level === "advanced")
  ) {
    score += 20;
  }

  return score;
};

const groupCoursesIntoPaths = (courses: any[], skillGaps: SkillGap[]) => {
  const paths = [];
  let remainingCourses = [...courses];

  while (remainingCourses.length > 0) {
    const path = {
      id: `path-${paths.length + 1}`,
      title: `Learning Path ${paths.length + 1}`,
      courses: [] as any[],
      skillGaps: [] as string[],
      estimatedDuration: 0,
      difficulty: "beginner" as "beginner" | "intermediate" | "advanced",
    };

    let currentCourse = remainingCourses[0];
    while (currentCourse) {
      path.courses.push(currentCourse);
      path.estimatedDuration += currentCourse.duration;
      path.skillGaps.push(...currentCourse.skillsGained);
      remainingCourses = remainingCourses.filter(
        (c) => c.id !== currentCourse.id,
      );

      // Find next course that builds upon current skills
      currentCourse = remainingCourses.find((course) =>
        course.prerequisites.every(
          (prereq) =>
            path.skillGaps.includes(prereq) ||
            !skillGaps.some((gap) => gap.skill === prereq),
        ),
      );
    }

    // Set path difficulty based on courses
    const difficulties = { beginner: 0, intermediate: 0, advanced: 0 };
    path.courses.forEach((course) => difficulties[course.level]++);
    path.difficulty = Object.entries(difficulties).sort(
      ([, a], [, b]) => b - a,
    )[0][0] as "beginner" | "intermediate" | "advanced";

    paths.push(path);
  }

  return paths;
};

const getTimeOfDay = (date: Date) => {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "Morning";
  if (hour >= 12 && hour < 17) return "Afternoon";
  if (hour >= 17 && hour < 22) return "Evening";
  return "Night";
};
