const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: {
    type: Number,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  ip: {
    type: String,
  },
  role: {
    type: String,
  },
});

UserSchema.virtual("tokenPayload").get(() => {
  return {
    _id: this._id,
    role: this.role,
  };
});
UserSchema.plugin(AutoIncrement, { id: "user_seq" });
module.exports = User = mongoose.model("User", UserSchema);
