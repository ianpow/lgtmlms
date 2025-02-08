import React, { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { ScrollArea } from "../ui/scroll-area";
import { Save } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import {
  Card as CardUI,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface ExternalContentSourceProps {
  onSave: (config: {
    name: string;
    url: string;
    apiKey: string;
    fieldMappings: FieldMapping[];
    schedule: string;
    isActive: boolean;
  }) => void;
  initialConfig?: any;
}

interface FieldMapping {
  sourceField: string;
  targetField: string;
}

const ExternalContentSource: React.FC<ExternalContentSourceProps> = ({
  onSave,
  initialConfig,
}) => {
  const [config, setConfig] = React.useState({
    name: initialConfig?.name || "",
    url: initialConfig?.url || "",
    apiKey: initialConfig?.apiKey || "",
    fieldMappings: initialConfig?.fieldMappings || [],
    schedule: initialConfig?.schedule || "daily",
    isActive: initialConfig?.isActive || false,
  });

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Source Name</Label>
          <Input
            value={config.name}
            onChange={(e) => setConfig({ ...config, name: e.target.value })}
            placeholder="Enter source name"
          />
        </div>

        <div className="space-y-2">
          <Label>API URL</Label>
          <Input
            value={config.url}
            onChange={(e) => setConfig({ ...config, url: e.target.value })}
            placeholder="https://api.example.com/content"
          />
        </div>

        <div className="space-y-2">
          <Label>API Key</Label>
          <Input
            value={config.apiKey}
            onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
            type="password"
            placeholder="Enter API key"
          />
        </div>

        <div className="space-y-2">
          <Label>Sync Schedule</Label>
          <Select
            value={config.schedule}
            onValueChange={(value) => setConfig({ ...config, schedule: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select schedule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={config.isActive}
            onCheckedChange={(checked) =>
              setConfig({ ...config, isActive: checked })
            }
          />
          <Label>Active</Label>
        </div>

        <Button onClick={() => onSave(config)} className="w-full">
          <Save className="h-4 w-4 mr-2" /> Save Configuration
        </Button>
      </div>
    </Card>
  );
};

export default ExternalContentSource;
