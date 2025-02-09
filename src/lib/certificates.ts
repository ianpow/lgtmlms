import { jsPDF } from "jspdf";

export interface Certificate {
  id: string;
  studentName: string;
  courseName: string;
  completionDate: string;
  certificateId: string;
  instructorName: string;
}

export const generateCertificate = async (data: {
  studentName: string;
  courseName: string;
  instructorName: string;
}): Promise<Certificate> => {
  const certificateId = `CERT-${Date.now()}`;
  const completionDate = new Date().toISOString();

  const certificate: Certificate = {
    id: Date.now().toString(),
    studentName: data.studentName,
    courseName: data.courseName,
    completionDate,
    certificateId,
    instructorName: data.instructorName,
  };

  // In a real app, you would store this in a database
  const certificates = JSON.parse(localStorage.getItem("certificates") || "[]");
  certificates.push(certificate);
  localStorage.setItem("certificates", JSON.stringify(certificates));

  return certificate;
};

export const generateSkillBadge = (
  skillName: string,
  coursesCompleted: number,
) => {
  const badge = {
    id: Date.now().toString(),
    name: `${skillName} ${getBadgeLevel(coursesCompleted)}`,
    description: `Completed ${coursesCompleted} ${skillName} courses`,
    earnedDate: new Date().toISOString(),
    icon: getSkillIcon(skillName),
  };

  // In a real app, you would store this in a database
  const badges = JSON.parse(localStorage.getItem("skillBadges") || "[]");
  badges.push(badge);
  localStorage.setItem("skillBadges", JSON.stringify(badges));

  return badge;
};

const getBadgeLevel = (coursesCompleted: number) => {
  if (coursesCompleted >= 10) return "Master";
  if (coursesCompleted >= 5) return "Expert";
  if (coursesCompleted >= 3) return "Pro";
  return "Enthusiast";
};

const getSkillIcon = (skillName: string) => {
  const icons: Record<string, string> = {
    React: "⚛️",
    TypeScript: "📘",
    JavaScript: "💛",
    "Node.js": "💚",
    Python: "🐍",
    Java: "☕",
    SQL: "🗃️",
    AWS: "☁️",
    Docker: "🐳",
  };
  return icons[skillName] || "🎯";
};
