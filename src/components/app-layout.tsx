import BottomNav from "@/pages/dashboard/components/bottom-nav";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      <main className="flex-1 min-h-0 relative">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default AppLayout;
