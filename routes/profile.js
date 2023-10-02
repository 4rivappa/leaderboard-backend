const express = require("express")
const axios = require("axios")
const LeaderboardFifteen = require("../model/leaderboardFifteen")
const LeaderboardSixty = require("../model/leaderboardSixty")
const router = express.Router()

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

        res.json({message: "success", body:{name: req.name, avatar: req.avatar, dId: req.dId, allTimeLbs: req.allTimeLbs, fifteen: returnFifteen, sixty: returnSixty }});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'error', error: 'An error occurred while fetching leaderboard' });
    }
})

router.param("username", async (req, res, next, username) => {
    try {
        const response = await axios.get(`https://api.monkeytype.com/users/${username}/profile`);

        if (response.status === 200) {
            const userData = response.data;
            const user_id = userData.data.uid;

            req.user_id = user_id;
            req.name = userData.data.name;
            req.avatar = userData.data.discordAvatar;
            req.dId = userData.data.discordId;
            req.allTimeLbs = userData.data.allTimeLbs;
            next();
        } else {
            res.status(response.status).send("Error fetching user data");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})
 
module.exports = router