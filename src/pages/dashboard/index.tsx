import BookToken from "./components/book-token";
import BottomNav from "./components/botton-nav";
import CurrentToken from "./components/current-token";
import Header from "./components/header";
import RecordsServices from "./components/records-services";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 px-3 space-y-12">
        <CurrentToken />
        <BookToken />
        <RecordsServices />
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
