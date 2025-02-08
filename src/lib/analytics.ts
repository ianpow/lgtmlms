import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const predictNextMonthProgress = (data: any[]) => {
  // Simple linear regression for prediction
  const n = data.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  data.forEach((point, index) => {
    sumX += index;
    sumY += point.hours;
    sumXY += index * point.hours;
    sumXX += index * index;
  });

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Predict next point
  const nextValue = slope * n + intercept;
  return Math.max(0, Math.min(24, nextValue)); // Clamp between 0 and 24 hours
};

export const calculateGrowthRate = (current: number, previous: number) => {
  if (previous === 0) return 100;
  return ((current - previous) / previous) * 100;
};

export const generatePDF = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save(`${filename}.pdf`);
};

export const exportToCSV = (data: any[], filename: string) => {
  const replacer = (key: string, value: any) => (value === null ? "" : value);
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
  saveAs(blob, `${filename}.csv`);
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
