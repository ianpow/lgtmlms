import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Timer, AlertTriangle } from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

interface QuizSystemProps {
  questions: Question[];
  timeLimit?: number;
  onComplete: (results: {
    score: number;
    answers: Record<string, string>;
    timeSpent: number;
  }) => void;
}

const QuizSystem = ({
  questions = [],
  timeLimit,
  onComplete,
}: QuizSystemProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  React.useEffect(() => {
    if (timeLimit && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeSpent((prev) => {
          if (prev >= timeLimit) {
            clearInterval(timer);
            handleSubmit();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLimit, isSubmitted]);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    const score =
      (questions.filter((q) => answers[q.id] === q.correctAnswer).length /
        questions.length) *
      100;
    setIsSubmitted(true);
    onComplete({ score, answers, timeSpent });
  };

  const question = questions[currentQuestion];

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {timeLimit && (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4" />
              <span>
                {Math.floor((timeLimit - timeSpent) / 60)}:
                {String((timeLimit - timeSpent) % 60).padStart(2, "0")}
              </span>
            </div>
            <Progress value={(timeSpent / timeLimit) * 100} className="w-32" />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              Question {currentQuestion + 1} of {questions.length}
            </h3>
            <Progress
              value={((currentQuestion + 1) / questions.length) * 100}
              className="w-32"
            />
          </div>

          <p className="text-lg">{question.text}</p>

          <RadioGroup
            value={answers[question.id]}
            onValueChange={(value) => handleAnswer(question.id, value)}
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>

          {isSubmitted && (
            <div
              className={`p-4 rounded-md ${answers[question.id] === question.correctAnswer ? "bg-green-100" : "bg-red-100"}`}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <p className="font-medium">
                  {answers[question.id] === question.correctAnswer
                    ? "Correct!"
                    : "Incorrect"}
                </p>
              </div>
              {question.explanation && (
                <p className="mt-2 text-sm">{question.explanation}</p>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>

          {currentQuestion < questions.length - 1 ? (
            <Button
              onClick={() => setCurrentQuestion((prev) => prev + 1)}
              disabled={!answers[question.id]}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitted || !answers[question.id]}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default QuizSystem;
