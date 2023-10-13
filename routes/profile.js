const express = require("express")
const axios = require("axios")
const LeaderboardFifteen = require("../model/leaderboardFifteen")
const LeaderboardSixty = require("../model/leaderboardSixty")
const router = express.Router()

let fetch;
import("node-fetch")
    .then((module) => {
        fetch = module.default;
    })
    .catch((err) => {
        console.error("Error while importing node-fetch:", err);
    });

router.get("/:username", async (req, res) => {
    try {
        const fifteenSeconds = await LeaderboardFifteen.find({ uid: req.user_id });
        const sixtySeconds = await LeaderboardSixty.find({ uid: req.user_id });

        fifteenSeconds.sort((a, b) => parseInt(b.ts, 10) - parseInt(a.ts, 10));
        sixtySeconds.sort((a, b) => parseInt(b.ts, 10) - parseInt(a.ts, 10));

        const returnFifteen = fifteenSeconds.map((obj) => {
            return { wpm: obj.wpm, raw: obj.raw, acc: obj.acc, con: obj.con, ts: obj.ts, r: obj.r };
        });
        const returnSixty = sixtySeconds.map((obj) => {
            return { wpm: obj.wpm, raw: obj.raw, acc: obj.acc, con: obj.con, ts: obj.ts, r: obj.r };
        });

        res.json({message: "success", body:{ fifteen: returnFifteen, sixty: returnSixty }});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'error', error: 'An error occurred while fetching leaderboard' });
    }
})

router.param("username", async (req, res, next, username) => {
    req.user_id = username;
    next();
})
 
module.exports = router