import { useState } from "react";
import TextView from "./components/view/text-view";
import VoiceView from "./components/view/voice-view";
import { useRecorder } from "./hooks/use-recorder";

export default function ChatPage() {
  const [view, setView] = useState<"voice" | "text">("voice");
  const { recording, transcript, startRecording, stopRecording } =
    useRecorder();

  if (view === "text") {
    return <TextView onBack={() => setView("voice")} />;
  }

  return (
    <VoiceView
      recording={recording}
      transcript={transcript}
      startRecording={startRecording}
      stopRecording={stopRecording}
      onSwitch={() => setView("text")}
    />
  );
}
