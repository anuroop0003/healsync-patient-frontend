import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  FolderOpen,
  Home,
  MessageSquare,
  User,
  type LucideIcon,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const NavItem = ({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick: () => void;
}) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "flex flex-col items-center text-xs gap-1 cursor-pointer h-auto py-2",
        active
          ? "text-primary font-bold opacity-100"
          : "text-muted-foreground font-medium opacity-50",
      )}
      onClick={onClick}
    >
      <Icon className="size-5" />
      {label}
    </Button>
  );
};

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === `/${path}` ||
    location.pathname.startsWith(`/${path}/`);

  return (
    <nav className="fixed bottom-0 left-0 border-t bg-background flex items-center justify-around h-20 w-full px-2 pb-[env(safe-area-inset-bottom)]">
      <NavItem
        icon={Home}
        label="Home"
        active={isActive("dashboard")}
        onClick={() => navigate("/dashboard")}
      />
      <NavItem
        icon={MessageSquare}
        label="AI Chat"
        active={isActive("chat")}
        onClick={() => navigate("/chat")}
      />
      <NavItem
        icon={FolderOpen}
        label="Records"
        active={isActive("medical-history")}
        onClick={() => navigate("/medical-history")}
      />
      <NavItem
        icon={User}
        label="Profile"
        active={isActive("profile")}
        onClick={() => navigate("/profile")}
      />
    </nav>
  );
};

export default BottomNav;
