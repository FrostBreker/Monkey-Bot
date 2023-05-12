const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: String,
  username: String,
  profile_picture: String,
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);