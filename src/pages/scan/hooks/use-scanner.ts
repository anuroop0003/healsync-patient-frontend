import { useCallback, useEffect, useRef, useState } from "react";

interface Barcode {
  rawValue: string;
  format: string;
}

export const useScanner = ({
  onSuccess,
}: {
  onSuccess: (value: string) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(true);

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
          width: { ideal: 1920 },
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
        if (!videoRef.current || !streamRef.current || !isScanning) return;

        try {
          if (
            videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA
          ) {
            const barcodes: Barcode[] = await barcodeDetector.detect(
              videoRef.current,
            );
            if (barcodes.length > 0) {
              const result = barcodes[0].rawValue;
              setIsScanning(false);
              stopCamera();
              onSuccess(result);
              return;
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
  }, [isScanning, stopCamera, onSuccess]);

  useEffect(() => {
    startScan();
    return () => stopCamera();
  }, [startScan, stopCamera]);

  return {
    videoRef,
    error,
    isScanning,
    setIsScanning,
    startScan,
    stopCamera,
  };
};
