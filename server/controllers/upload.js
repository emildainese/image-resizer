import { transformData } from "../util/transform.js";
import { Image, Project } from "../models/index.js";

//-----------------------------------------------------------

export const postImage = async (req, res, next) => {
  const { file } = req;
  const { imagesData } = req.body;

  if (!file || !imagesData) {
    return next(new Error("Please provide a valid image file."));
  }

  try {
    const { id } = await Project.create({ raw: true });
    const projectData = transformData(imagesData, id);
    await Image.bulkCreate(projectData);

    res.status(200).json({
      message: `Image ${file.originalname} succesfully uploaded and optimized.`,
      images: imagesData,
      projectId: id,
    });
  } catch (error) {
    return next(new Error(error.message || `Could not upload images.`));
  }
};
