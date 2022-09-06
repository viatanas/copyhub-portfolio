import mongoose from "mongoose";

import User from "models/User";

const projectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  publishedAt: { type: Date, default: Date.now },
  title: String,
  client: String,
  industry: String,
  contentType: String,
  brief: String,
  images: [Object],
  page: Object,
});

module.exports =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
