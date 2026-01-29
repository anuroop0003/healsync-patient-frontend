import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Circle, Keyboard, Mic } from "lucide-react";

interface VoiceViewProps {
  recording: boolean;
  transcript: string;
  startRecording: () => void;
  stopRecording: () => void;
  onSwitch: () => void;
}

const VoiceView = ({
  recording,
  transcript,
  startRecording,
  stopRecording,
  onSwitch,
}: VoiceViewProps) => {
  return (
    <div className="flex-1 bg-background flex flex-col px-3 py-6 text-center space-y-6 select-none">
      <h1 className="text-2xl font-semibold leading-snug tracking-wide">
        Describe your symptoms <br /> to book a token
      </h1>

      <div className="w-full min-h-30 p-4 rounded-2xl border transition-all duration-300 mb-8 flex items-center justify-center text-lg bg-secondary">
        {recording ? (
          <span className="animate-pulse italic">Listening...</span>
        ) : (
          <span
            className={transcript ? "text-foreground" : "text-muted-foreground"}
          >
            {transcript || "Tap and hold the mic to speak"}
          </span>
        )}
      </div>

      <div className="relative flex items-center justify-center my-12">
        {/* Animated Rings */}
        <div
          className={cn(
            "absolute size-32 rounded-full border animate-pulse",
            recording ? "border-destructive/20" : "border-primary/20",
          )}
        />
        <div
          className={cn(
            "absolute size-44 rounded-full border animate-pulse [animation-delay:0.5s]",
            recording ? "border-destructive/10" : "border-primary/10",
          )}
        />

        <Button
          size="icon"
          style={{
            touchAction: "none",
            WebkitTouchCallout: "none",
            userSelect: "none",
          }}
          className={cn(
            "relative z-10 size-24 rounded-full shadow-xl transition-all duration-75",
            recording ? "bg-destructive scale-105" : "bg-primary",
          )}
          onPointerDown={(e) => {
            e.preventDefault();
            startRecording();
          }}
          onPointerUp={stopRecording}
          onPointerCancel={stopRecording}
          onPointerLeave={stopRecording}
          onContextMenu={(e) => e.preventDefault()}
        >
          <Mic className={cn("size-8 text-white", recording && "scale-110")} />
        </Button>
      </div>

      <footer className="flex flex-col items-center gap-6 pb-6 mt-6">
        {!recording && (
          <Button
            variant="outline"
            size="lg"
            className="rounded-full gap-2"
            onClick={onSwitch}
          >
            <Keyboard className="size-5" /> Switch to Text
          </Button>
        )}

        <Badge variant="outline" className="gap-2 py-1">
          <Circle
            className={cn(
              "size-2 fill-green-500 text-green-500",
              recording && "fill-red-500 text-red-500",
            )}
          />
          {recording ? "Recording Audio..." : "AI Assistant Ready"}
        </Badge>
      </footer>
    </div>
  );
};

export default VoiceView;
