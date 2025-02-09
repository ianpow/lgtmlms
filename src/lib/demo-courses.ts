export interface Course {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  level: string;
  sections: Section[];
}

interface Section {
  id: string;
  title: string;
  content: ContentBlock[];
}

interface ContentBlock {
  id: string;
  type: "video" | "pdf" | "text" | "quiz" | "audio";
  title: string;
  content: string;
}

export const saveCourse = (course: Course) => {
  const courses = JSON.parse(localStorage.getItem("courses") || "[]");
  courses.push(course);
  localStorage.setItem("courses", JSON.stringify(courses));
};

export const getCourses = () => {
  return JSON.parse(localStorage.getItem("courses") || "[]");
};

export const getCourseById = (id: string) => {
  const courses = getCourses();
  return courses.find((course: Course) => course.id === id);
};

export const updateCourse = (id: string, updates: Partial<Course>) => {
  const courses = getCourses();
  const index = courses.findIndex((course: Course) => course.id === id);
  if (index !== -1) {
    courses[index] = { ...courses[index], ...updates };
    localStorage.setItem("courses", JSON.stringify(courses));
  }
};

export const deleteCourse = (id: string) => {
  const courses = getCourses();
  const filtered = courses.filter((course: Course) => course.id !== id);
  localStorage.setItem("courses", JSON.stringify(filtered));
};
