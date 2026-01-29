import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Circle, Keyboard, Mic } from "lucide-react";
import { useRef, useState } from "react";

const Chat = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recording, setRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");

  const startRecording = async () => {
    try {
      // 1. Get stream and setup recorder
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        console.log("Recorded audio ready:", audioBlob);

        // TEMP transcript
        setTranscript("I have fever and headache since last night.");

        // 🔽 Auto-download
        const url = URL.createObjectURL(audioBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "symptoms-recording.webm";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    // Only stop if the recorder is actually running
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  };

  return (
    <div className="flex-1 bg-background flex flex-col px-3 py-6 text-center space-y-6 select-none">
      <h1 className="text-2xl font-semibold leading-snug tracking-wide">
        Describe your symptoms <br />
        to book a token
      </h1>

      <div className="w-full min-h-30 p-3 rounded-2xl border transition-all duration-300 mb-8 flex items-center justify-center text-lg bg-secondary">
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
          // Disable default browser behaviors via inline style or the CSS class above
          style={{
            touchAction: "none",
            WebkitTouchCallout: "none",
            userSelect: "none",
          }}
          className={cn(
            "relative z-10 size-24 rounded-full shadow-xl transition-all duration-75 touch-none",
            recording ? "bg-destructive scale-105" : "bg-primary",
          )}
          onPointerDown={(e) => {
            e.preventDefault(); // Stop ghost clicks
            startRecording();
          }}
          onPointerUp={stopRecording}
          onPointerCancel={stopRecording}
          onPointerLeave={stopRecording}
          onContextMenu={(e) => e.preventDefault()} // 👈 Stop the right-click menu
        >
          <Mic className={cn("size-8 text-white", recording && "scale-110")} />
        </Button>
      </div>

      <footer className="flex flex-col items-center gap-6 pb-6 mt-6">
        {!recording && (
          <Button variant="outline" size="lg" className="rounded-full gap-2">
            <Keyboard /> Switch to Text
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

export default Chat;
