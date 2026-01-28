import { Input } from "@/components/ui/input";
import { History, Search } from "lucide-react";

const Header = () => (
  <header className="sticky top-0 z-20 bg-background/80 backdrop-blur border-b px-3 py-6 space-y-3">
    <div className="flex items-center gap-3">
      <History className="size-5" />
      <h1 className="text-xl font-semibold">Medical History</h1>
    </div>

    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        className="pl-9"
        placeholder="Search checkups, doctors, or scans..."
      />
    </div>
  </header>
);

export default Header;
