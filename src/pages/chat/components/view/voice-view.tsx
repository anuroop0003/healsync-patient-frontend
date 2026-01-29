import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChatMessage } from "@/services/query/chat/chat.api";
import { Circle, Keyboard, Loader2, Mic } from "lucide-react";
import { useEffect } from "react";

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
  const { mutateAsync: sendMessage, isPending } = useChatMessage();

  // Handle sending transcript if it's generated (mocked in useRecorder for now)
  useEffect(() => {
    if (transcript && !recording) {
      const sendVoiceMessage = async () => {
        try {
          await sendMessage({
            message: transcript,
            thread_id: "default-thread",
            user_id: "default-user",
            is_audio: true,
          });
          // After success, we might want to switch to text view to see the response
          // or handle it here. For now, let's just log.
        } catch (error) {
          console.error("Failed to send voice message:", error);
        }
      };
      sendVoiceMessage();
    }
  }, [transcript, recording, sendMessage]);

  return (
    <div className="flex-1 bg-background flex flex-col px-4 py-8 text-center space-y-8 select-none justify-between">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight">
          Describe your symptoms <br /> to book a token
        </h1>
        <p className="text-muted-foreground">
          I'm here to help you find the right doctor.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-12">
        <div className="w-full max-w-sm p-8 rounded-3xl border-2 border-dashed transition-all duration-300 flex items-center justify-center text-xl bg-secondary/50 min-h-32">
          {recording ? (
            <div className="flex flex-col items-center gap-2">
              <span className="animate-pulse italic font-medium">
                Listening...
              </span>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="size-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s*i]"
                  />
                ))}
              </div>
            </div>
          ) : isPending ? (
            <div className="flex flex-col items-center gap-2 text-primary">
              <Loader2 className="size-6 animate-spin" />
              <span className="font-medium">Analyzing symptoms...</span>
            </div>
          ) : (
            <span
              className={cn(
                "leading-relaxed",
                transcript
                  ? "text-foreground font-medium"
                  : "text-muted-foreground",
              )}
            >
              {transcript || "Tap and hold the mic to speak"}
            </span>
          )}
        </div>

        <div className="relative flex items-center justify-center">
          {/* Animated Background Rings */}
          <div
            className={cn(
              "absolute size-32 rounded-full border-2 transition-all duration-500",
              recording
                ? "border-primary/40 scale-150 animate-ping"
                : "border-primary/10 scale-100",
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
              "relative z-10 size-24 rounded-full shadow-2xl transition-all duration-200 active:scale-95 cursor-pointer",
              recording
                ? "bg-destructive scale-110"
                : "bg-primary hover:scale-105",
            )}
            onPointerDown={(e) => {
              e.preventDefault();
              startRecording();
            }}
            onPointerUp={stopRecording}
            onPointerCancel={stopRecording}
            onPointerLeave={stopRecording}
            onContextMenu={(e) => e.preventDefault()}
            disabled={isPending}
          >
            <Mic
              className={cn("size-10 text-white", recording && "scale-110")}
            />
          </Button>
        </div>
      </div>

      <footer className="flex flex-col items-center gap-6">
        {!recording && !isPending && (
          <Button
            variant="outline"
            size="lg"
            className="rounded-full gap-2 px-8 border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer"
            onClick={onSwitch}
          >
            <Keyboard className="size-5" /> Switch to Text
          </Button>
        )}

        <Badge variant="outline" className="gap-2 py-1.5 px-4 font-medium">
          <Circle
            className={cn(
              "size-2 fill-green-500 text-green-500",
              recording && "fill-red-500 text-red-500",
            )}
          />
          {recording
            ? "Recording..."
            : isPending
              ? "AI is thinking..."
              : "AI Assistant Ready"}
        </Badge>
      </footer>
    </div>
  );
};

export default VoiceView;
