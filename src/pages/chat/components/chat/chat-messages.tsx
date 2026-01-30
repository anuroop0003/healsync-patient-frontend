import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  CircleSmall,
  Clock,
  Loader2,
  Settings,
  Stethoscope,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

interface Props {
  isPending: boolean;
  messages: any[];
}

const TokenMessage = ({ m }: { m: any }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer1 = setTimeout(() => setLoading(false), 1500);
    const timer2 = setTimeout(() => navigate("/dashboard"), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex w-full max-w-sm flex-col gap-2 rounded-2xl bg-muted p-6 animate-pulse border-2 border-dashed border-primary/20">
        <div className="flex items-center gap-2 text-primary font-medium">
          <Loader2 className="size-5 animate-spin" />
          <span>Generating Your Token...</span>
        </div>
        <div className="h-4 w-3/4 bg-primary/10 rounded" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm animate-in fade-in zoom-in duration-500">
      <div className="bg-muted px-3 py-2 rounded-lg text-sm text-muted-foreground italic">
        {m.content}
      </div>
      <Card className="rounded-3xl bg-linear-to-br from-black to-neutral-800 text-white shadow-xl border-none overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Stethoscope className="size-24 scale-150 rotate-12" />
        </div>
        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="uppercase text-[10px] text-muted-foreground tracking-widest font-bold">
            Token Generated Successfully
          </CardTitle>
          <div className="flex items-end gap-2 mt-1">
            <CardDescription className="text-2xl text-white font-bold tracking-wide">
              #{m.token}
            </CardDescription>
            <Badge className="mb-1.5 uppercase text-[9px] bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30">
              <CircleSmall className="fill-emerald-400 size-3 mr-0.5" />
              Confirmed
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 relative z-10">
          <Separator className="bg-white/10" />
          <div className="flex items-center gap-4">
            <div className="size-10 rounded-full bg-white/10 flex items-center justify-center">
              <Stethoscope className="size-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                Assigned Doctor ID
              </p>
              <p className="text-sm font-semibold text-primary-foreground">
                DR-{m.doctor_id}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400 tracking-wide">
              <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Processing at Counter 01
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground tracking-wide">
              <Clock className="size-3" />
              Est. wait: 15 mins
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const ChatMessages = ({ isPending, messages }: Props) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!messages.length) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-muted-foreground">
        <div className="size-16 rounded-3xl bg-muted flex items-center justify-center mb-2">
          <Settings className="size-8 text-primary/40 animate-[spin_4s_linear_infinite]" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">
          How can I help you today?
        </h3>
        <p className="text-sm max-w-xs transition-opacity duration-300">
          Describe your symptoms to get a clinic token or ask questions about
          your health.
        </p>
      </div>
    );
  }

  return (
    <div className="grid flex-1 auto-rows-min gap-3 px-4 overflow-x-hidden overflow-y-auto pb-4 pt-4">
      <div className="flex flex-col gap-6">
        {messages.map((m, i) => {
          if (m.type === "token_generated") {
            return <TokenMessage key={i} m={m} />;
          }

          return (
            <div
              key={i}
              className={cn(
                "flex w-fit max-w-[85%] flex-col gap-2 rounded-2xl px-4 py-3 text-sm transition-all duration-300",
                m.role === "user"
                  ? "bg-primary text-primary-foreground ml-auto rounded-tr-none shadow-md"
                  : "bg-muted rounded-tl-none",
              )}
            >
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                  {m.content}
                </ReactMarkdown>
              </div>
            </div>
          );
        })}

        {isPending && (
          <div className="flex w-fit items-center gap-3 rounded-2xl bg-muted px-4 py-3 text-sm text-foreground/80 animate-in fade-in slide-in-from-bottom-2">
            <Settings className="size-4 animate-spin text-primary" />
            <span className="font-medium">AI is thinking…</span>
          </div>
        )}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};
