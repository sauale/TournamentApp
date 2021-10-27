const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  _id: {
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
MatchSchema.plugin(AutoIncrement, { id: "match_seq" });
module.exports = Match = mongoose.model("Match", MatchSchema);
