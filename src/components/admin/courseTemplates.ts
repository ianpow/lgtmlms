export type ContentBlockType = "video" | "pdf" | "text" | "quiz" | "audio";

interface ContentBlock {
  id: string;
  type: ContentBlockType;
  title: string;
  content: string;
  questions?: any[];
  audioTracks?: any[];
  activeTrackId?: string;
}

export const contentTemplates: Record<string, ContentBlock> = {
  audioLesson: {
    id: "audio-template",
    type: "audio",
    title: "Audio Lesson",
    content: "",
  },
  videoLesson: {
    id: "video-template",
    type: "video",
    title: "Video Lesson",
    content: "",
  },
  textReading: {
    id: "text-template",
    type: "text",
    title: "Reading Material",
    content: "Add your content here...",
  },
  multipleChoiceQuiz: {
    id: "quiz-template-mc",
    type: "quiz",
    title: "Knowledge Check",
    content: "",
    questions: [
      {
        id: "q1",
        type: "multiple_choice",
        question: "Sample question?",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correctAnswer: "Option 1",
      },
    ],
  },
  trueFalseQuiz: {
    id: "quiz-template-tf",
    type: "quiz",
    title: "True/False Quiz",
    content: "",
    questions: [
      {
        id: "q1",
        type: "true_false",
        question: "Is this a sample question?",
        correctAnswer: true,
      },
    ],
  },
};

export interface Section {
  id: string;
  title: string;
  content: ContentBlock[];
}

export const courseTemplates: Record<string, { sections: Section[] }> = {
  basicCourse: {
    sections: [
      {
        id: "intro",
        title: "Introduction",
        content: [
          {
            id: "welcome-video",
            type: "video",
            title: "Welcome to the Course",
            content: "",
          },
          {
            id: "course-overview",
            type: "text",
            title: "Course Overview",
            content: "In this course, you will learn...",
          },
        ],
      },
    ],
  },
  workshop: {
    sections: [
      {
        id: "prep",
        title: "Workshop Preparation",
        content: [
          {
            id: "prerequisites",
            type: "text",
            title: "Prerequisites",
            content: "Before starting this workshop, ensure you have...",
          },
        ],
      },
    ],
  },
};

export type Template = keyof typeof courseTemplates;
