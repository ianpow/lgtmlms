import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
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
import {
  courseTemplates,
  contentTemplates,
  Template,
  Section,
} from "./courseTemplates";
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

const CourseBuilder = ({
  onSave,
  initialSections,
}: CourseBuilderProps & { initialSections?: Section[] }) => {
  const [sections, setSections] = React.useState<Section[]>(
    initialSections || [
      {
        id: "1",
        title: "Introduction",
        content: [],
      },
    ],
  );
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

  const addContent = React.useCallback(
    (
      sectionId: string,
      type: ContentBlockType,
      template?: keyof typeof contentTemplates,
    ) => {
      setSections((prevSections) => {
        const newContent = template
          ? { ...contentTemplates[template], id: Date.now().toString() }
          : {
              id: Date.now().toString(),
              type,
              title: "",
              content: "",
              questions: type === "quiz" ? [] : undefined,
              audioTracks: type === "audio" ? [] : undefined,
            };

        return prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              content: [...section.content, newContent],
            };
          }
          return section;
        });
      });
    },
    [],
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
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

      <div className="flex-1 overflow-y-auto p-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sections" type="section">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
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
                        className="p-4"
                      >
                        <div className="flex items-center gap-4 mb-4">
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
                            className="flex-1"
                          />
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
                        </div>

                        {!collapsedSections.includes(section.id) && (
                          <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addContent(section.id, "video")}
                              >
                                <Plus className="h-4 w-4 mr-2" /> Add Video
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addContent(section.id, "text")}
                              >
                                <Plus className="h-4 w-4 mr-2" /> Add Text
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addContent(section.id, "quiz")}
                              >
                                <Plus className="h-4 w-4 mr-2" /> Add Quiz
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addContent(section.id, "audio")}
                              >
                                <Music className="h-4 w-4 mr-2" /> Add Audio
                              </Button>
                            </div>

                            {section.content.map((block, blockIndex) => (
                              <Card key={block.id} className="p-4">
                                <div className="flex items-center gap-4 mb-4">
                                  <Input
                                    value={block.title}
                                    onChange={(e) =>
                                      setSections(
                                        sections.map((s) =>
                                          s.id === section.id
                                            ? {
                                                ...s,
                                                content: s.content.map((c) =>
                                                  c.id === block.id
                                                    ? {
                                                        ...c,
                                                        title: e.target.value,
                                                      }
                                                    : c,
                                                ),
                                              }
                                            : s,
                                        ),
                                      )
                                    }
                                    placeholder={`${block.type.charAt(0).toUpperCase() + block.type.slice(1)} Title`}
                                    className="flex-1"
                                  />
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
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => {
                                      setSections(
                                        sections.map((s) =>
                                          s.id === section.id
                                            ? {
                                                ...s,
                                                content: s.content.filter(
                                                  (c) => c.id !== block.id,
                                                ),
                                              }
                                            : s,
                                        ),
                                      );
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>

                                {block.type === "text" && (
                                  <Textarea
                                    value={block.content}
                                    onChange={(e) =>
                                      setSections(
                                        sections.map((s) =>
                                          s.id === section.id
                                            ? {
                                                ...s,
                                                content: s.content.map((c) =>
                                                  c.id === block.id
                                                    ? {
                                                        ...c,
                                                        content: e.target.value,
                                                      }
                                                    : c,
                                                ),
                                              }
                                            : s,
                                        ),
                                      )
                                    }
                                    placeholder="Enter content"
                                  />
                                )}

                                {(block.type === "video" ||
                                  block.type === "pdf") && (
                                  <Input
                                    value={block.content}
                                    onChange={(e) =>
                                      setSections(
                                        sections.map((s) =>
                                          s.id === section.id
                                            ? {
                                                ...s,
                                                content: s.content.map((c) =>
                                                  c.id === block.id
                                                    ? {
                                                        ...c,
                                                        content: e.target.value,
                                                      }
                                                    : c,
                                                ),
                                              }
                                            : s,
                                        ),
                                      )
                                    }
                                    placeholder={`Enter ${block.type} URL`}
                                  />
                                )}

                                {block.type === "quiz" && (
                                  <QuizEditor
                                    questions={block.questions || []}
                                    onChange={(questions) =>
                                      setSections(
                                        sections.map((s) =>
                                          s.id === section.id
                                            ? {
                                                ...s,
                                                content: s.content.map((c) =>
                                                  c.id === block.id
                                                    ? { ...c, questions }
                                                    : c,
                                                ),
                                              }
                                            : s,
                                        ),
                                      )
                                    }
                                  />
                                )}

                                {previewBlock?.sectionId === section.id &&
                                  previewBlock?.blockId === block.id && (
                                    <div className="mt-4">
                                      <ContentPreview
                                        type={block.type}
                                        content={block.content}
                                        title={block.title}
                                      />
                                    </div>
                                  )}
                              </Card>
                            ))}
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
      </div>

      <div className="p-4 border-t bg-background">
        <div className="flex justify-between">
          <Button onClick={addSection}>
            <Plus className="h-4 w-4 mr-2" /> Add Section
          </Button>
          <Button onClick={() => onSave(sections)}>Save Course</Button>
        </div>
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
