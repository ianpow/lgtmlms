import React from "react";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CourseCertificate from "../certificates/CourseCertificate";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";

const AwardsPage = () => {
  const certificates = [
    {
      id: "1",
      studentName: "John Doe",
      courseName: "Web Development Fundamentals",
      completionDate: "2024-02-15",
      certificateId: "CERT-001",
      instructorName: "Dr. Jane Smith",
    },
    {
      id: "2",
      studentName: "John Doe",
      courseName: "Advanced React Patterns",
      completionDate: "2024-03-01",
      certificateId: "CERT-002",
      instructorName: "Prof. Alex Johnson",
    },
  ];

  const skillBadges = [
    {
      id: "1",
      name: "React Master",
      description: "Completed 5 React courses",
      earnedDate: "2024-02-20",
      icon: "⚛️",
    },
    {
      id: "2",
      name: "TypeScript Pro",
      description: "Completed 3 TypeScript courses",
      earnedDate: "2024-03-05",
      icon: "📘",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Tabs defaultValue="certificates" className="w-full">
        <TabsList>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="badges">Skill Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="certificates" className="space-y-8">
          <ScrollArea className="h-[calc(100vh-200px)]">
            {certificates.map((cert) => (
              <div key={cert.id} className="mb-8">
                <CourseCertificate
                  studentName={cert.studentName}
                  courseName={cert.courseName}
                  completionDate={cert.completionDate}
                  certificateId={cert.certificateId}
                  instructorName={cert.instructorName}
                  onDownload={() => {
                    // Handle certificate download
                    console.log("Downloading certificate:", cert.certificateId);
                  }}
                  onShare={() => {
                    // Handle certificate sharing
                    console.log("Sharing certificate:", cert.certificateId);
                  }}
                />
              </div>
            ))}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="badges" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillBadges.map((badge) => (
              <Card key={badge.id} className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-4xl">
                    {badge.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{badge.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {badge.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Earned on{" "}
                      {new Date(badge.earnedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AwardsPage;
