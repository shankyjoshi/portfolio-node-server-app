const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
});

const ProjectModel = mongoose.model("projects", projectSchema);

module.exports = ProjectModel;
