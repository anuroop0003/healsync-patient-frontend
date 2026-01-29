// import { useEffect, useRef } from "react";

// const QrScan = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const streamRef = useRef<MediaStream | null>(null);

//   const stopCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }
//   };

//   const startScan = async () => {
//     // 1. Check browser support
//     if (!("BarcodeDetector" in window)) {
//       alert(
//         "Your browser doesn't support native scanning. Try Chrome or Safari.",
//       );
//       return;
//     }

//     try {
//       // 2. Request camera with mobile-specific constraints
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: {
//           facingMode: "environment",
//           width: { ideal: 1280 },
//           height: { ideal: 720 },
//         },
//       });

//       streamRef.current = stream;

//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         // 3. Essential for iOS PWA
//         videoRef.current.setAttribute("playsinline", "true");
//         await videoRef.current.play();
//       }

//       const barcodeDetector = new (window as any).BarcodeDetector({
//         formats: ["qr_code"],
//       });

//       const scanLoop = async () => {
//         // Stop loop if component unmounted or stream ended
//         if (!videoRef.current || !streamRef.current) return;

//         try {
//           const barcodes = await barcodeDetector.detect(videoRef.current);
//           if (barcodes.length > 0) {
//             const qrValue = barcodes[0].rawValue;
//             alert(`Success: ${qrValue}`);
//             stopCamera();
//             return;
//           }
//         } catch (e) {
//           // Sometimes the detector fails if the video frame is empty
//           console.log("Detecting...");
//         }

//         requestAnimationFrame(scanLoop);
//       };

//       scanLoop();
//     } catch (err) {
//       alert("Camera access denied. Please enable it in settings.");
//     }
//   };

//   useEffect(() => {
//     startScan();
//     return () => stopCamera();
//   }, []);

//   return (
//     <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
//       {/* Video fills the screen for a "native" look */}
//       <video
//         ref={videoRef}
//         className="absolute min-w-full min-h-full object-cover"
//         playsInline
//         muted
//       />

//       {/* Scanner UI Overlay */}
//       <div className="relative z-10 w-64 h-64 border-2 border-cyan-400 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.5)]">
//         <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 animate-scan-line" />
//       </div>

//       <p className="absolute bottom-10 z-10 text-white font-medium bg-black/50 px-4 py-2 rounded-full">
//         Align QR code within the frame
//       </p>
//     </div>
//   );
// };

// export default QrScan;

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
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Types for the Barcode Detector API (since TS might not have them yet)
interface Barcode {
  rawValue: string;
  format: string;
}

const QrScan = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const navigate = useNavigate();

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const startScan = useCallback(async () => {
    // 1. Check support with a clearer error
    if (!("BarcodeDetector" in window)) {
      setError(
        "Native scanning not supported. Use a modern browser like Chrome or Android Webview.",
      );
      return;
    }

    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 }, // Higher res for better QR detection
          height: { ideal: 1080 },
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        await videoRef.current.play();
      }

      const barcodeDetector = new (window as any).BarcodeDetector({
        formats: ["qr_code"],
      });

      const scanLoop = async () => {
        // Exit loop conditions
        if (!videoRef.current || !streamRef.current || !isScanning) return;

        try {
          // Check if video is actually playing and has data
          if (
            videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA
          ) {
            const barcodes: Barcode[] = await barcodeDetector.detect(
              videoRef.current,
            );
            if (barcodes.length > 0) {
              const result = barcodes[0].rawValue;
              handleSuccess(result);
              return; // Kill the loop on success
            }
          }
        } catch (e) {
          // Frame might be empty, ignore and continue
        }
        requestAnimationFrame(scanLoop);
      };

      requestAnimationFrame(scanLoop);
    } catch (err) {
      setError("Camera permission denied or device not found.");
      console.error(err);
    }
  }, [isScanning]);

  const handleSuccess = (value: string) => {
    setIsScanning(false);
    stopCamera();

    // Encode the value to handle special characters in the QR
    const encodedCode = encodeURIComponent(value);
    navigate(`/chat?code=${encodedCode}`);
  };

  useEffect(() => {
    startScan();
    return () => stopCamera();
  }, [startScan, stopCamera]);

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
