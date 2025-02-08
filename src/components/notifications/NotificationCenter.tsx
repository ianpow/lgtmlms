import React from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Bell, BookOpen, Award, MessageSquare } from "lucide-react";

export interface Notification {
  id: string;
  type: "course" | "achievement" | "message" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onNotificationClick: (id: string) => void;
}

const NotificationCenter = ({
  notifications = [],
  onNotificationClick,
}: NotificationCenterProps) => {
  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "course":
        return <BookOpen className="h-4 w-4" />;
      case "achievement":
        return <Award className="h-4 w-4" />;
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getBackgroundColor = (type: Notification["type"]) => {
    switch (type) {
      case "course":
        return "bg-blue-100";
      case "achievement":
        return "bg-green-100";
      case "message":
        return "bg-purple-100";
      default:
        return "bg-gray-100";
    }
  };

  const getIconColor = (type: Notification["type"]) => {
    switch (type) {
      case "course":
        return "text-blue-600";
      case "achievement":
        return "text-green-600";
      case "message":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card className="w-[380px] p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <span className="text-sm text-muted-foreground">
          {notifications.filter((n) => !n.read).length} unread
        </span>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="space-y-2">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-3 cursor-pointer transition-colors hover:bg-accent ${!notification.read ? "bg-accent/5" : ""}`}
              onClick={() => onNotificationClick(notification.id)}
            >
              <div className="flex gap-3">
                <div
                  className={`p-2 rounded-full ${getBackgroundColor(notification.type)} ${getIconColor(notification.type)}`}
                >
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{notification.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default NotificationCenter;
