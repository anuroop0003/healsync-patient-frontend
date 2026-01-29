import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const Header = ({ name }: { name: string }) => {
  return (
    <header className="flex items-center justify-between px-3 py-6">
      <div className="flex-1 flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarFallback className="text-xs">
            {name
              .trim()
              .split(/\s+/)
              .map((word) => word[0].toUpperCase())
              .join(" ")}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-bold">{name}</p>
      </div>
      <Button variant="outline" size="icon">
        <Bell />
      </Button>
    </header>
  );
};

export default Header;
