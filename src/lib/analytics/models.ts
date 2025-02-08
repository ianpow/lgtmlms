import * as tf from "@tensorflow/tfjs";

export const buildLearningModel = async (historicalData: any[]) => {
  const model = tf.sequential();
  model.add(
    tf.layers.dense({ units: 10, inputShape: [5], activation: "relu" }),
  );
  model.add(tf.layers.dense({ units: 1, activation: "linear" }));

  model.compile({
    optimizer: tf.train.adam(0.01),
    loss: "meanSquaredError",
  });

  return model;
};

export const predictEngagement = (data: any[]) => {
  const recentActivity = data.slice(-30); // Last 30 days
  const activityScore =
    recentActivity.reduce((sum, day) => sum + day.hours, 0) / 30;
  const consistencyScore =
    recentActivity.filter((day) => day.hours > 0).length / 30;

  return {
    activityScore,
    consistencyScore,
    predictedDropoff: activityScore < 0.5 && consistencyScore < 0.3,
  };
};

export const analyzePerformanceTrends = (data: any[]) => {
  const periods = data.reduce((acc: any, item) => {
    const period = new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
    });
    if (!acc[period]) acc[period] = [];
    acc[period].push(item);
    return acc;
  }, {});

  return Object.entries(periods).map(([period, items]: [string, any[]]) => ({
    period,
    averageScore:
      items.reduce((sum, item) => sum + item.score, 0) / items.length,
    totalHours: items.reduce((sum, item) => sum + item.hours, 0),
    completionRate:
      items.filter((item) => item.completed).length / items.length,
  }));
};

export const generateRecommendations = (userData: any) => {
  const recommendations = [];

  // Learning pace recommendations
  if (userData.averageHoursPerDay < 1) {
    recommendations.push({
      type: "pace",
      message: "Consider increasing your daily study time to maintain momentum",
    });
  }

  // Content type recommendations
  const preferredContent = Object.entries(userData.contentTypeEngagement).sort(
    ([, a]: any, [, b]: any) => b - a,
  )[0][0];
  recommendations.push({
    type: "content",
    message: `You seem to engage well with ${preferredContent} content. We'll prioritize similar materials.`,
  });

  // Skill gap recommendations
  const weakestSkill = userData.skillScores.sort(
    (a: any, b: any) => a.score - b.score,
  )[0];
  recommendations.push({
    type: "skill",
    message: `Consider focusing on improving your ${weakestSkill.name} skills`,
  });

  return recommendations;
};

export const calculateLearningVelocity = (completionData: any[]) => {
  const velocities = completionData
    .map((item, index, arr) => {
      if (index === 0) return null;
      const timeDiff =
        new Date(item.date).getTime() - new Date(arr[index - 1].date).getTime();
      const progressDiff = item.progress - arr[index - 1].progress;
      return (progressDiff / timeDiff) * 86400000; // Normalize to progress per day
    })
    .filter(Boolean);

  return {
    current: velocities[velocities.length - 1],
    average:
      velocities.reduce((a, b) => (a || 0) + (b || 0), 0) / velocities.length,
    trend:
      velocities[velocities.length - 1] >
      velocities.reduce((a, b) => (a || 0) + (b || 0), 0) / velocities.length
        ? "Increasing"
        : "Decreasing",
  };
};
