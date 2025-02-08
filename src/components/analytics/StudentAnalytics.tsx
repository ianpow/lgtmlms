interface StudentAnalyticsProps {
  data: {
    weeklyProgress: Array<{ date: string; hours: number }>;
    averageScore: number;
    coursesCompleted: number;
    totalHours: number;
    learningStreak: number;
    skillProgress: Array<{ subject: string; score: number }>;
  };
}

// Rest of the component code remains the same
