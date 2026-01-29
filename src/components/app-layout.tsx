import BottomNav from "@/pages/dashboard/components/botton-nav";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-dvh pb-20">
      <Outlet />
      <BottomNav />
    </div>
  );
};

export default AppLayout;
