const ProjectModel = require("../models/projects");

const createProject = (project) => ProjectModel.create(project);

const findProjects = () => ProjectModel.find();

const findProject = (projectId) => ProjectModel.findOne({ _id: projectId });

const updateProject = (projectId, project) =>
  ProjectModel.updateOne({ _id: projectId }, { $set: project });

const deleteProject = (projectId) => ProjectModel.deleteOne({ _id: projectId });

const findAllProjects = async (req, res) => {
  const projects = await findProjects();
  res.json(projects);
};

const findOneProject = async (req, res) => {
  const projectId = req.params.projectId;
  const project = await findProject(projectId);
  res.json(project);
};

const createNewProject = async (req, res) => {
  const newProject = await createProject(req.body);
  res.json(newProject);
};

const updateOneProject = async (req, res) => {
  const projectId = req.params.projectId;
  const project = req.body;
  const updatedProject = await updateProject(projectId, project);
  res.json(updatedProject);
};

const removeProject = async (req, res) => {
  const projectId = req.params.projectId;
  const status = await deleteProject(projectId);
  res.json(status);
};

const ProjectController = (app) => {
  app.get("/api/projects", findAllProjects);
  app.get("/api/projects/:projectId", findOneProject);
  app.post("/api/projects", createNewProject);
  app.put("/api/projects/:projectId", updateOneProject);
  app.delete("/api/projects/:projectId", removeProject);
};

module.exports = ProjectController;
