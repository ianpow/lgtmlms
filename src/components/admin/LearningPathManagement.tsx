import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Plus, Edit, Trash2, Users, Clock, Brain, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Badge } from "../ui/badge";

interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: Array<{
    id: string;
    title: string;
    order: number;
  }>;
  enrolledUsers: number;
  completionRate: number;
  estimatedHours: number;
  skillsGained: string[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  skills: string[];
  duration: number;
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "React Fundamentals",
    description: "Learn React basics",
    skills: ["React", "JavaScript"],
    duration: 10,
  },
  {
    id: "2",
    title: "Advanced TypeScript",
    description: "Master TypeScript",
    skills: ["TypeScript", "JavaScript"],
    duration: 15,
  },
];

const LearningPathManagement = () => {
  const [showCourseSearch, setShowCourseSearch] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedPathId, setSelectedPathId] = React.useState<string>();
  const [paths, setPaths] = React.useState<LearningPath[]>([
    {
      id: "1",
      title: "Web Development Fundamentals",
      description: "A comprehensive path to learn web development",
      courses: [
        { id: "1", title: "HTML & CSS Basics", order: 1 },
        { id: "2", title: "JavaScript Fundamentals", order: 2 },
      ],
      enrolledUsers: 150,
      completionRate: 65,
      estimatedHours: 40,
      skillsGained: ["HTML", "CSS", "JavaScript"],
    },
  ]);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Learning Paths</h3>
          <Button
            onClick={() =>
              setPaths([
                ...paths,
                {
                  id: Date.now().toString(),
                  title: "New Learning Path",
                  description: "A new learning path",
                  courses: [],
                  enrolledUsers: 0,
                  completionRate: 0,
                  estimatedHours: 0,
                  skillsGained: [],
                },
              ])
            }
          >
            <Plus className="h-4 w-4 mr-2" /> Create Path
          </Button>
        </div>

        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            {paths.map((path) => (
              <Card key={path.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{path.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {path.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newTitle = window.prompt(
                          "Enter new title",
                          path.title,
                        );
                        if (newTitle) {
                          setPaths(
                            paths.map((p) =>
                              p.id === path.id ? { ...p, title: newTitle } : p,
                            ),
                          );
                        }
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setPaths(paths.filter((p) => p.id !== path.id))
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {path.enrolledUsers} enrolled
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{path.estimatedHours} hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {path.skillsGained.length} skills
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Completion Rate</span>
                    <span>{path.completionRate}%</span>
                  </div>
                  <Progress value={path.completionRate} />
                </div>

                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-sm font-medium">Course Sequence</h5>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedPathId(path.id);
                        setShowCourseSearch(true);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Course
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {path.courses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between p-2 bg-accent rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {course.order}.
                          </span>
                          <span className="text-sm">{course.title}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setPaths(
                              paths.map((p) => {
                                if (p.id === path.id) {
                                  return {
                                    ...p,
                                    courses: p.courses.filter(
                                      (c) => c.id !== course.id,
                                    ),
                                  };
                                }
                                return p;
                              }),
                            );
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <Dialog open={showCourseSearch} onOpenChange={setShowCourseSearch}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add Course to Path</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {mockCourses
                  .filter(
                    (course) =>
                      course.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      course.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()),
                  )
                  .map((course) => (
                    <Card key={course.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h4 className="font-medium">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {course.description}
                          </p>
                          <div className="flex gap-2">
                            {course.skills.map((skill) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          onClick={() => {
                            setPaths(
                              paths.map((p) => {
                                if (p.id === selectedPathId) {
                                  const newSkills = [
                                    ...new Set([
                                      ...p.skillsGained,
                                      ...course.skills,
                                    ]),
                                  ];
                                  return {
                                    ...p,
                                    courses: [
                                      ...p.courses,
                                      {
                                        id: course.id,
                                        title: course.title,
                                        order: p.courses.length + 1,
                                      },
                                    ],
                                    skillsGained: newSkills,
                                    estimatedHours:
                                      p.estimatedHours + course.duration,
                                  };
                                }
                                return p;
                              }),
                            );
                            setShowCourseSearch(false);
                          }}
                        >
                          Add to Path
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LearningPathManagement;
