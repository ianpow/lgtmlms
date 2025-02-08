import React, { useState, useEffect, useRef } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Hand,
  MessageSquare,
  Users,
  Video,
  Mic,
  MicOff,
  VideoOff,
  Share,
  ScreenShare,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  role: "host" | "participant";
  handRaised: boolean;
  video: boolean;
  audio: boolean;
}

interface VirtualClassroomProps {
  sessionTitle: string;
  participants?: Participant[];
  messages?: Message[];
  onSendMessage: (message: string) => void;
  onRaiseHand: () => void;
  onLeaveSession: () => void;
}

const VirtualClassroom = ({
  sessionTitle = "New Session",
  participants: initialParticipants = [],
  initialMessages = [],
  onSendMessage,
  onRaiseHand,
  onLeaveSession,
}: VirtualClassroomProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [mediaState, setMediaState] = useState({
    video: false,
    audio: false,
    screen: false,
    stream: null as MediaStream | null,
  });
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: "host",
      name: "You (Host)",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=host",
      role: "host",
      handRaised: false,
      video: true,
      audio: true,
    },
    ...initialParticipants,
  ]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    requestMediaPermissions();
    return () => {
      if (mediaState.stream) {
        mediaState.stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const requestMediaPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setMediaState((prev) => ({
        ...prev,
        stream,
        video: true,
        audio: true,
      }));
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const toggleMedia = async (type: "video" | "audio") => {
    if (!mediaState.stream) return;

    const tracks = mediaState.stream.getTracks();
    const track = tracks.find((t) => t.kind === type);

    if (track) {
      track.enabled = !track.enabled;
      setMediaState((prev) => ({
        ...prev,
        [type]: track.enabled,
      }));
    }
  };

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = screenStream;
      }

      setMediaState((prev) => ({
        ...prev,
        screen: true,
      }));

      screenStream.getVideoTracks()[0].onended = () => {
        if (mediaState.stream && videoRef.current) {
          videoRef.current.srcObject = mediaState.stream;
        }
        setMediaState((prev) => ({
          ...prev,
          screen: false,
        }));
      };
    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  };

  const toggleParticipantAudio = (participantId: string) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === participantId ? { ...p, audio: !p.audio } : p)),
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          userId: "host",
          userName: "You (Host)",
          userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=host",
          content: newMessage,
          timestamp: new Date().toISOString(),
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 h-[600px]">
      <div className="col-span-3 space-y-4">
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{sessionTitle}</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowInviteDialog(true)}
              >
                <Share className="h-4 w-4 mr-2" /> Invite
              </Button>
              <Button variant="destructive" onClick={onLeaveSession}>
                Leave Session
              </Button>
            </div>
          </div>
        </Card>

        <Card className="flex-1 p-4 h-[400px] bg-black relative">
          <div className="relative w-full h-full flex items-center justify-center bg-black rounded-lg">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-contain rounded-lg aspect-video"
            />
            {mediaState.screen && (
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-4 right-4"
                onClick={() => {
                  if (mediaState.stream && videoRef.current) {
                    videoRef.current.srcObject = mediaState.stream;
                  }
                  setMediaState((prev) => ({
                    ...prev,
                    screen: false,
                  }));
                }}
              >
                Stop Sharing
              </Button>
            )}
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            <Button
              variant={mediaState.video ? "default" : "destructive"}
              size="sm"
              onClick={() => toggleMedia("video")}
            >
              {mediaState.video ? (
                <Video className="h-4 w-4" />
              ) : (
                <VideoOff className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant={mediaState.audio ? "default" : "destructive"}
              size="sm"
              onClick={() => toggleMedia("audio")}
            >
              {mediaState.audio ? (
                <Mic className="h-4 w-4" />
              ) : (
                <MicOff className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant={mediaState.screen ? "default" : "outline"}
              size="sm"
              onClick={startScreenShare}
            >
              <ScreenShare className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setParticipants((prev) =>
                  prev.map((p) =>
                    p.id === "host" ? { ...p, handRaised: !p.handRaised } : p,
                  ),
                );
                onRaiseHand();
              }}
            >
              <Hand className="h-4 w-4 mr-2" /> Raise Hand
            </Button>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-4 w-4" />
            <h3 className="font-medium">
              Participants ({participants.length})
            </h3>
          </div>
          <ScrollArea className="h-[200px]">
            <div className="space-y-2">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback>{participant.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{participant.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {participant.role}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {participant.id !== "host" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleParticipantAudio(participant.id)}
                      >
                        {participant.audio ? (
                          <Mic className="h-3 w-3 text-primary" />
                        ) : (
                          <MicOff className="h-3 w-3 text-destructive" />
                        )}
                      </Button>
                    )}
                    {!participant.video && (
                      <VideoOff className="h-3 w-3 text-muted-foreground" />
                    )}
                    {participant.handRaised && (
                      <Hand className="h-3 w-3 text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Card className="p-4 flex flex-col h-[300px]">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-4 w-4" />
            <h3 className="font-medium">Chat</h3>
          </div>

          <ScrollArea className="flex-1 mb-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.userAvatar} />
                    <AvatarFallback>{message.userName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{message.userName}</p>
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <Button type="submit">Send</Button>
          </form>
        </Card>
      </div>

      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Participants</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Session Link</Label>
              <div className="flex gap-2">
                <Input readOnly value={window.location.href} />
                <Button
                  onClick={() =>
                    navigator.clipboard.writeText(window.location.href)
                  }
                >
                  Copy
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Allow Camera</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label>Allow Microphone</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label>Allow Screen Sharing</Label>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VirtualClassroom;
