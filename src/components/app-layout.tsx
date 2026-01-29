import BottomNav from "@/pages/dashboard/components/bottom-nav";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-dvh flex flex-col">
      <Outlet />
      <BottomNav />
    </div>
  );
};

export default AppLayout;
