const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: String,
  password: String,
  role: String,
  token: String,
  permissions: [String],
});

const User = mongoose.model("users", UserSchema, "users");

module.exports = User;
