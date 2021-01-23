const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    immutable: true,
  },
  cart: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Product",
  },
});

UserSchema.statics.findByName = async function (username) {
  return await this.findOne({ username });
};

module.exports = mongoose.model("User", UserSchema);
