import path from "path";
import { readFile } from "fs/promises";
import Image from "./Image.js";
import Project from "./Project.js";

const parseImageData = async () => {
  try {
    const data = path.join(
      process.cwd(),
      "..",
      "..",
      "..",
      "backup",
      "data.json"
    );
    const imgData = await readFile(data, "utf8");
    return JSON.parse(imgData);
  } catch (error) {
    throw error;
  }
};

export const setupDatabase = async () => {
  try {
    const imgData = await parseImageData();

    Project.hasMany(Image, { foreignKey: "projectId" });
    Image.belongsTo(Project, { foreignKey: "projectId" });

    await Project.sync({ force: true });
    await Image.sync({ force: true });

    let prevId = null;
    for (let image of imgData) {
      if (prevId !== image.projectId) {
        await Project.create();
        prevId = image.projectId;
      }
    }

    await Image.bulkCreate(imgData);

    console.error("[Setup Test Database]: setup successfully completed.");
  } catch (error) {
    console.error("[Setup Test Database]: Unable to setup database:", error);
  }
};

(async () => {
  await setupDatabase();
})();

export { Image, Project };
