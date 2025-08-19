const express = require('express')
const songModel = require('../models/song.model')
const multer = require('multer')
const uploadFile = require('../services/storage.service')
express().use(express.json())

const router = express.Router()

const upload = multer({storage:multer.memoryStorage()});


//  song ko database me add karne ke route hai
router.post('/song',upload.single("audio") ,async (req, res) => {
    
    const{title, artist, mood} = req.body  // destructering


    const audio = await uploadFile(req.file)  // input liye audio file ko imagekit pe upload kar rhe hai

    // database me data ko add kar rhe hai
    await songModel.create({
        title,
        artist,
        "Audio" : audio.url,
        mood
    })

    res.status(200).json("Song added sucessfully!")
})

// song ko frontend pe show karne ke liye
router.get('/songs', async (req, res)=>{
    const{mood} = req.query;

    const songs = await songModel.find({
        mood : mood
    })

    res.status(200).json({
        'message' : 'Songs Fetched sucessfully!',
        'songs' : songs
    })
})

module.exports = router