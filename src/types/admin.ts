export interface AdminDashboardProps {
  totalStudents?: number;
  totalCourses?: number;
  completedCourses?: number;
  onCreateCourse?: (courseData: CourseData) => void;
}

export interface AudioTrack {
  id: string;
  title: string;
  url: string;
}

export interface ContentBlock {
  id: string;
  type: "video" | "pdf" | "text" | "quiz" | "audio";
  title: string;
  content: string;
  questions?: QuizQuestion[];
  audioTracks?: AudioTrack[];
  activeTrackId?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: "multiple_choice" | "true_false";
  options?: string[];
  correctAnswer: string | boolean;
}

export interface CourseBuilderProps {
  onSave: (sections: Section[]) => void;
}

export interface Section {
  id: string;
  title: string;
  content: ContentBlock[];
}

export interface CourseFormProps {
  onSubmit?: (courseData: CourseData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  availableSkills?: Array<{
    id: string;
    name: string;
    category: string;
  }>;
  departments?: Array<{
    id: string;
    name: string;
  }>;
  locations?: Array<{
    id: string;
    name: string;
  }>;
}

export interface CourseData {
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  level: string;
  type: "external" | "scorm" | "cmi5" | "xapi" | "builder";
  url?: string;
  scormFile?: File;
  cmi5File?: File;
  sections?: any[];
  skills: Array<{
    skillId: string;
    requiredLevel: number;
    targetLevel: number;
  }>;
  departmentIds: string[];
  locationIds: string[];
  lrsEndpoint?: string;
  lrsKey?: string;
  lrsSecret?: string;
  activityId?: string;
  registration?: string;
}

export interface AudioPlayerProps {
  url?: string;
  title?: string;
  tracks?: AudioTrack[];
  activeTrack?: AudioTrack;
  onTrackChange?: (track: AudioTrack) => void;
}

export interface ContentPreviewProps {
  type: "video" | "pdf" | "text" | "audio";
  content: string;
  title?: string;
}
