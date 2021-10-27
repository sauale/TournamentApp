const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TournamentSchema = new Schema({
  id: {
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

module.exports = Tournament = mongoose.model("Tournament", TournamentSchema);
