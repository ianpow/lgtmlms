import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CommentSection from "./CommentSection";
import { MessageSquare, Search } from "lucide-react";

const DiscussionsPage = () => {
  const discussions = [
    {
      id: "1",
      userId: "user1",
      userName: "John Doe",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      content: "What are your thoughts on React Server Components?",
      timestamp: new Date().toISOString(),
      likes: 5,
      replies: [],
    },
    {
      id: "2",
      userId: "user2",
      userName: "Jane Smith",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      content:
        "Best practices for state management in large React applications?",
      timestamp: new Date().toISOString(),
      likes: 8,
      replies: [],
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Discussions</h1>
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" /> New Discussion
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input placeholder="Search discussions..." className="pl-10" />
      </div>

      <CommentSection
        comments={discussions}
        onAddComment={(content) => console.log("New comment:", content)}
        onLikeComment={(id) => console.log("Liked comment:", id)}
        onDeleteComment={(id) => console.log("Deleted comment:", id)}
      />
    </div>
  );
};

export default DiscussionsPage;
