import React from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Plus, Trash2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";

interface QuizEditorProps {
  questions: QuizQuestion[];
  onChange: (questions: QuizQuestion[]) => void;
}

interface QuizQuestion {
  id: string;
  question: string;
  type: "multiple_choice" | "true_false";
  options?: string[];
  correctAnswer: string | boolean;
}

const QuizEditor = ({ questions = [], onChange }: QuizEditorProps) => {
  const addQuestion = (type: "multiple_choice" | "true_false") => {
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      question: "",
      type,
      options: type === "multiple_choice" ? ["", "", "", ""] : undefined,
      correctAnswer: type === "multiple_choice" ? "" : false,
    };
    onChange([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, data: Partial<QuizQuestion>) => {
    onChange(questions.map((q) => (q.id === id ? { ...q, ...data } : q)));
  };

  const removeQuestion = (id: string) => {
    onChange(questions.filter((q) => q.id !== id));
  };

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <Card key={question.id} className="p-4 space-y-4">
          <div className="flex items-center gap-4">
            <Input
              value={question.question}
              onChange={(e) =>
                updateQuestion(question.id, { question: e.target.value })
              }
              placeholder="Enter question"
              className="flex-1"
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeQuestion(question.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {question.type === "multiple_choice" && question.options && (
            <div className="space-y-2">
              <RadioGroup
                value={question.correctAnswer as string}
                onValueChange={(value) =>
                  updateQuestion(question.id, { correctAnswer: value })
                }
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option || ""}
                      id={`q${question.id}-opt${index}`}
                    />
                    <Input
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...question.options!];
                        newOptions[index] = e.target.value;
                        updateQuestion(question.id, { options: newOptions });
                      }}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1"
                    />
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {question.type === "true_false" && (
            <div className="flex items-center space-x-2">
              <Label>Correct Answer:</Label>
              <Switch
                checked={question.correctAnswer as boolean}
                onCheckedChange={(checked) =>
                  updateQuestion(question.id, { correctAnswer: checked })
                }
              />
              <span className="text-sm text-muted-foreground">
                {question.correctAnswer ? "True" : "False"}
              </span>
            </div>
          )}
        </Card>
      ))}

      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => addQuestion("multiple_choice")}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Multiple Choice
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => addQuestion("true_false")}
        >
          <Plus className="h-4 w-4 mr-2" /> Add True/False
        </Button>
      </div>
    </div>
  );
};

export default QuizEditor;
