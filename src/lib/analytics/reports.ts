import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const reportTemplates = {
  weekly: {
    title: "Weekly Learning Report",
    sections: [
      "Performance Summary",
      "Time Distribution",
      "Achievement Highlights",
      "Areas for Improvement",
    ],
    charts: ["progressLine", "timeHeatmap", "skillRadar"],
  },
  monthly: {
    title: "Monthly Progress Report",
    sections: [
      "Monthly Overview",
      "Course Completion Status",
      "Skill Development",
      "Learning Patterns",
      "Recommendations",
    ],
    charts: ["completionBar", "skillComparison", "activityCalendar"],
  },
  achievement: {
    title: "Achievement Report",
    sections: [
      "Certificates Earned",
      "Skills Mastered",
      "Course Completions",
      "Notable Milestones",
    ],
    charts: ["achievementTimeline", "skillMastery"],
  },
};

export const generateReport = async (
  template: keyof typeof reportTemplates,
  data: any,
) => {
  const reportConfig = reportTemplates[template];
  const pdf = new jsPDF();
  let yOffset = 20;

  // Add title
  pdf.setFontSize(20);
  pdf.text(reportConfig.title, 20, yOffset);
  yOffset += 20;

  // Add sections
  for (const section of reportConfig.sections) {
    pdf.setFontSize(16);
    pdf.text(section, 20, yOffset);
    yOffset += 15;

    // Add section content based on data
    const sectionData = data[section.toLowerCase().replace(/ /g, "_")];
    if (sectionData) {
      pdf.setFontSize(12);
      if (typeof sectionData === "string") {
        pdf.text(sectionData, 20, yOffset);
        yOffset += 10;
      } else if (Array.isArray(sectionData)) {
        sectionData.forEach((item) => {
          pdf.text(`• ${item}`, 25, yOffset);
          yOffset += 10;
        });
      }
    }

    yOffset += 10;
  }

  return pdf;
};

export const generateCustomReport = async (elementId: string, config: any) => {
  const element = document.getElementById(elementId);
  if (!element) return null;

  const canvas = await html2canvas(element, {
    scale: 2,
    logging: false,
    useCORS: true,
  });

  const pdf = new jsPDF({
    orientation: config.orientation || "portrait",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  if (config.header) {
    pdf.setFontSize(18);
    pdf.text(config.header.text, config.header.x, config.header.y);
  }

  pdf.addImage(
    canvas.toDataURL("image/png"),
    "PNG",
    0,
    config.header ? 40 : 0,
    canvas.width,
    canvas.height,
  );

  if (config.footer) {
    pdf.setFontSize(10);
    pdf.text(
      config.footer.text,
      config.footer.x,
      pdf.internal.pageSize.height - 10,
    );
  }

  return pdf;
};

export const reportStyles = {
  modern: {
    fonts: {
      title: { size: 24, color: "#2D3748" },
      heading: { size: 18, color: "#4A5568" },
      body: { size: 12, color: "#718096" },
    },
    colors: {
      primary: "#4C51BF",
      secondary: "#6B46C1",
      accent: "#ED64A6",
    },
    spacing: {
      margin: 20,
      padding: 15,
    },
  },
  minimal: {
    fonts: {
      title: { size: 20, color: "#1A202C" },
      heading: { size: 16, color: "#2D3748" },
      body: { size: 11, color: "#4A5568" },
    },
    colors: {
      primary: "#3182CE",
      secondary: "#4299E1",
      accent: "#63B3ED",
    },
    spacing: {
      margin: 15,
      padding: 10,
    },
  },
  corporate: {
    fonts: {
      title: { size: 22, color: "#000000" },
      heading: { size: 17, color: "#1A1A1A" },
      body: { size: 12, color: "#333333" },
    },
    colors: {
      primary: "#0066CC",
      secondary: "#0080FF",
      accent: "#3399FF",
    },
    spacing: {
      margin: 25,
      padding: 20,
    },
  },
};
