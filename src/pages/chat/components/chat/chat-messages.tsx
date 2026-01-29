import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

interface Props {
  isPending: boolean;
  messages: any[];
}

export const ChatMessages = ({ isPending, messages }: Props) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!messages.length) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-muted-foreground">
        <h3 className="text-xl font-semibold text-foreground">
          Start Testing Your AI
        </h3>
        <p className="text-sm max-w-xs">
          Send a message to run your agent, tools, and knowledge base together
          in this studio.
        </p>
      </div>
    );
  }

  return (
    <div className="grid flex-1 auto-rows-min gap-3 px-4 overflow-auto">
      <div className="flex flex-col gap-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              "flex w-fit max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
              m.role === "user"
                ? "bg-primary text-primary-foreground ml-auto"
                : "bg-muted",
            )}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {m.content}
            </ReactMarkdown>
          </div>
        ))}

        {isPending && (
          <div className="flex w-fit items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm text-black">
            <Settings className="size-4 animate-spin" />
            <span className="animate-pulse">AI is running…</span>
          </div>
        )}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};
