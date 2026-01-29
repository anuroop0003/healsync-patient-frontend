import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Circle, Keyboard, Loader2, Mic, Square } from "lucide-react";
import { useCallback, useRef, useState } from "react";

const Chat = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  /* ---------------- Helpers ---------------- */

  const cleanupMedia = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    mediaRecorderRef.current = null;
    chunksRef.current = [];
  }, []);

  const simulateTranscription = useCallback(() => {
    setIsProcessing(true);

    setTimeout(() => {
      setTranscript("I have fever and headache since last night.");
      setIsProcessing(false);
    }, 1500);
  }, []);

  /* ---------------- Recording Logic ---------------- */

  const startRecording = useCallback(async () => {
    try {
      setTranscript("");
      chunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });

        simulateTranscription();

        // Optional: download
        const url = URL.createObjectURL(audioBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `symptom-record-${Date.now()}.webm`;
        a.click();
        URL.revokeObjectURL(url);

        cleanupMedia();
      };

      recorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
    }
  }, [cleanupMedia, simulateTranscription]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  }, []);

  const handleMicClick = () => {
    recording ? stopRecording() : startRecording();
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="flex-1 bg-background flex flex-col px-4 py-8 text-center space-y-8 select-none max-w-md mx-auto">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">
          {recording ? "Listening to you..." : "Describe your symptoms"}
        </h1>
        <p className="text-muted-foreground text-sm mt-2">
          To book your clinical token
        </p>
      </header>

      {/* Transcription */}
      <div
        className={cn(
          "w-full min-h-32 p-6 rounded-3xl border-2 transition-all duration-500 flex items-center justify-center text-lg shadow-inner",
          recording
            ? "bg-secondary/50 border-primary animate-pulse"
            : "bg-secondary border-transparent",
        )}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">
              Converting speech...
            </span>
          </div>
        ) : (
          <span
            className={cn(
              transcript
                ? "text-foreground font-medium"
                : "text-muted-foreground",
            )}
          >
            {transcript || "Tap the mic to start speaking"}
          </span>
        )}
      </div>

      {/* Mic Button */}
      <div className="relative flex items-center justify-center py-10">
        {recording && (
          <>
            <div className="absolute size-32 rounded-full border border-primary/30 animate-ping" />
            <div className="absolute size-48 rounded-full border border-primary/10 animate-[ping_3s_linear_infinite]" />
          </>
        )}

        <Button
          size="icon"
          onClick={handleMicClick}
          disabled={isProcessing}
          className={cn(
            "relative z-10 size-28 rounded-full shadow-2xl transition-all active:scale-95",
            recording
              ? "bg-destructive hover:bg-destructive/90"
              : "bg-primary hover:bg-primary/90",
          )}
        >
          {recording ? (
            <Square className="size-10 text-white fill-white" />
          ) : (
            <Mic className="size-10 text-white" />
          )}
        </Button>
      </div>

      <footer className="flex flex-col items-center gap-6 mt-auto">
        <Badge
          variant="outline"
          className="gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
        >
          <Circle
            className={cn(
              "size-2 fill-current",
              recording ? "text-destructive" : "text-green-500",
            )}
          />
          {recording ? "Recording Live" : "AI System Ready"}
        </Badge>

        {!recording && (
          <Button variant="ghost" className="text-muted-foreground gap-2">
            <Keyboard className="size-4" />
            Type manually
          </Button>
        )}
      </footer>
    </div>
  );
};

export default Chat;
