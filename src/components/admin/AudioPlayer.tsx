import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Card } from "../ui/card";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

import { AudioPlayerProps } from "@/types/admin";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  url,
  title,
  tracks = [],
  activeTrack,
  onTrackChange,
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (waveformRef.current && (url || activeTrack)) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#4f46e5",
        progressColor: "#818cf8",
        cursorColor: "#6366f1",
        barWidth: 2,
        barRadius: 3,
        cursorWidth: 1,
        height: 80,
        barGap: 3,
        normalize: true,
        backend: "WebAudio",
      });

      wavesurfer.current.load(url || activeTrack?.url || "");

      wavesurfer.current.on("ready", () => {
        setDuration(wavesurfer.current?.getDuration() || 0);
      });

      wavesurfer.current.on("audioprocess", () => {
        setCurrentTime(wavesurfer.current?.getCurrentTime() || 0);
      });

      wavesurfer.current.on("finish", () => {
        setIsPlaying(false);
      });

      return () => {
        wavesurfer.current?.destroy();
      };
    }
  }, [url, activeTrack]);

  const handlePlayPause = () => {
    if (!wavesurfer.current) return;

    if (isPlaying) {
      wavesurfer.current.pause();
    } else {
      wavesurfer.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (value: number) => {
    if (!wavesurfer.current) return;
    wavesurfer.current.setVolume(value);
    setVolume(value);
  };

  const handleMute = () => {
    if (!wavesurfer.current) return;
    wavesurfer.current.setVolume(isMuted ? volume : 0);
    setIsMuted(!isMuted);
  };

  return (
    <Card className="p-4 space-y-4">
      <div ref={waveformRef} />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handlePlayPause}>
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleMute}>
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            onValueChange={([value]) => handleVolumeChange(value)}
            max={1}
            step={0.1}
            className="w-24"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
    </Card>
  );
};

export default AudioPlayer;
