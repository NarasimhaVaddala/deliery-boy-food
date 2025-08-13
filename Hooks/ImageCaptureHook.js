export const useImageCaptureHook = () => {
  const [hasCamera, setHasCamera] = useState(false);
  const [image, setImage] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null); // To store active stream for cleanup

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasCamera(true); // Show capture button
    } catch (err) {
      console.error("Error accessing camera: ", err);
      alert("Camera access denied or not available.");
    }
  };

  // Function to capture image from video
  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to data URL and save to state
      const imageDataUrl = canvas.toDataURL("image/png");
      setImage(imageDataUrl);
    }
  };

  // Optional: Stop camera if you want to turn it off after capture
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setHasCamera(false);
    setImage(null); // Reset image if needed
  };
};
