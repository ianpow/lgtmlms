import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Plus, Trash2, GripVertical } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface QuestionRoute {
  nextQuestionId: string;
  condition: {
    type: "equals" | "contains";
    value: string;
  };
}

interface Question {
  id: string;
  type: "text" | "multipleChoice" | "rating" | "checkbox";
  question: string;
  options?: string[];
  required: boolean;
  routes?: QuestionRoute[];
}

interface SurveyBuilderProps {
  onSave: (survey: {
    title: string;
    description: string;
    questions: Question[];
  }) => void;
}

const SurveyBuilder = ({ onSave }: SurveyBuilderProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = (type: Question["type"]) => {
    setQuestions([
      ...questions,
      {
        id: Date.now().toString(),
        type,
        question: "",
        options:
          type === "multipleChoice" || type === "checkbox" ? [""] : undefined,
        required: false,
        routes: [],
      },
    ]);
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, ...updates } : q)),
    );
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const addOption = (questionId: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, options: [...(q.options || []), ""] } : q,
      ),
    );
  };

  const updateOption = (questionId: string, index: number, value: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.options) {
          const newOptions = [...q.options];
          newOptions[index] = value;
          return { ...q, options: newOptions };
        }
        return q;
      }),
    );
  };

  const removeOption = (questionId: string, index: number) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.options) {
          const newOptions = q.options.filter((_, i) => i !== index);
          return { ...q, options: newOptions };
        }
        return q;
      }),
    );
  };

  const addRoute = (questionId: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            routes: [
              ...(q.routes || []),
              {
                nextQuestionId: "",
                condition: { type: "equals", value: q.options?.[0] || "" },
              },
            ],
          };
        }
        return q;
      }),
    );
  };

  const updateRoute = (
    questionId: string,
    routeIndex: number,
    updates: Partial<QuestionRoute>,
  ) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.routes) {
          const newRoutes = [...q.routes];
          newRoutes[routeIndex] = { ...newRoutes[routeIndex], ...updates };
          return { ...q, routes: newRoutes };
        }
        return q;
      }),
    );
  };

  const removeRoute = (questionId: string, routeIndex: number) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.routes) {
          const newRoutes = q.routes.filter((_, i) => i !== routeIndex);
          return { ...q, routes: newRoutes };
        }
        return q;
      }),
    );
  };

  const handleSave = () => {
    onSave({ title, description, questions });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Survey Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter survey title"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter survey description"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Questions</h3>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => addQuestion("text")}>
                <Plus className="h-4 w-4 mr-2" /> Text
              </Button>
              <Button
                variant="outline"
                onClick={() => addQuestion("multipleChoice")}
              >
                <Plus className="h-4 w-4 mr-2" /> Multiple Choice
              </Button>
              <Button variant="outline" onClick={() => addQuestion("rating")}>
                <Plus className="h-4 w-4 mr-2" /> Rating
              </Button>
              <Button variant="outline" onClick={() => addQuestion("checkbox")}>
                <Plus className="h-4 w-4 mr-2" /> Checkbox
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {questions.map((question, index) => (
                <Card key={question.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <GripVertical className="h-5 w-5 text-gray-400" />
                      <div className="flex-1">
                        <Input
                          value={question.question}
                          onChange={(e) =>
                            updateQuestion(question.id, {
                              question: e.target.value,
                            })
                          }
                          placeholder="Enter question"
                        />
                      </div>
                      <Select
                        value={question.type}
                        onValueChange={(value: Question["type"]) =>
                          updateQuestion(question.id, { type: value })
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="multipleChoice">
                            Multiple Choice
                          </SelectItem>
                          <SelectItem value="rating">Rating</SelectItem>
                          <SelectItem value="checkbox">Checkbox</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeQuestion(question.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {(question.type === "multipleChoice" ||
                      question.type === "checkbox") &&
                      question.options && (
                        <div className="space-y-4 pl-9">
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className="flex items-center gap-2"
                              >
                                <Input
                                  value={option}
                                  onChange={(e) =>
                                    updateOption(
                                      question.id,
                                      optionIndex,
                                      e.target.value,
                                    )
                                  }
                                  placeholder={`Option ${optionIndex + 1}`}
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    removeOption(question.id, optionIndex)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addOption(question.id)}
                            >
                              <Plus className="h-4 w-4 mr-2" /> Add Option
                            </Button>
                          </div>

                          <div className="space-y-2">
                            <Label>Question Routing</Label>
                            {question.routes?.map((route, routeIndex) => (
                              <div
                                key={routeIndex}
                                className="flex items-center gap-2"
                              >
                                <Select
                                  value={route.condition.value}
                                  onValueChange={(value) =>
                                    updateRoute(question.id, routeIndex, {
                                      condition: { ...route.condition, value },
                                    })
                                  }
                                >
                                  <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="If answer is..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {question.options.map((option) => (
                                      <SelectItem key={option} value={option}>
                                        {option}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>

                                <span>go to</span>

                                <Select
                                  value={route.nextQuestionId}
                                  onValueChange={(value) =>
                                    updateRoute(question.id, routeIndex, {
                                      nextQuestionId: value,
                                    })
                                  }
                                >
                                  <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Select next question" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {questions
                                      .filter((q) => q.id !== question.id)
                                      .map((q) => (
                                        <SelectItem key={q.id} value={q.id}>
                                          {q.question || "Untitled Question"}
                                        </SelectItem>
                                      ))}
                                  </SelectContent>
                                </Select>

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    removeRoute(question.id, routeIndex)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addRoute(question.id)}
                            >
                              <Plus className="h-4 w-4 mr-2" /> Add Route
                            </Button>
                          </div>
                        </div>
                      )}
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Survey</Button>
      </div>
    </div>
  );
};

export default SurveyBuilder;
