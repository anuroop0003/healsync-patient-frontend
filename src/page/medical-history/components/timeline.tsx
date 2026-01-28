import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import TimelineItem from "./timeline-item";

const history = [
  {
    date: "OCT 12, 2023",
    title: "Annual Cardiovascular",
    department: "Cardiology",
    practitioner: "Dr. Elena Rodriguez",
    description:
      "Stable BP (120/80), prescribed continued dosage of Lisinopril.",
    file: "ECG_REPORT.PDF",
  },
  {
    date: "JULY 04, 2023",
    title: "Acute Sinusitis",
    department: "ENT",
    practitioner: "Dr. Sarah Miller",
    description:
      "Full recovery after 10-day antibiotic course. Sinus pressure cleared.",
    status: "Resolved",
  },
  {
    date: "JAN 18, 2023",
    title: "Dermatology Consult",
    department: "Dermatology",
    practitioner: "Dr. James Chen",
    description:
      "Benign mole removal on left shoulder. Pathology negative for malignancy.",
  },
  {
    date: "NOV 02, 2022",
    title: "Blood Work - Routine",
    department: "Pathology",
    practitioner: "Dr. Priya Sharma",
    description: "Lipid panel within normal range. Vitamin D deficiency noted.",
  },
];

const Timeline = () => (
  <ScrollArea className="h-[calc(100vh-120px)] px-3 py-6">
    <Card className="rounded-none border-0 shadow-none p-0">
      <CardContent className="p-0">
        <div className="relative pl-6 space-y-8">
          <div className="absolute left-2 top-0 h-full w-px bg-border" />
          {history.map((item, i) => (
            <TimelineItem key={i} {...item} />
          ))}
        </div>
      </CardContent>
    </Card>
  </ScrollArea>
);

export default Timeline;
