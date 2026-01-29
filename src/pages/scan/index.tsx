import { useEffect, useRef } from "react";

const QrScan = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const startScan = async () => {
    // 1. Check browser support
    if (!("BarcodeDetector" in window)) {
      alert(
        "Your browser doesn't support native scanning. Try Chrome or Safari.",
      );
      return;
    }

    try {
      // 2. Request camera with mobile-specific constraints
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // 3. Essential for iOS PWA
        videoRef.current.setAttribute("playsinline", "true");
        await videoRef.current.play();
      }

      const barcodeDetector = new (window as any).BarcodeDetector({
        formats: ["qr_code"],
      });

      const scanLoop = async () => {
        // Stop loop if component unmounted or stream ended
        if (!videoRef.current || !streamRef.current) return;

        try {
          const barcodes = await barcodeDetector.detect(videoRef.current);
          if (barcodes.length > 0) {
            const qrValue = barcodes[0].rawValue;
            alert(`Success: ${qrValue}`);
            stopCamera();
            return;
          }
        } catch (e) {
          // Sometimes the detector fails if the video frame is empty
          console.log("Detecting...");
        }

        requestAnimationFrame(scanLoop);
      };

      scanLoop();
    } catch (err) {
      alert("Camera access denied. Please enable it in settings.");
    }
  };

  useEffect(() => {
    startScan();
    return () => stopCamera();
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      {/* Video fills the screen for a "native" look */}
      <video
        ref={videoRef}
        className="absolute min-w-full min-h-full object-cover"
        playsInline
        muted
      />

      {/* Scanner UI Overlay */}
      <div className="relative z-10 w-64 h-64 border-2 border-cyan-400 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.5)]">
        <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 animate-scan-line" />
      </div>

      <p className="absolute bottom-10 z-10 text-white font-medium bg-black/50 px-4 py-2 rounded-full">
        Align QR code within the frame
      </p>
    </div>
  );
};

export default QrScan;
