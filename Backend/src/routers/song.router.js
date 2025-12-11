import express from "express";
import multer from "multer";
import songModel from "../models/song.model.js";
import uploadFile from "../services/storage.service.js";
import detectEmotion from "../services/ai.service.js";
express().use(express.json());

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });  // muulter middleware for handling multipart/form-data

//  song ko database me add karne ke route hai
router.post("/addsong", upload.single("audio"), async (req, res) => {
  const { title, artist, mood } = req.body;
  const audio = req.file;
  if(!audio){
    return res.status(400).json({
      message: "Audio file is required",
      error: true,
      success: false,
    });
  }
  try {
    await uploadFile(audio)
      .then(async (resp) => {
        await songModel
          .create({
            title,
            artist,
            audio: resp.url,
            mood,
          })
          .then((song) => {
            return res.status(200).json({
              message: "Song added successfully!",
              song: song,
              error: false,
              success: true,
            });
          })
          .catch((err) => {
            return res.status(500).json({
              message: "Error in adding song" + (err?.message || err),
              error: true,
              success: false,
            });
          });
      })
      .catch((err) => {
        // console.log("Error in uploading file : ", err.message || err);
        return res.status(500).json({
          message: "Error in uploading file",
          error: err.message || err,
        });
      });

    // console.log(mood);

  } catch (error) {
    return res.status(500).json({
      message: "Error in adding song" + (error?.message || error),
      error: true,
      success: false,
    });
  }
});

// song ka mood, title and artist detect karne ke route hai
router.post("/uploadsong", upload.single("audio"), async (req, res) => {
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
      // console.log(resp?.candidates[0]?.content?.parts[0]);
      return res.status(200).json({
        message: "Mood detected successfully",
        mood: formatAIResponse(resp?.candidates[0]?.content?.parts[0].text),
      });
    })
    .catch((err) => {
      // console.log("Error in getting mood : ", err.message || err);
      return res.status(500).json({
        message: "Error in getting mood",
        error: err.message || err,
      });
    });

  //
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
