import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircleSmall, Clock, Stethoscope } from "lucide-react";

const CurrentToken = () => {
  return (
    <Card className="rounded-3xl bg-linear-to-br from-black to-neutral-900 text-white">
      <CardHeader>
        <CardTitle className="uppercase text-xs text-muted-foreground tracking-wider">
          Current Token
        </CardTitle>
        <CardDescription className="text-4xl text-white font-bold">
          A-104
        </CardDescription>
        <CardAction>
          <Badge className="uppercase flex items-center border-emerald-300 bg-emerald-50 text-emerald-700 leading-snug">
            <CircleSmall className="fill-emerald-700" />
            in queue
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <Stethoscope />
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">
              Consulting Physician
            </p>
            <p className="text-sm font-medium">Doctor Jenkins</p>
          </div>
        </div>
        <Separator className="bg-white/20" />
        <div className="flex justify-between text-xs">
          <span className="flex items-center gap-1">
            <CircleSmall className="fill-emerald-500 text-emerald-500" />
            Now Serving A-101
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            12 min
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentToken;
