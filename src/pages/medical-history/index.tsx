import Header from "./components/header";
import Timeline from "./components/timeline";

const MedicalHistory = () => {
  return (
    <div className="relative h-full bg-background text-foreground">
      <Header />
      <Timeline />
    </div>
  );
};

export default MedicalHistory;
