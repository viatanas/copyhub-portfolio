import mongoose from "mongoose";

import Project from "models/Project";

const userSchema = new mongoose.Schema({
  firebaseId: String,
  name: String,
  username: String,
  email: String,
  profilePicture: String,
  location: String,
  header: String,
  bio: String,
  twitter: String,
  linkedin: String,
  services: Array,
  clients: Array,
  theme: { type: String, default: "mac-wallpaper" },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
