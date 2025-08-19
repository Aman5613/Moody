const app = require("./src/app");
const connectToDB = require("./src/DB/db.connction");
const songRoute = require("./src/routers/song.router");
require('dotenv').config()

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