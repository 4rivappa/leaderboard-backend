const mongoose = require("mongoose");

const leaderboardFifteenSchema = new mongoose.Schema(
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
    collection: "leaderboard15",
    versionKey: false,
  }
);

leaderboardFifteenSchema.index({ uid: 1, ts: 1 }, { unique: true });

const LeaderboardFifteen = mongoose.model(
  "LeaderboardFifteen",
  leaderboardFifteenSchema
);

module.exports = LeaderboardFifteen;