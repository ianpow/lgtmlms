import { ExternalContentConfig } from "./types";

export const validateConfig = (config: Partial<ExternalContentConfig>) => {
  const errors: string[] = [];

  if (!config.name?.trim()) {
    errors.push("Name is required");
  }

  if (!config.url?.trim()) {
    errors.push("URL is required");
  } else if (!isValidUrl(config.url)) {
    errors.push("Invalid URL format");
  }

  if (!config.apiKey?.trim()) {
    errors.push("API Key is required");
  }

  if (!config.fieldMappings?.length) {
    errors.push("At least one field mapping is required");
  } else {
    config.fieldMappings.forEach((mapping, index) => {
      if (!mapping.sourceField?.trim()) {
        errors.push(`Source field is required for mapping ${index + 1}`);
      }
      if (!mapping.targetField?.trim()) {
        errors.push(`Target field is required for mapping ${index + 1}`);
      }
    });
  }

  return errors;
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
