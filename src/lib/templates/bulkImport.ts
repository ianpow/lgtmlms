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
      if (rule.enum && item[field] && !rule.enum.includes(item[field])) {
        errors.push(
          `Row ${index + 1}: ${field} must be one of: ${rule.enum.join(", ")}`,
        );
      }
    });
  });

  return errors;
};
