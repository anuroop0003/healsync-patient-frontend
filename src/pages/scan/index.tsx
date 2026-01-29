import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useScanner } from "./hooks/use-scanner";

const QrScan = () => {
  const navigate = useNavigate();

  const { videoRef, error, isScanning, stopCamera } = useScanner({
    onSuccess: (value) => {
      // Encode the value to handle special characters in the QR
      const encodedCode = encodeURIComponent(value);
      navigate(`/chat?code=${encodedCode}`);
    },
  });

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Camera Feed */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        playsInline
        muted
      />

      {/* Centered Scanner Card */}
      <div className="relative z-10 flex min-h-dvh items-center justify-center px-4">
        <Card className="w-full max-w-sm backdrop-blur border-none shadow-xl">
          <CardHeader className="text-center">
            <CardTitle>Scan QR Code</CardTitle>
            <CardDescription>Place the QR inside the frame</CardDescription>
          </CardHeader>

          <CardContent className="flex justify-center">
            <div
              className={cn(
                "relative size-64 rounded-xl overflow-hidden flex items-center justify-center",
                error ? "ring-2 ring-destructive" : "ring-2 ring-primary/60",
              )}
            >
              {/* Scan line */}
              {isScanning && !error && (
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/80 animate-[scan_2s_linear_infinite]" />
              )}

              {/* Error */}
              {error && (
                <p className="text-destructive text-sm text-center px-4 font-medium">
                  {error}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <p className="text-muted-foreground text-sm">
              {isScanning ? "Scanning…" : "Processing…"}
            </p>

            <Button
              className="w-30 cursor-pointer"
              onClick={() => {
                stopCamera();
                navigate("/dashboard");
              }}
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default QrScan;
