import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarClock,
  ChevronRight,
  FileText,
  type LucideIcon,
} from "lucide-react";

const OutlineFeature = ({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) => {
  return (
    <Button variant="outline" className="h-40 flex-col gap-3 rounded-3xl">
      <div className="size-14 rounded-full bg-muted/40 flex items-center justify-center">
        <Icon className="size-8" />
      </div>
      <p className="text-sm font-semibold">{label}</p>
    </Button>
  );
};

const RecordsServices = () => {
  return (
    <Card className="p-0 border-none shadow-none gap-3">
      <CardHeader className="p-0">
        <CardTitle className="uppercase text-sm text-muted-foreground tracking-wider">
          Records & Services
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 p-0">
        <OutlineFeature icon={FileText} label="Medical History" />
        <OutlineFeature icon={CalendarClock} label="Next Checkup" />

        <Button
          variant="outline"
          className="col-span-2 h-24 flex items-center gap-3 rounded-3xl px-6"
        >
          <div className="size-14 rounded-full bg-muted/40 flex items-center justify-center">
            <FileText className="size-8" />
          </div>
          <p className="text-sm font-semibold flex-1 text-left">
            Last Prescription
          </p>
          <span className="text-xs text-muted-foreground">Oct 12</span>
          <ChevronRight className="text-muted-foreground size-5" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecordsServices;
