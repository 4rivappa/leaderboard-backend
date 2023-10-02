const mongoose = require("mongoose");

const leaderboardSixtySchema = new mongoose.Schema(
  {
    wpm: { type: String, required: true },
    raw: { type: String, required: true },
    acc: { type: Number, required: true },
    con: { type: Number, required: true },
    ts: { type: Number, required: true },
    uid: { type: String, required: true },
    r: { type: Number, required: true },
  },
  { 
    collection: "leaderboard60",
    versionKey: false,
  }
);

leaderboardSixtySchema.index({ uid: 1, ts: 1 }, { unique: true });

const LeaderboardSixty = mongoose.model(
  "monkeytype-leaderboard",
  leaderboardSixtySchema,
  "leaderboard60"
);

module.exports = LeaderboardSixty;