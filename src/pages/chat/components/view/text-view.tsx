import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { useState } from "react";
import ChatInput from "../chat/chat-input";
import { ChatMessages } from "../chat/chat-messages";

interface TextViewProps {
  onBack: () => void;
}

// Mock messages for illustration
const initialMessages = [
  {
    id: "1",
    sender: "bot",
    text: "Hello! I'm your AI health assistant. How can I help you today?",
    timestamp: new Date().toISOString(),
    isRead: true,
  },
];

const TextView = ({ onBack }: TextViewProps) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Logic for bot response would go here
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header with Back to Voice Button */}
      <header className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
          Chat Assistant
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="rounded-full gap-2 text-primary"
        >
          <Mic className="size-4" /> Use Voice
        </Button>
      </header>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto">
        <ChatMessages isPending={false} messages={messages} />
      </div>

      {/* Input Area */}
      <footer className="p-4 bg-background/80 backdrop-blur-sm">
        <ChatInput
          input={input}
          setInput={setInput}
          onSend={handleSendMessage}
        />
      </footer>
    </div>
  );
};

export default TextView;
