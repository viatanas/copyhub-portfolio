import mongoose from "mongoose";

import Project from "models/Project";

const imageSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  url: String,
  title: String,
});

module.exports = mongoose.models.Image || mongoose.model("Image", imageSchema);
