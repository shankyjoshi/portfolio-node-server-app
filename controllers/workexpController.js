const WorkExperienceModel = require("../models/workexp");

const createWorkExperience = (workExperience) => WorkExperienceModel.create(workExperience);

const findWorkExperiences = () => WorkExperienceModel.find();

const findWorkExperience = (workExperienceId) => WorkExperienceModel.findOne({ _id: workExperienceId });

const updateWorkExperience = (workExperienceId, workExperience) => WorkExperienceModel.updateOne({ _id: workExperienceId }, { $set: workExperience });

const deleteWorkExperience = (workExperienceId) => WorkExperienceModel.deleteOne({ _id: workExperienceId });

const findAllWorkExperiences = async (req, res) => {
  const workExperiences = await findWorkExperiences();
  res.json(workExperiences);
};

const findOneWorkExperience = async (req, res) => {
  const workExperienceId = req.params.workExperienceId;
  const workExperience = await findWorkExperience(workExperienceId);
  res.json(workExperience);
};

const createNewWorkExperience = async (req, res) => {
  const newWorkExperience = await createWorkExperience(req.body);
  res.json(newWorkExperience);
};

const updateOneWorkExperience = async (req, res) => {
  const workExperienceId = req.params.workExperienceId;
  const workExperience = req.body;
  const updatedWorkExperience = await updateWorkExperience(workExperienceId, workExperience);
  res.json(updatedWorkExperience);
};

const removeWorkExperience = async (req, res) => {
  const workExperienceId = req.params.workExperienceId;
  const status = await deleteWorkExperience(workExperienceId);
  res.json(status);
};

const WorkExperienceController = (app) => {
  app.get("/api/workexperiences", findAllWorkExperiences);
  app.get("/api/workexperiences/:workExperienceId", findOneWorkExperience);
  app.post("/api/workexperiences", createNewWorkExperience);
  app.put("/api/workexperiences/:workExperienceId", updateOneWorkExperience);
  app.delete("/api/workexperiences/:workExperienceId", removeWorkExperience);
};

module.exports = WorkExperienceController;
