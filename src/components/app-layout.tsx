import BottomNav from "@/pages/dashboard/components/bottom-nav";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="h-dvh flex flex-col overflow-hidden">
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default AppLayout;
