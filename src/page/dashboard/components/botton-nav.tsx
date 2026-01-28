import {
  FolderOpen,
  Home,
  MessageSquare,
  User,
  type LucideIcon,
} from "lucide-react";

const NavItem = ({
  icon: Icon,
  label,
  active,
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}) => {
  return (
    <div
      className={`flex flex-col items-center text-xs ${active ? "text-primary" : "text-muted-foreground"}`}
    >
      <Icon className="size-5" />
      <span>{label}</span>
    </div>
  );
};

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 border-t bg-background flex items-center justify-around">
      <NavItem icon={Home} label="Home" active />
      <NavItem icon={MessageSquare} label="AI Chat" />
      <NavItem icon={FolderOpen} label="Records" />
      <NavItem icon={User} label="Profile" />
    </nav>
  );
};

export default BottomNav;
