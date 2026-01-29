import BottomNav from "@/pages/dashboard/components/bottom-nav";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-background">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default AppLayout;
