import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Users, MessageSquare } from "lucide-react";

const CommunityPage = () => {
  const communities = [
    {
      id: "1",
      name: "React Developers",
      members: 1250,
      posts: 324,
      image: "https://api.dicebear.com/7.x/identicon/svg?seed=react",
      description:
        "A community for React developers to share knowledge and experiences",
      tags: ["React", "Frontend", "Web Development"],
    },
    {
      id: "2",
      name: "TypeScript Enthusiasts",
      members: 850,
      posts: 156,
      image: "https://api.dicebear.com/7.x/identicon/svg?seed=typescript",
      description: "Discussions about TypeScript best practices and tips",
      tags: ["TypeScript", "JavaScript", "Programming"],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Communities</h1>
        <Button>Create Community</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((community) => (
          <Card key={community.id} className="p-6 space-y-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={community.image} />
                <AvatarFallback>{community.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">{community.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {community.description}
                </p>
              </div>
            </div>

            <div className="flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {community.members}
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                {community.posts}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {community.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <Button className="w-full">Join Community</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
