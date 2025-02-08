import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { ScrollArea } from "../ui/scroll-area";
import { ChevronLeft, ChevronRight, CheckCircle, Circle } from "lucide-react";
import ContentPreview from "../admin/ContentPreview";
import AudioPlayer from "../admin/AudioPlayer";

interface Section {
  id: string;
  title: string;
  content: ContentBlock[];
}

interface ContentBlock {
  id: string;
  type: "video" | "pdf" | "text" | "audio";
  title: string;
  content: string;
  completed?: boolean;
  audioTracks?: any[];
}

interface CoursePlayerProps {
  sections: Section[];
  onComplete?: (contentId: string) => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

const CoursePlayer = ({
  sections = [],
  onComplete = () => {},
  onNext = () => {},
  onPrevious = () => {},
}: CoursePlayerProps) => {
  const [activeSection, setActiveSection] = useState(0);
  const [activeContent, setActiveContent] = useState(0);

  const currentSection = sections[activeSection];
  const currentContent = currentSection?.content[activeContent];

  const totalContent = sections.reduce(
    (sum, section) => sum + section.content.length,
    0,
  );

  const completedContent = sections.reduce(
    (sum, section) =>
      sum + section.content.filter((content) => content.completed).length,
    0,
  );

  const progress = (completedContent / totalContent) * 100;

  const handleNext = () => {
    if (activeContent < currentSection.content.length - 1) {
      setActiveContent(activeContent + 1);
    } else if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1);
      setActiveContent(0);
    }
    onNext();
  };

  const handlePrevious = () => {
    if (activeContent > 0) {
      setActiveContent(activeContent - 1);
    } else if (activeSection > 0) {
      setActiveSection(activeSection - 1);
      setActiveContent(sections[activeSection - 1].content.length - 1);
    }
    onPrevious();
  };

  const handleComplete = () => {
    if (currentContent) {
      onComplete(currentContent.id);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{currentSection?.title}</h1>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={activeSection === 0 && activeContent === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" /> Previous
              </Button>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={
                  activeSection === sections.length - 1 &&
                  activeContent === currentSection?.content.length - 1
                }
              >
                Next <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          <Progress value={progress} className="h-2" />

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              {currentContent?.title}
            </h2>
            {currentContent?.type === "audio" ? (
              <AudioPlayer
                tracks={currentContent.audioTracks || []}
                activeTrack={currentContent.audioTracks?.[0]}
              />
            ) : (
              <ContentPreview
                type={currentContent?.type}
                content={currentContent?.content}
                title={currentContent?.title}
              />
            )}
            <Button
              className="mt-4"
              onClick={handleComplete}
              disabled={currentContent?.completed}
            >
              {currentContent?.completed ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" /> Completed
                </>
              ) : (
                <>Mark as Complete</>
              )}
            </Button>
          </Card>
        </div>
      </div>

      {/* Sidebar */}
      <Card className="w-80 h-full border-l">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-6">
            {sections.map((section, sIndex) => (
              <div key={section.id} className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.content.map((content, cIndex) => (
                    <Button
                      key={content.id}
                      variant={`${
                        activeSection === sIndex && activeContent === cIndex
                          ? "secondary"
                          : "ghost"
                      }`}
                      className="w-full justify-start"
                      onClick={() => {
                        setActiveSection(sIndex);
                        setActiveContent(cIndex);
                      }}
                    >
                      {content.completed ? (
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      ) : (
                        <Circle className="h-4 w-4 mr-2" />
                      )}
                      {content.title}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default CoursePlayer;
