import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Header from "./components/header";
import Timeline from "./components/timeline";

const MedicalHistory = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Header />
      <Timeline />
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default MedicalHistory;
