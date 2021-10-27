const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  id: {
    type: Number,
  },
  tournamentId: {
    type: Number,
  },
  team1: {
    type: String,
  },
  team2: {
    type: String,
  },
  winner: {
    type: String,
  },
  matchLenght: {
    type: String,
  },
});

module.exports = Match = mongoose.model("Match", MatchSchema);
