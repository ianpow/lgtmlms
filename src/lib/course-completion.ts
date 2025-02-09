import { generateCertificate, generateSkillBadge } from "./certificates";

export const handleCourseCompletion = async ({
  courseId,
  studentName,
  courseName,
  instructorName,
  skills,
  generateCertificate: shouldGenerateCertificate,
}: {
  courseId: string;
  studentName: string;
  courseName: string;
  instructorName: string;
  skills: string[];
  generateCertificate: boolean;
}) => {
  // Generate certificate if enabled for the course
  if (shouldGenerateCertificate) {
    await generateCertificate({
      studentName,
      courseName,
      instructorName,
    });
  }

  // Update skill completion counts and generate badges
  const skillCompletions = JSON.parse(
    localStorage.getItem("skillCompletions") || "{}",
  );

  skills.forEach((skill) => {
    skillCompletions[skill] = (skillCompletions[skill] || 0) + 1;

    // Check if we should award a new badge
    const completions = skillCompletions[skill];
    if (completions === 3 || completions === 5 || completions === 10) {
      generateSkillBadge(skill, completions);
    }
  });

  localStorage.setItem("skillCompletions", JSON.stringify(skillCompletions));
};
