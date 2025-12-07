import mongoose from 'mongoose'

const songSchema = mongoose.Schema({
    title : String,
    artist : String,
    Audio : String,
    mood : String
})

const songModel = mongoose.model('songs', songSchema)

export default songModel