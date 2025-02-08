import React from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface EmailCampaignProps {
  onSend: (campaign: {
    subject: string;
    content: string;
    audience: string;
    schedule: string;
  }) => void;
}

const EmailCampaign = ({ onSend }: EmailCampaignProps) => {
  const [subject, setSubject] = React.useState("");
  const [content, setContent] = React.useState("");
  const [audience, setAudience] = React.useState("all");
  const [schedule, setSchedule] = React.useState("now");

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <Label>Email Subject</Label>
        <Input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter email subject"
        />
      </div>

      <div className="space-y-2">
        <Label>Email Content</Label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter email content"
          className="min-h-[200px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Target Audience</Label>
          <Select value={audience} onValueChange={setAudience}>
            <SelectTrigger>
              <SelectValue placeholder="Select audience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Students</SelectItem>
              <SelectItem value="active">Active Students</SelectItem>
              <SelectItem value="inactive">Inactive Students</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Schedule</Label>
          <Select value={schedule} onValueChange={setSchedule}>
            <SelectTrigger>
              <SelectValue placeholder="Select schedule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="now">Send Now</SelectItem>
              <SelectItem value="later">Schedule for Later</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={() => onSend({ subject, content, audience, schedule })}
        className="w-full"
      >
        Send Campaign
      </Button>
    </Card>
  );
};

export default EmailCampaign;
