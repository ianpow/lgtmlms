import { jsPDF } from "jspdf";

export const generatePDF = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [element.clientWidth, element.clientHeight],
  });

  pdf.save(`${filename}.pdf`);
};

export const exportToCSV = (data: any[], filename: string) => {
  const replacer = (_: string, value: any) => (value === null ? "" : value);
  const header = Object.keys(data[0]);
  const csv = [
    header.join(","),
    ...data.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(","),
    ),
  ].join("\r\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const calculatePerformanceScore = (data: any) => {
  const weights = {
    completionRate: 0.4,
    averageScore: 0.3,
    consistency: 0.3,
  };

  const completionRate = (data.coursesCompleted / data.totalCourses) * 100;
  const averageScore = data.averageScore;
  const consistency = (data.learningStreak / 30) * 100; // Normalized to 30 days

  return (
    completionRate * weights.completionRate +
    averageScore * weights.averageScore +
    consistency * weights.consistency
  );
};

export const generateInsights = (data: any) => {
  const insights = [];

  // Learning Pattern Insights
  const mostProductiveTime = data.learningPatterns.reduce((a: any, b: any) =>
    a.sessions > b.sessions ? a : b,
  );
  insights.push(`Most productive time: ${mostProductiveTime.timeOfDay}`);

  // Skill Gap Analysis
  const weakestSkill = data.skillProgress.reduce((a: any, b: any) =>
    a.score < b.score ? a : b,
  );
  insights.push(`Area for improvement: ${weakestSkill.subject}`);

  // Progress Trend
  const recentProgress = data.weeklyProgress.slice(-2);
  const progressTrend =
    recentProgress[1].completed - recentProgress[0].completed;
  insights.push(
    `Progress trend: ${progressTrend > 0 ? "Improving" : "Declining"}`,
  );

  return insights;
};
