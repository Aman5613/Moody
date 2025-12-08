import mongoose from 'mongoose'

const songSchema = mongoose.Schema({
    title : String,
    artist : String,
    audio : String,
    mood : String
})

const songModel = mongoose.model('songs', songSchema)

export default songModel