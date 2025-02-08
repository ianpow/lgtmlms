import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Download, FileDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  generateReport,
  reportTemplates,
  reportStyles,
} from "@/lib/analytics/reports";

interface ReportGeneratorProps {
  data: any;
  onGenerate: (report: any) => void;
}

const ReportGenerator = ({ data, onGenerate }: ReportGeneratorProps) => {
  const [selectedTemplate, setSelectedTemplate] =
    React.useState<keyof typeof reportTemplates>("weekly");
  const [selectedStyle, setSelectedStyle] =
    React.useState<keyof typeof reportStyles>("modern");

  const handleGenerateReport = async () => {
    const pdf = await generateReport(selectedTemplate, data);
    onGenerate(pdf);
  };

  const downloadAsCSV = () => {
    const headers = Object.keys(data[0] || {});
    const csvContent = [
      headers.join(","),
      ...data.map((row: any) => headers.map((header) => row[header]).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report-${selectedTemplate}-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Report Template</Label>
          <Select
            value={selectedTemplate}
            onValueChange={(value: any) => setSelectedTemplate(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select template" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(reportTemplates).map(([key, template]) => (
                <SelectItem key={key} value={key}>
                  {template.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Report Style</Label>
          <Select
            value={selectedStyle}
            onValueChange={(value: any) => setSelectedStyle(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(reportStyles).map((style) => (
                <SelectItem key={style} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4">
          <Button onClick={handleGenerateReport} className="flex-1">
            <FileDown className="h-4 w-4 mr-2" /> Generate PDF
          </Button>
          <Button onClick={downloadAsCSV} variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ReportGenerator;
