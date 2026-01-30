import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TextView from "./components/view/text-view";
import VoiceView from "./components/view/voice-view";
import { useRecorder } from "./hooks/use-recorder";

export default function ChatPage() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const [view, setView] = useState<"voice" | "text">("voice");
  const [messages, setMessages] = useState<any[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI health assistant. How can I help you today?",
    },
  ]);

  const {
    recording,
    transcript,
    setTranscript,
    startRecording,
    stopRecording,
  } = useRecorder();

  // Switch to text view if code is present in URL
  useEffect(() => {
    if (code) {
      setView("text");
    }
  }, [code]);

  if (view === "text") {
    return (
      <TextView
        onBack={() => setView("voice")}
        messages={messages}
        setMessages={setMessages}
        code={code ?? undefined}
      />
    );
  }

  return (
    <VoiceView
      recording={recording}
      transcript={transcript}
      setTranscript={setTranscript}
      startRecording={startRecording}
      stopRecording={stopRecording}
      onSwitch={() => setView("text")}
      messages={messages}
      setMessages={setMessages}
    />
  );
}
