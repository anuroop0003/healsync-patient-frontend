import { useGetDashboard } from "@/services/query/dashboard/dashboard.api";
import { Loader2 } from "lucide-react";
import ABHACard from "./components/abha-card";
import BookToken from "./components/book-token";
import CurrentToken from "./components/current-token";
import Header from "./components/header";
import RecordsServices from "./components/records-services";

const Dashboard = () => {
  const { isFetching, data } = useGetDashboard();

  if (isFetching || !data)
    return (
      <div className="h-full flex flex-col items-center justify-center bg-background">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );

  return (
    <div className="flex-1 bg-background flex flex-col overflow-auto">
      <Header name={data.data.name} />
      <div className="flex-1 px-3 space-y-12 mb-6">
        {data.data.token ? (
          <CurrentToken data={data.data.token} />
        ) : (
          <ABHACard data={data.data.abha} />
        )}
        <BookToken />
        <RecordsServices />
      </div>
    </div>
  );
};

export default Dashboard;
