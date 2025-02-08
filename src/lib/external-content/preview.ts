import { ExternalContentConfig, PreviewResult } from "./types";

export const previewContent = async (
  config: ExternalContentConfig,
): Promise<PreviewResult> => {
  try {
    const response = await fetch(config.url, {
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const sampleItem = Array.isArray(data) ? data[0] : data;

    return {
      success: true,
      data: Array.isArray(data) ? data.slice(0, 5) : [data],
      fieldSuggestions: Object.keys(sampleItem),
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch preview",
    };
  }
};
