import { Project } from "../models/index.js";

export const countProject = async () => {
  return await Project.count();
};
