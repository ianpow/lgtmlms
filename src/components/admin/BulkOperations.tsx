import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { Download, Upload, AlertTriangle, FileDown } from "lucide-react";
import {
  generateTemplate,
  validateImportData,
} from "@/lib/templates/bulkImport";

import type { importTemplates } from "@/lib/templates/bulkImport";

interface BulkOperationsProps {
  onImport: (data: any) => Promise<void>;
  onExport: () => Promise<any>;
  type: keyof typeof importTemplates;
}

const BulkOperations = ({ onImport, onExport, type }: BulkOperationsProps) => {
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string>();

  const downloadTemplate = (format: "json" | "csv") => {
    const { template, headers } = generateTemplate(type);
    let content: string;
    let mimeType: string;
    let extension: string;

    if (format === "csv") {
      content =
        headers.join(",") +
        "\n" +
        template
          .map((row) => {
            return headers
              .map((header) => {
                const value = row[header];
                if (typeof value === "object") {
                  return JSON.stringify(value);
                }
                if (typeof value === "string" && value.includes(",")) {
                  return `"${value}"`;
                }
                return value;
              })
              .join(",");
          })
          .join("\n");
      mimeType = "text/csv";
      extension = "csv";
    } else {
      content = JSON.stringify(template, null, 2);
      mimeType = "application/json";
      extension = "json";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}-template.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const parseCSV = (text: string) => {
    const lines = text.split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const values = lines[i].split(",").map((v) => v.trim());
      const entry: any = {};

      headers.forEach((header, index) => {
        let value = values[index];
        try {
          // Try to parse JSON for array/object fields
          value = JSON.parse(value);
        } catch {
          // If not JSON, use as is
          value = value;
        }
        entry[header] = value;
      });

      data.push(entry);
    }

    return data;
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setImporting(true);
      setError(undefined);

      const text = await file.text();
      const data = file.name.endsWith(".csv")
        ? parseCSV(text)
        : JSON.parse(text);
      const validationErrors = validateImportData(data, type);

      if (validationErrors.length > 0) {
        setError(`Validation errors:\n${validationErrors.join("\n")}`);
        return;
      }

      await onImport(data);
    } catch (err) {
      setError(
        `Failed to import file. Please ensure it's a valid ${file.name.endsWith(".csv") ? "CSV" : "JSON"} file.`,
      );
      console.error("Import error:", err);
    } finally {
      setImporting(false);
    }
  };

  const handleExport = async () => {
    try {
      const data = await onExport();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}-export-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError("Failed to export data.");
      console.error("Export error:", err);
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold capitalize">
            {type} Bulk Operations
          </h3>
          <p className="text-sm text-muted-foreground">
            Import or export {type} data in bulk
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="whitespace-pre-line">
            {error}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>JSON Template</Label>
          <Button onClick={() => downloadTemplate("json")} className="w-full">
            <FileDown className="h-4 w-4 mr-2" /> JSON Template
          </Button>
        </div>

        <div className="space-y-2">
          <Label>CSV Template</Label>
          <Button onClick={() => downloadTemplate("csv")} className="w-full">
            <FileDown className="h-4 w-4 mr-2" /> CSV Template
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Import {type}</Label>
          <div className="flex gap-2">
            <Input
              type="file"
              accept=".json,.csv"
              onChange={handleImport}
              disabled={importing}
            />
            <Button disabled={importing}>
              <Upload className="h-4 w-4 mr-2" />
              {importing ? "Importing..." : "Import"}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Export {type}</Label>
          <Button onClick={handleExport} className="w-full">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BulkOperations;
