import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Circle, Keyboard, Mic } from "lucide-react";

const Chat = () => {
  return (
    <div className="h-full bg-background flex flex-col px-3 py-6">
      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-3xl font-semibold leading-snug tracking-wide">
          Describe your symptoms <br />
          to book a token
        </h1>
        <p className="text-base text-muted-foreground">
          Listening for voice input...
        </p>

        {/* Mic Animation */}
        <div className="relative flex items-center justify-center my-12">
          <div className="absolute size-32 rounded-full border border-primary/20 animate-pulse" />
          <div className="absolute size-44 rounded-full border border-primary/10 animate-pulse [animation-delay:0.5s]" />
          <Button
            size="icon"
            className="size-24 rounded-full shadow-xl hover:scale-105 active:scale-95 transition"
          >
            <Mic className="size-8" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex flex-col items-center gap-6 pb-6">
        <Button
          variant="outline"
          size="lg"
          className="leading-snug flex items-center gap-2 bg-muted text-primary font-bold tracking-wider cursor-pointer rounded-full"
        >
          <Keyboard />
          Switch to Text
        </Button>

        <Badge
          variant="outline"
          className="leading-snug uppercase flex items-center gap-2 bg-muted text-muted-foreground font-bold tracking-wider py-1"
        >
          <Circle className="size-2 fill-green-500 text-green-500" />
          AI Assistant Ready
        </Badge>
      </footer>
    </div>
  );
};

export default Chat;
