const mongoose = require("mongoose");

const workExpSchema = new mongoose.Schema({
  company: { type: String },
  position: { type: String },
  description: { type: String },
  location: { type: String },
  employmentType: { type: String },
});

const WorkExperienceModel = mongoose.model("workexperiences", workExpSchema);

module.exports = WorkExperienceModel;
