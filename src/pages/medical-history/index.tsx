import Header from "./components/header";
import Timeline from "./components/timeline";

const MedicalHistory = () => {
  return (
    <div className="relative flex-1 bg-background text-foreground overflow-auto">
      <Header />
      <Timeline />
    </div>
  );
};

export default MedicalHistory;
