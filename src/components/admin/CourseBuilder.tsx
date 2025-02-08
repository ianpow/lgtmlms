import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Plus,
  Trash2,
  GripVertical,
  LayoutTemplate,
  ChevronDown,
  ChevronUp,
  Copy,
  Eye,
  Upload,
  Music,
  Users,
} from "lucide-react";
import { Textarea } from "../ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { courseTemplates, contentTemplates, Template } from "./courseTemplates";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import QuizEditor from "./QuizEditor";
import ContentPreview from "./ContentPreview";
import AudioPlayer from "./AudioPlayer";
import CourseEnrollment from "./CourseEnrollment";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export type ContentBlockType = "video" | "pdf" | "text" | "quiz" | "audio";

interface AudioTrack {
  id: string;
  title: string;
  url: string;
}

interface ContentBlock {
  id: string;
  type: ContentBlockType;
  title: string;
  content: string;
  questions?: QuizQuestion[];
  audioTracks?: AudioTrack[];
  activeTrackId?: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  type: "multiple_choice" | "true_false";
  options?: string[];
  correctAnswer: string | boolean;
}

interface CourseBuilderProps {
  onSave: (sections: Section[]) => void;
}

const CourseBuilder = ({ onSave }: CourseBuilderProps) => {
  const [sections, setSections] = React.useState<Section[]>([
    {
      id: "1",
      title: "Introduction",
      content: [],
    },
  ]);
  const [collapsedSections, setCollapsedSections] = React.useState<string[]>(
    [],
  );
  const [previewBlock, setPreviewBlock] = React.useState<{
    sectionId: string;
    blockId: string;
  } | null>(null);
  const [showEnrollment, setShowEnrollment] = React.useState(false);

  const loadTemplate = (template: Template) => {
    setSections(courseTemplates[template].sections);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, type } = result;

    if (type === "section") {
      const items = Array.from(sections);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setSections(items);
      return;
    }

    // Handle content block reordering within a section
    const sectionId = result.droppableId.replace("section-content-", "");
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;

    const items = Array.from(section.content);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    setSections(
      sections.map((s) => (s.id === sectionId ? { ...s, content: items } : s)),
    );
  };

  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  const duplicateContent = (sectionId: string, blockId: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          const blockToDuplicate = section.content.find(
            (b) => b.id === blockId,
          );
          if (!blockToDuplicate) return section;

          return {
            ...section,
            content: [
              ...section.content,
              {
                ...blockToDuplicate,
                id: Date.now().toString(),
                title: `${blockToDuplicate.title} (Copy)`,
              },
            ],
          };
        }
        return section;
      }),
    );
  };

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: Date.now().toString(),
        title: "New Section",
        content: [],
      },
    ]);
  };

  const addContent = (
    sectionId: string,
    type: ContentBlockType,
    template?: keyof typeof contentTemplates,
  ) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          const newContent = template
            ? { id: Date.now().toString(), ...contentTemplates[template] }
            : {
                id: Date.now().toString(),
                type,
                title: "",
                content: "",
                questions: type === "quiz" ? [] : undefined,
                audioTracks: type === "audio" ? [] : undefined,
              };

          return {
            ...section,
            content: [...section.content, newContent],
          };
        }
        return section;
      }),
    );
  };

  const updateContent = (
    sectionId: string,
    contentId: string,
    data: Partial<ContentBlock>,
  ) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            content: section.content.map((content) => {
              if (content.id === contentId) {
                return { ...content, ...data };
              }
              return content;
            }),
          };
        }
        return section;
      }),
    );
  };

  const handleAudioUpload = async (
    sectionId: string,
    blockId: string,
    file: File,
  ) => {
    // In a real app, you would upload this to your storage
    // For now, we'll use a local URL
    const url = URL.createObjectURL(file);
    const newTrack: AudioTrack = {
      id: Date.now().toString(),
      title: file.name,
      url,
    };

    const section = sections.find((s) => s.id === sectionId);
    const block = section?.content.find((b) => b.id === blockId);

    if (block) {
      updateContent(sectionId, blockId, {
        audioTracks: [...(block.audioTracks || []), newTrack],
        activeTrackId: block.activeTrackId || newTrack.id,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Course Content</h2>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <LayoutTemplate className="h-4 w-4 mr-2" />
                Load Template
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => loadTemplate("basicCourse")}>
                Basic Course
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => loadTemplate("workshop")}>
                Workshop
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => setShowEnrollment(true)}>
            <Users className="h-4 w-4 mr-2" /> Manage Enrollment
          </Button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections" type="section">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-6"
            >
              {sections.map((section, index) => (
                <Draggable
                  key={section.id}
                  draggableId={section.id}
                  index={index}
                >
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="p-6"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSection(section.id)}
                        >
                          {collapsedSections.includes(section.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronUp className="h-4 w-4" />
                          )}
                        </Button>
                        <div {...provided.dragHandleProps}>
                          <GripVertical className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          value={section.title}
                          onChange={(e) => {
                            setSections(
                              sections.map((s) =>
                                s.id === section.id
                                  ? { ...s, title: e.target.value }
                                  : s,
                              ),
                            );
                          }}
                          placeholder="Section Title"
                          className="text-lg font-semibold"
                        />
                      </div>

                      {!collapsedSections.includes(section.id) && (
                        <Droppable
                          droppableId={`section-content-${section.id}`}
                          type={`content-${section.id}`}
                        >
                          {(provided) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              className="space-y-4"
                            >
                              {section.content.map((block, blockIndex) => (
                                <Draggable
                                  key={block.id}
                                  draggableId={block.id}
                                  index={blockIndex}
                                >
                                  {(provided) => (
                                    <Card
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      className="p-4"
                                    >
                                      <div className="flex items-center gap-4 mb-4">
                                        <div {...provided.dragHandleProps}>
                                          <GripVertical className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <Input
                                          value={block.title}
                                          onChange={(e) =>
                                            updateContent(
                                              section.id,
                                              block.id,
                                              {
                                                title: e.target.value,
                                              },
                                            )
                                          }
                                          placeholder={`${block.type.charAt(0).toUpperCase() + block.type.slice(1)} Title`}
                                          className="flex-1"
                                        />
                                        <div className="flex gap-2">
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                              setPreviewBlock({
                                                sectionId: section.id,
                                                blockId: block.id,
                                              })
                                            }
                                          >
                                            <Eye className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                              duplicateContent(
                                                section.id,
                                                block.id,
                                              )
                                            }
                                          >
                                            <Copy className="h-4 w-4" />
                                          </Button>
                                          <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => {
                                              setSections(
                                                sections.map((s) => {
                                                  if (s.id === section.id) {
                                                    return {
                                                      ...s,
                                                      content: s.content.filter(
                                                        (c) =>
                                                          c.id !== block.id,
                                                      ),
                                                    };
                                                  }
                                                  return s;
                                                }),
                                              );
                                            }}
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>

                                      {block.type === "text" && (
                                        <Textarea
                                          value={block.content}
                                          onChange={(e) =>
                                            updateContent(
                                              section.id,
                                              block.id,
                                              {
                                                content: e.target.value,
                                              },
                                            )
                                          }
                                          placeholder="Enter content"
                                        />
                                      )}
                                      {block.type === "video" && (
                                        <Input
                                          value={block.content}
                                          onChange={(e) =>
                                            updateContent(
                                              section.id,
                                              block.id,
                                              {
                                                content: e.target.value,
                                              },
                                            )
                                          }
                                          placeholder="Enter video URL"
                                        />
                                      )}
                                      {block.type === "pdf" && (
                                        <Input
                                          value={block.content}
                                          onChange={(e) =>
                                            updateContent(
                                              section.id,
                                              block.id,
                                              {
                                                content: e.target.value,
                                              },
                                            )
                                          }
                                          placeholder="Enter PDF URL"
                                        />
                                      )}
                                      {block.type === "audio" && (
                                        <div className="space-y-4">
                                          <div className="flex items-center gap-4">
                                            <input
                                              type="file"
                                              id={`audio-upload-${block.id}`}
                                              className="hidden"
                                              accept="audio/*"
                                              onChange={(e) => {
                                                const file =
                                                  e.target.files?.[0];
                                                if (file) {
                                                  handleAudioUpload(
                                                    section.id,
                                                    block.id,
                                                    file,
                                                  );
                                                }
                                              }}
                                            />
                                            <Button
                                              variant="outline"
                                              onClick={() =>
                                                document
                                                  .getElementById(
                                                    `audio-upload-${block.id}`,
                                                  )
                                                  ?.click()
                                              }
                                            >
                                              <Upload className="h-4 w-4 mr-2" />
                                              Upload Audio
                                            </Button>
                                          </div>

                                          <AudioPlayer
                                            tracks={block.audioTracks || []}
                                            activeTrack={block.audioTracks?.find(
                                              (t) =>
                                                t.id === block.activeTrackId,
                                            )}
                                            onTrackChange={(track) => {
                                              updateContent(
                                                section.id,
                                                block.id,
                                                {
                                                  activeTrackId: track.id,
                                                },
                                              );
                                            }}
                                          />
                                        </div>
                                      )}
                                      {block.type === "quiz" && (
                                        <QuizEditor
                                          questions={block.questions || []}
                                          onChange={(questions) =>
                                            updateContent(
                                              section.id,
                                              block.id,
                                              {
                                                questions,
                                              },
                                            )
                                          }
                                        />
                                      )}

                                      {previewBlock?.sectionId === section.id &&
                                        previewBlock?.blockId === block.id &&
                                        block.type !== "quiz" &&
                                        block.type !== "audio" && (
                                          <ContentPreview
                                            type={block.type}
                                            content={block.content}
                                          />
                                        )}
                                    </Card>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      )}

                      {!collapsedSections.includes(section.id) && (
                        <div className="flex space-x-2 mt-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Plus className="h-4 w-4 mr-2" /> Add Video
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => addContent(section.id, "video")}
                              >
                                Blank Video
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  addContent(section.id, "video", "videoLesson")
                                }
                              >
                                Video Lesson Template
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Plus className="h-4 w-4 mr-2" /> Add Text
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => addContent(section.id, "text")}
                              >
                                Blank Text
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  addContent(section.id, "text", "textReading")
                                }
                              >
                                Reading Template
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addContent(section.id, "pdf")}
                          >
                            Add PDF
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Music className="h-4 w-4 mr-2" /> Add Audio
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => addContent(section.id, "audio")}
                              >
                                Blank Audio
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  addContent(section.id, "audio", "audioLesson")
                                }
                              >
                                Audio Lesson Template
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Plus className="h-4 w-4 mr-2" /> Add Quiz
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => addContent(section.id, "quiz")}
                              >
                                Blank Quiz
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  addContent(
                                    section.id,
                                    "quiz",
                                    "multipleChoiceQuiz",
                                  )
                                }
                              >
                                Multiple Choice Template
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  addContent(
                                    section.id,
                                    "quiz",
                                    "trueFalseQuiz",
                                  )
                                }
                              >
                                True/False Template
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      )}
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="flex justify-between">
        <Button onClick={addSection}>
          <Plus className="h-4 w-4 mr-2" /> Add Section
        </Button>
        <Button onClick={() => onSave(sections)}>Save Course</Button>
      </div>

      <Dialog open={showEnrollment} onOpenChange={setShowEnrollment}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Course Enrollment</DialogTitle>
          </DialogHeader>
          <CourseEnrollment
            courseId="1"
            departments={[
              { id: "1", name: "Engineering" },
              { id: "2", name: "Design" },
              { id: "3", name: "Marketing" },
            ]}
            roles={[
              { id: "1", name: "Developer" },
              { id: "2", name: "Designer" },
              { id: "3", name: "Manager" },
            ]}
            locations={[
              { id: "1", name: "San Francisco" },
              { id: "2", name: "New York" },
              { id: "3", name: "London" },
            ]}
            onEnroll={(enrollment) => {
              console.log("Enrollment:", enrollment);
              setShowEnrollment(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseBuilder;
