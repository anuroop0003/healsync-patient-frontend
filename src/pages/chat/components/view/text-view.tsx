import { Button } from "@/components/ui/button";
import { useChatMessage } from "@/services/query/chat/chat.api";
import { Mic } from "lucide-react";
import { useState } from "react";
import ChatInput from "../chat/chat-input";
import { ChatMessages } from "../chat/chat-messages";

interface TextViewProps {
  onBack: () => void;
  messages: any[];
  setMessages: (v: any) => void;
  code?: string;
}

const TextView = ({ onBack, messages, setMessages, code }: TextViewProps) => {
  const [input, setInput] = useState(code ? `Scanning code: ${code}` : "");

  const { mutateAsync: sendMessage, isPending } = useChatMessage();

  const handleSendMessage = async () => {
    if (!input.trim() || isPending) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev: any[]) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");

    try {
      const response = await sendMessage({
        message: currentInput,
        thread_id: "default-thread",
        // user_id: crypto.randomUUID(),
        is_audio: false,
      });

      if (response) {
        setMessages((prev: any[]) => [
          ...prev,
          {
            role: "assistant",
            content: response.message,
            type: response.type,
            token: "token" in response ? response.token : undefined,
            doctor_id: "doctor_id" in response ? response.doctor_id : undefined,
          },
        ]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev: any[]) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header with Back to Voice Button */}
      <header className="p-4 border-b flex justify-between items-center shrink-0">
        <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
          Chat Assistant
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
          onClick={onBack}
        >
          <Mic />
          Use Voice
        </Button>
      </header>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <ChatMessages isPending={isPending} messages={messages} />
      </div>

      {/* Input Area */}
      <footer className="p-4 bg-background/80 backdrop-blur-sm shrink-0">
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
