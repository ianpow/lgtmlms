import React from "react";
import { Card } from "../ui/card";
import AudioPlayer from "./AudioPlayer";

interface ContentPreviewProps {
  type: "video" | "pdf" | "text" | "audio";
  content: string;
  title?: string;
}

const ContentPreview = ({ type, content, title }: ContentPreviewProps) => {
  if (!content) return null;

  return (
    <Card className="p-4 mt-4">
      {type === "video" && (
        <div className="aspect-video">
          <iframe
            src={content}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {type === "pdf" && (
        <div className="aspect-[4/3]">
          <iframe src={content} className="w-full h-full" />
        </div>
      )}

      {type === "text" && (
        <div className="prose max-w-none">
          {content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
      {type === "audio" && <AudioPlayer url={content} title={title} />}
    </Card>
  );
};

export default ContentPreview;
