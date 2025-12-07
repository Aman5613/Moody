import app from "./src/app.js"
import connectToDB from "./src/DB/db.connction.js";
import songRoute from "./src/routers/song.router.js"
import dotenv from 'dotenv'

dotenv.config();

const port = process.env.PORT || 4000

// app.use(express.json());

connectToDB();

app.use('/', songRoute)


app.get('/', (req,res) => [
    res.send("working fine!")
])


app.listen(port, () => {
    console.log('server is running on', port);
})