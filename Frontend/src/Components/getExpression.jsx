import { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import { getSongs } from "../axiosConfig";
import toast from "react-hot-toast";

export default function FaceExpression({setSongs}) {


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
      .catch((err) => toast.error(err));
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
      // console.log(maxExpression);
      toast.success(`Detected expression: ${maxExpression}`);

      await getSongs.get("/api/songs", {
        params: { mood: maxExpression }
      }).then((song) => {
        // console.log(song.data);
        setSongs(song.data.songs);
        toast.success(`Song recommended based on your mood!`);
      }).catch((err) => {
        // console.log("Error in fetching songs : ", err.message || err);
        toast.error('Error in fetching songs ', err.message || err);
      })

      

    } else {
      toast.error('Face not recognized! Please try again.try to move your face in proper lighting.');
      // console.log("Face not recognized!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-5 ">
      <video ref={videoRef} autoPlay muted className="w-40 md:w-60 rounded-2xl" />
      <button
        onClick={handleVideoPlay}
        className="h-fit text-white cursor-pointer  font-bold px-3 py-2 rounded-md bg-teal-800 hover:bg-teal-700 active:scale-95"
      >
        Detect Expression
      </button>
    </div>
  );
}
