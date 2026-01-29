import { Button } from "@/components/ui/button";
import { Circle, Download, FileText } from "lucide-react";

const TimelineItem = ({
  date,
  title,
  department,
  practitioner,
  description,
  file,
}: any) => (
  <div className="relative">
    <span className="absolute -left-7 top-0 z-10 flex size-6 items-center justify-center rounded-full bg-white">
      <Circle className="size-3 fill-primary text-primary" />
    </span>

    <div className="space-y-2 font-bold">
      <p className="text-xs text-muted-foreground font-semibold">{date}</p>
      <h4 className="font-semibold">{title}</h4>

      <div className="flex justify-between text-xs text-muted-foreground">
        <div>
          <p className="tracking-wider">Department</p>
          <p className="text-sm font-medium text-foreground">{department}</p>
        </div>
        <div className="text-right">
          <p className="tracking-wider">Practitioner</p>
          <p className="text-sm font-medium text-foreground">{practitioner}</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground font-medium">{description}</p>

      {file && (
        <Button variant="outline" size="sm" className="mt-2 gap-2 text-xs">
          <FileText className="h-4 w-4" />
          {file}
          <Download className="h-4 w-4 ml-auto" />
        </Button>
      )}
    </div>
  </div>
);

export default TimelineItem;
