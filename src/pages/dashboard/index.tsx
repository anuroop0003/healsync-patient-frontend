import { useGetDashboard } from "@/services/query/dashboard/dashboard.api";
import { Loader2 } from "lucide-react";
import BookToken from "./components/book-token";
import BottomNav from "./components/botton-nav";
import CurrentToken from "./components/current-token";
import Header from "./components/header";
import RecordsServices from "./components/records-services";

const Dashboard = () => {
  const { data, isFetching } = useGetDashboard();

  if (isFetching)
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );

  return (
    <div className="flex-1 bg-background flex flex-col overflow-auto">
      <Header />
      <div className="flex-1 px-3 space-y-12 mb-6">
        <CurrentToken />
        <BookToken />
        <RecordsServices />
      </div>
      <BottomNav />
    </div>
  );
};

export default Dashboard;
