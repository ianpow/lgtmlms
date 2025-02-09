// Storage utilities will be implemented later
export const uploadFile = async (file: File): Promise<string> => {
  // Mock implementation
  return URL.createObjectURL(file);
};

export const getFileUrl = (path: string): string => {
  // Mock implementation
  return path;
};
