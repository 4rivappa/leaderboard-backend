const express = require("express")
const profileRouter = require("./routes/profile");
const connectToMongoDB = require("./controllers/dbConnection");
const cors = require("cors");

const app = express()
require('dotenv').config();

app.use(cors());

async function connectToDatabase(){
    try {
        await connectToMongoDB(process.env.DB_URI);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
connectToDatabase()

app.use("/profile", profileRouter);

app.listen(4068)