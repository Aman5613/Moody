import express from "express";
import multer from "multer";
import songModel from "../models/song.model.js";
import uploadFile from "../services/storage.service.js";
import detectEmotion from "../services/ai.service.js";
express().use(express.json());

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

//  song ko database me add karne ke route hai
router.post("/song", upload.single("audio"), async (req, res) => {
  // const{title, artist, mood} = req.body  // destructering

  const formatAIResponse = (responseText) => {
    // Remove markdown code block
    const cleaned = responseText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // Parse into real JSON
    return JSON.parse(cleaned);
  };

  // console.log(req.file);
  await detectEmotion(req.file.buffer)
    .then((resp) => {
    //   console.log(res);
      return res.status(200).json({
        message: "Mood detected successfully",
        mood: formatAIResponse(resp?.candidates[0]?.content?.parts[0].text),
      });
    })
    .catch((err) => {
    //   console.log("Error in getting mood : ", err.message || err);
      return res.status(500).json({
        message: "Error in getting mood",
        error: err.message || err,
      });
    });

//   await uploadFile(req.file).then(async (resp) => {
//     console.log(resp.url);
    
//   })
//   .catch((err) => {
//     console.log("Error in uploading file : ", err.message || err);
//     return res.status(500).json({
//       message: "Error in uploading file",
//       error: err.message || err,
//     });
//   })

  // console.log(mood);

  // database me data ko add kar rhe hai
  // await songModel.create({
  //     title,
  //     artist,
  //     "Audio" : audio.url,
  //     mood
  // })

//   res.status(200).json({
//     message: "Song added successfully!",
//     audio: audio,
//   });
});

// song ko frontend pe show karne ke liye
router.get("/songs", async (req, res) => {
  const { mood } = req.query;

  const songs = await songModel.find({
    mood: mood,
  });

  res.status(200).json({
    message: "Songs Fetched sucessfully!",
    songs: songs,
  });
});

export default router;
