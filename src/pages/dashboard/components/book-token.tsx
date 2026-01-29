import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, QrCode, type LucideIcon } from "lucide-react";

const FeatureButton = ({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) => {
  return (
    <Button className="h-40 flex-col gap-3 rounded-3xl">
      <div className="size-14 rounded-full bg-white/10 flex items-center justify-center">
        <Icon className="size-8" />
      </div>
      <p className="text-sm font-semibold">{label}</p>
    </Button>
  );
};

const BookToken = () => {
  return (
    <Card className="p-0 border-none shadow-none gap-3">
      <CardHeader className="p-0">
        <CardTitle className="uppercase text-sm text-muted-foreground tracking-wider">
          Book New Token
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 p-0">
        <FeatureButton icon={MessageSquare} label="Chat & Book" />
        <FeatureButton icon={QrCode} label="Scan & Book" />
      </CardContent>
    </Card>
  );
};

export default BookToken;
