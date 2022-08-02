import Image from "./Image.js";
import Project from "./Project.js";

//--------------------------------------------------------------------------------------
// Data Flow: Model Definition > Association > Sincronization
//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
// Define Association:
//--------------------------------------------------------------------------------------

Project.hasMany(Image, {
  onDelete: "CASCADE",
  foreignKey: "projectId",
});
Image.belongsTo(Project, { foreignKey: "projectId" });

//--------------------------------------------------------------------------------------
// Sync Models:
//--------------------------------------------------------------------------------------

(async () => {
  await Project.sync({ alter: false, force: false });
  await Image.sync({ alter: false, force: false });
})();

export { Image, Project };
