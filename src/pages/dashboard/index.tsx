import BookToken from "./components/book-token";
import BottomNav from "./components/botton-nav";
import CurrentToken from "./components/current-token";
import Header from "./components/header";
import RecordsServices from "./components/records-services";

const Dashboard = () => {
  return (
    <div className="h-full bg-background flex flex-col">
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
