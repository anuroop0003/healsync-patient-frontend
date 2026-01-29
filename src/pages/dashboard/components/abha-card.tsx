import NHALogo from "@/assets/NHA Logo.svg";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { AbhaInfo } from "@/services/query/dashboard/dashboard.types";

const ABHACard = ({ data }: { data: AbhaInfo }) => {
  return (
    <Card className="rounded-3xl bg-linear-to-br from-black to-neutral-900 text-white">
      <CardHeader>
        <CardTitle className="uppercase text-xs text-muted-foreground tracking-wider">
          ABHA Card
        </CardTitle>
        <CardDescription className="text-xl text-white font-bold">
          {data.abha_number}
        </CardDescription>

        <CardAction>
          <img src={NHALogo} alt="NHA Logo" />
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            DOB: {data.day_of_birth}/{data.month_of_birth}/{data.year_of_birth}
          </span>
          <span>Gender: {data.gender === "M" ? "Male" : "Female"}</span>
        </div>
        <Separator className="bg-white/20" />
        <div>
          <p className="text-xs text-muted-foreground">ABHA Address</p>
          <p className="text-sm font-medium break-all">{data.abha_address}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ABHACard;
