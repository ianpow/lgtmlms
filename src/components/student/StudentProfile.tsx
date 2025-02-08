import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Calendar, BookOpen, Clock, Upload } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";

interface Achievement {
  id: string;
  title: string;
  date: string;
  icon: string;
}

interface StudentProfileProps {
  isEditing?: boolean;
  student?: {
    name: string;
    email: string;
    avatar: string;
    joinDate: string;
    completedCourses: number;
    totalHours: number;
    achievements: Achievement[];
    currentCourses: Array<{
      id: string;
      title: string;
      progress: number;
      lastAccessed: string;
    }>;
    skills: Array<{
      name: string;
      level: number;
      lastAssessed: string;
    }>;
  };
}

const availableSkills = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Java",
  "SQL",
  "AWS",
  "Docker",
];

const StudentProfile = ({
  isEditing = false,
  student = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    joinDate: "2024-01-15",
    completedCourses: 5,
    totalHours: 47,
    skills: [
      { name: "React", level: 4, lastAssessed: "2024-03-01" },
      { name: "TypeScript", level: 3, lastAssessed: "2024-02-15" },
      { name: "Node.js", level: 3, lastAssessed: "2024-02-01" },
    ],
    achievements: [
      {
        id: "1",
        title: "First Course Completed",
        date: "2024-02-01",
        icon: "🎓",
      },
      { id: "2", title: "Perfect Quiz Score", date: "2024-02-15", icon: "🎯" },
    ],
    currentCourses: [
      {
        id: "1",
        title: "Web Development Fundamentals",
        progress: 65,
        lastAccessed: "2024-03-15",
      },
      {
        id: "2",
        title: "Advanced JavaScript",
        progress: 32,
        lastAccessed: "2024-03-14",
      },
    ],
  },
}: StudentProfileProps) => {
  const [showSkillAssessment, setShowSkillAssessment] = React.useState(false);
  const [selectedSkill, setSelectedSkill] = React.useState("");
  const [skillLevel, setSkillLevel] = React.useState(1);
  const [assessmentNotes, setAssessmentNotes] = React.useState("");

  const [editedProfile, setEditedProfile] = React.useState({
    name: student.name,
    email: student.email,
    bio: "",
    location: "",
    interests: "",
    department: "",
    role: "",
    manager: "",
  });

  const handleSave = () => {
    console.log("Saving profile:", editedProfile);
    window.location.href = "/profile";
  };

  React.useEffect(() => {
    if (isEditing) {
      setEditedProfile({
        name: student.name,
        email: student.email,
        bio: "",
        location: "",
        interests: "",
        department: "",
        role: "",
        manager: "",
      });
    }
  }, [isEditing, student]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card className="p-6">
        <div className="flex items-start gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback>{student.name[0]}</AvatarFallback>
            </Avatar>
            {isEditing && (
              <div className="absolute -bottom-2 -right-2">
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const avatarUrl = reader.result as string;
                        setEditedProfile((prev) => ({
                          ...prev,
                          avatar: avatarUrl,
                        }));
                        // Update the student object in localStorage
                        const demoUser = JSON.parse(
                          localStorage.getItem("demoUser") || "{}",
                        );
                        demoUser.avatar = avatarUrl;
                        localStorage.setItem(
                          "demoUser",
                          JSON.stringify(demoUser),
                        );
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full h-8 w-8 p-0"
                  onClick={() =>
                    document.getElementById("avatar-upload")?.click()
                  }
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={editedProfile.name}
                    onChange={(e) =>
                      setEditedProfile((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) =>
                      setEditedProfile((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea
                    value={editedProfile.bio}
                    onChange={(e) =>
                      setEditedProfile((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                    placeholder="Tell us about yourself"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select
                    value={editedProfile.location}
                    onValueChange={(value) =>
                      setEditedProfile((prev) => ({
                        ...prev,
                        location: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="san-francisco">
                        San Francisco
                      </SelectItem>
                      <SelectItem value="new-york">New York</SelectItem>
                      <SelectItem value="london">London</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Interests</Label>
                  <Textarea
                    value={editedProfile.interests}
                    onChange={(e) =>
                      setEditedProfile((prev) => ({
                        ...prev,
                        interests: e.target.value,
                      }))
                    }
                    placeholder="What topics interest you?"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select
                    value={editedProfile.department}
                    onValueChange={(value) =>
                      setEditedProfile((prev) => ({
                        ...prev,
                        department: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select
                    value={editedProfile.role}
                    onValueChange={(value) =>
                      setEditedProfile((prev) => ({
                        ...prev,
                        role: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software-engineer">
                        Software Engineer
                      </SelectItem>
                      <SelectItem value="designer">Designer</SelectItem>
                      <SelectItem value="product-manager">
                        Product Manager
                      </SelectItem>
                      <SelectItem value="marketing-manager">
                        Marketing Manager
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Manager</Label>
                  <Input
                    value={editedProfile.manager}
                    onChange={(e) =>
                      setEditedProfile((prev) => ({
                        ...prev,
                        manager: e.target.value,
                      }))
                    }
                    placeholder="manager@company.com"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold">{student.name}</h1>
                    <p className="text-muted-foreground">{student.email}</p>
                  </div>
                  <Button
                    onClick={
                      isEditing
                        ? handleSave
                        : () => (window.location.href = "/profile/edit")
                    }
                  >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Joined {new Date(student.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {student.completedCourses} Courses Completed
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {student.totalHours} Hours of Learning
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList>
          <TabsTrigger value="courses">Current Courses</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          {student.currentCourses.map((course) => (
            <Card key={course.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{course.title}</h3>
                <span className="text-sm text-muted-foreground">
                  Last accessed:{" "}
                  {new Date(course.lastAccessed).toLocaleDateString()}
                </span>
              </div>
              <Progress value={course.progress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                {course.progress}% Complete
              </p>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          {student.achievements.map((achievement) => (
            <Card key={achievement.id} className="p-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                  {achievement.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Earned on {new Date(achievement.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">My Skills</h3>
                <Button
                  variant="outline"
                  onClick={() => setShowSkillAssessment(true)}
                >
                  Assess New Skill
                </Button>
              </div>

              {student.skills?.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <Badge>{skill.level}/5</Badge>
                  </div>
                  <Progress value={(skill.level / 5) * 100} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Last assessed:{" "}
                    {new Date(skill.lastAssessed).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showSkillAssessment} onOpenChange={setShowSkillAssessment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Skill Self-Assessment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Skill</Label>
              <Select onValueChange={(value) => setSelectedSkill(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a skill" />
                </SelectTrigger>
                <SelectContent>
                  {availableSkills.map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Current Level (1-5)</Label>
              <Slider
                min={1}
                max={5}
                step={1}
                value={[skillLevel]}
                onValueChange={([value]) => setSkillLevel(value)}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Expert</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                value={assessmentNotes}
                onChange={(e) => setAssessmentNotes(e.target.value)}
                placeholder="Add any relevant notes about your skill level..."
              />
            </div>

            <Button
              className="w-full"
              onClick={() => {
                // Handle skill assessment submission
                setShowSkillAssessment(false);
              }}
            >
              Submit Assessment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentProfile;
