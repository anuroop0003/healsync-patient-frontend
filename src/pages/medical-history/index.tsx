import Header from "./components/header";
import Timeline from "./components/timeline";

const MedicalHistory = () => {
  return (
    <div className="h-full bg-background text-foreground overflow-y-auto pb-6">
      <Header />
      <Timeline />
    </div>
  );
};

export default MedicalHistory;
