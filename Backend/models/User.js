const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, default: 0 },
  avatarUrl: { type: String },
});

// Explicitly use the collection 'leader_users'
module.exports = mongoose.model("User", userSchema, "leader_users");
