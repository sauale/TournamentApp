const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  region: {
    type: String,
  },
  members: [
    {
      idMember: {
        type: Number,
      },
      nameMember: {
        type: String,
      },
      rankMember: {
        type: String,
      },
    },
  ],
});

module.exports = Team = mongoose.model("Team", TeamSchema);
