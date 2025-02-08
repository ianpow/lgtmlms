import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Download, Share2 } from "lucide-react";

interface CourseCertificateProps {
  studentName: string;
  courseName: string;
  completionDate: string;
  certificateId: string;
  instructorName: string;
  onDownload?: () => void;
  onShare?: () => void;
}

const CourseCertificate = ({
  studentName,
  courseName,
  completionDate,
  certificateId,
  instructorName,
  onDownload = () => {},
  onShare = () => {},
}: CourseCertificateProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 bg-white relative overflow-hidden">
        {/* Certificate Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 border-[20px] border-primary/10 m-8" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)_1px,_transparent_1px)] bg-[size:20px_20px] opacity-10" />
        </div>

        {/* Certificate Content */}
        <div className="relative text-center space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Certificate of Completion
            </h1>
            <p className="text-muted-foreground">This certifies that</p>
          </div>

          <div className="my-8">
            <h2 className="text-4xl font-serif text-gray-900">{studentName}</h2>
            <div className="w-60 h-0.5 bg-primary/20 mx-auto mt-2" />
          </div>

          <div className="space-y-2">
            <p className="text-lg">has successfully completed the course</p>
            <h3 className="text-2xl font-semibold text-gray-900">
              {courseName}
            </h3>
          </div>

          <div className="mt-8 space-y-4">
            <p className="text-sm text-muted-foreground">
              Completed on {new Date(completionDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-muted-foreground">
              Certificate ID: {certificateId}
            </p>
          </div>

          <div className="mt-12 flex items-center justify-center gap-16">
            <div className="text-center">
              <div className="w-40 h-0.5 bg-gray-300 mb-2" />
              <p className="text-sm font-medium">{instructorName}</p>
              <p className="text-xs text-muted-foreground">Instructor</p>
            </div>

            <div className="text-center">
              <div className="w-40 h-0.5 bg-gray-300 mb-2" />
              <p className="text-sm font-medium">Platform Director</p>
              <p className="text-xs text-muted-foreground">LMS Platform</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-center gap-4 mt-6">
        <Button onClick={onDownload}>
          <Download className="h-4 w-4 mr-2" /> Download Certificate
        </Button>
        <Button variant="outline" onClick={onShare}>
          <Share2 className="h-4 w-4 mr-2" /> Share Certificate
        </Button>
      </div>
    </div>
  );
};

export default CourseCertificate;
