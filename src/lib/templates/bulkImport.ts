interface ValidationRule {
  type: string;
  required: boolean;
  min?: number;
  max?: number;
  enum?: string[];
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

export const importTemplates = {
  departments: {
    validation: {
      name: { type: "string", required: true },
      description: { type: "string", required: false },
      requiredSkills: { type: "array", required: false },
    },
    template: [
      {
        name: "Engineering",
        description: "Engineering department",
        requiredSkills: [],
      },
    ],
  },
  enrollments: {
    validation: {
      userId: { type: "string", required: true },
      userName: { type: "string", required: true },
      courseId: { type: "string", required: true },
      courseName: { type: "string", required: true },
      progress: { type: "number", required: true },
      mandatory: { type: "boolean", required: true },
      enrollmentDate: { type: "string", required: true },
      deadline: { type: "string", required: true },
      department: { type: "string", required: true },
      location: { type: "string", required: true },
    },
    template: [
      {
        userId: "1",
        userName: "John Doe",
        courseId: "1",
        courseName: "Web Development Fundamentals",
        progress: 75,
        mandatory: true,
        enrollmentDate: "2024-03-01",
        deadline: "2024-04-01",
        department: "Engineering",
        location: "San Francisco",
      },
    ],
  },
  users: {
    validation: {
      name: { type: "string", required: true },
      email: { type: "string", required: true },
      role: {
        type: "string",
        required: true,
        enum: ["Student", "Instructor", "Admin"],
      },
      department: { type: "string", required: true },
      status: { type: "string", required: true, enum: ["active", "inactive"] },
      location: { type: "string", required: false },
      managerEmail: { type: "string", required: false },
    },
    template: [
      {
        name: "John Smith",
        email: "john@example.com",
        role: "Student",
        department: "Engineering",
        status: "active",
        location: "san-francisco",
        managerEmail: "manager@example.com",
      },
      {
        name: "Jane Doe",
        email: "jane@example.com",
        role: "Instructor",
        department: "Design",
        status: "active",
        location: "new-york",
        managerEmail: "manager@example.com",
      },
    ],
  },
};

export const generateTemplate = (type: keyof typeof importTemplates) => {
  const template = importTemplates[type].template;
  const headers = Object.keys(importTemplates[type].validation);
  return { template, headers };
};

export const validateImportData = (
  data: any[],
  type: keyof typeof importTemplates,
) => {
  const rules = importTemplates[type].validation;
  const errors: string[] = [];

  data.forEach((item, index) => {
    Object.entries(rules).forEach(([field, rule]) => {
      if (rule.required && !item[field]) {
        errors.push(`Row ${index + 1}: ${field} is required`);
      }
      if (
        "enum" in rule &&
        rule.enum &&
        item[field] &&
        !rule.enum.includes(item[field])
      ) {
        errors.push(
          `Row ${index + 1}: ${field} must be one of: ${"enum" in rule && rule.enum ? rule.enum.join(", ") : ""}`,
        );
      }
    });
  });

  return errors;
};
