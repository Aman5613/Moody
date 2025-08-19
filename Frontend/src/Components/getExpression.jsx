import { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";

export default function FaceExpression() {
  const videoRef = useRef();

  const loadModels = async () => {
    const MODEL_URL = `${window.location.origin}/models`;
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  const handleVideoPlay = async () => {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      const maxExpression = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b
      );
      console.log(maxExpression);
      
      // console.log("Expressions:", detections[0].expressions);

    } else {
      console.log("Face not recognized!");
    }
  };

  return (
    <div className="flex justify-center items-center gap-5 mt-5">
      <video ref={videoRef} autoPlay muted className="h-fit w-50 rounded-2xl" />
      <button onClick={handleVideoPlay} className="h-fit text-white font-bold px-3 py-2 rounded-md bg-teal-800 hover:bg-teal-700 active:scale-95">
        Detect Expression
      </button>
    </div>
  );
}
