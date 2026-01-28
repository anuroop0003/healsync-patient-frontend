import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-3 py-6">
      <div className="flex-1 flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarFallback className="text-xs">SJ</AvatarFallback>
        </Avatar>
        <div className="space-y-0.5">
          <p className="text-sm font-bold">Sarah Jenkins</p>
          <p className="text-xs text-muted-foreground font-semibold">
            ID: PAT-9421-B
          </p>
        </div>
      </div>
      <Button variant="outline" size="icon">
        <Bell className="h-4 w-4" />
      </Button>
    </header>
  );
};

export default Header;
