const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  _id: {
    type: Number,
  },
  ownerId: {
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

TeamSchema.plugin(AutoIncrement, { id: "team_seq" });
module.exports = Team = mongoose.model("Team", TeamSchema);
