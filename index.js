const express = require("express")
const profileRouter = require("./routes/profile");
const connectToMongoDB = require("./controllers/dbConnection");
const cors = require("cors");

const app = express()
require('dotenv').config();

// app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    next();
});
  

async function connectToDatabase(){
    try {
        await connectToMongoDB(process.env.DB_URI);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
connectToDatabase()

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/', (req, res) => {
    res.send("API Home")
})

app.use("/profile", profileRouter);

app.listen(4068)