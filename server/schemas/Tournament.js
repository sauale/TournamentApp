const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const TournamentSchema = new Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
  },
  region: {
    type: String,
  },
  date: {
    type: String,
  },
  format: {
    type: String,
  },
  teamCount: {
    type: Number,
  },
  map: {
    type: String,
  },
  entryCost: {
    type: Number,
  },
  prizePool: {
    type: Number,
  },
});

TournamentSchema.plugin(AutoIncrement, { id: "tournament_seq" });
module.exports = Tournament = mongoose.model("Tournament", TournamentSchema);
