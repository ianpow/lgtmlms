import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  BookOpen,
  BarChart2,
  Settings,
  Compass,
  Users,
  MessageSquare,
  Home,
  Trophy,
  Video,
  Brain,
} from "lucide-react";

interface SidebarProps {
  className?: string;
  activeItem?: string;
  isAdmin?: boolean;
  onNavigate?: (item: string) => void;
}

const menuItems = [
  { id: "/", label: "Home", icon: Home },
  { id: "/courses", label: "Your Courses", icon: BookOpen },
  { id: "/progress", label: "Progress", icon: BarChart2 },
  { id: "/discover", label: "Discover", icon: Compass },
  { id: "/community", label: "Community", icon: Users },
  { id: "/discussions", label: "Discussions", icon: MessageSquare },
  { id: "/gamification", label: "Awards", icon: Trophy },
  { id: "/virtual-classroom", label: "Virtual Class", icon: Video },
  { id: "/quiz", label: "Quiz", icon: Brain },
  { id: "/profile", label: "Profile", icon: Settings },
  { id: "/admin", label: "Admin", icon: Settings, adminOnly: true },
];

const Sidebar = ({ className = "", isAdmin = false }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeItem = location.pathname;
  return (
    <div
      className={cn(
        "w-[250px] h-full bg-white border-r flex flex-col",
        className,
      )}
    >
      <div className="p-6">
        {localStorage.getItem("platformLogo") ? (
          <img
            src={localStorage.getItem("platformLogo")}
            alt="Platform logo"
            className="max-h-[40px] w-auto"
          />
        ) : (
          <h2 className="text-2xl font-bold text-primary">LMS Platform</h2>
        )}
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2">
          {menuItems
            .filter((item) => !item.adminOnly || (item.adminOnly && isAdmin))
            .map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeItem === item.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-x-3",
                    activeItem === item.id && "bg-secondary",
                  )}
                  onClick={() => {
                    if (item.id === "/") {
                      window.location.href = "/";
                    } else {
                      navigate(item.id);
                    }
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
        </div>
      </ScrollArea>

      <div className="p-6 border-t">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="User avatar"
              className="h-8 w-8 rounded-full"
            />
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">Student</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
