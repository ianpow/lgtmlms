export interface ExternalContentConfig {
  id: string;
  name: string;
  url: string;
  apiKey: string;
  fieldMappings: FieldMapping[];
  schedule: string;
  isActive: boolean;
  lastSync?: string;
  lastError?: string;
}

export interface FieldMapping {
  sourceField: string;
  targetField: string;
}

export interface SyncHistory {
  id: string;
  sourceId: string;
  timestamp: string;
  status: "success" | "error";
  itemsProcessed: number;
  error?: string;
}

export interface PreviewResult {
  success: boolean;
  data?: any[];
  error?: string;
  fieldSuggestions?: string[];
}
