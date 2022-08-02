import path from "path";
import {
  deleteImageById,
  deleteImageByUrl,
  fetchByDate,
  fetchImages,
} from "../query/images.js";
import { countProject } from "../query/projects.js";
import { removeDirectory } from "../util/rmdir.js";
import { isEmpty, isImageFile, isPid } from "../util/validators.js";

const debug = true;

const __dirname = path.resolve();

//-----------------------------------------------------------------------------------------
// getImagesByDate
//-----------------------------------------------------------------------------------------

export const getImagesByDate = async (req, res, next) => {
  const { year, month } = req.params;
  const { fileName, projectId, withQueue, notifyOne, notifyAll, limit } =
    req.query;

  if (!year || !month) {
    return next(new Error("You must provide a valid date"));
  }

  const dirPath = path.join(__dirname, "upload", "img", year, month);

  const data = { fileName, year, month, projectId };
  const notify = { withQueue, notifyOne, notifyAll };

  try {
    const images = await fetchByDate(data, notify, limit);

    // if (isEmpty(images) && isImageFile(fileName)) {
    //   console.log("First Branch");
    //   return res.status(404).json({
    //     success: false,
    //     error: `Project ${fileName} not found.`,
    //   });
    // } else if (isEmpty(images) && isImageFile(fileName) && isPid(projectId)) {
    //   console.log("Second Branch");
    //   return res.status(409).json({
    //     success: false,
    //     error: `No projects available, please upload some photos.`,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: `Project with ${images.length} resized and optimized images succesfuly fetched!`,
      images,
    });
  } catch (error) {
    return next(
      new Error(error.message || `Could not find directory ${dirPath}`)
    );
  }
};

//-----------------------------------------------------------------------------------------
// Fetch last 5 projects
//-----------------------------------------------------------------------------------------

export const getImages = async (req, res, next) => {
  const { limit } = req.query;

  try {
    const { count, rows } = await fetchImages(limit);

    const numProjects = await countProject();

    res.status(200).json({
      success: true,
      message: "Images succesfully fetched.",
      projects: rows,
      numImages: count,
      numProjects,
    });
  } catch (error) {
    return next(new Error(error.message || `Could not fetch images.`));
  }
};

//-----------------------------------------------------------------------------------------
// Delete image by id o url
//-----------------------------------------------------------------------------------------
const getPath = (imgUrl) => {
  const rest = imgUrl.match(
    /\/\d{4}\/\d{2}\/[a-z1-9]+\/\b[a-z\d-]+\b\.jpe?g|png$/gi
  )[0];
  const imagePath = path.join(__dirname, "upload", "img", rest);
  return imagePath;
};

export const deleteImage = async (req, res, next) => {
  const { id } = req.params;
  const { imgUrl } = req.query;

  if (!imgUrl) {
    return res.status(400).json({
      success: false,
      error: "Could not find image file",
    });
  }

  try {
    if (!id) {
      await deleteImageByUrl(imgUrl);
    } else {
      await deleteImageById(id);
    }

    await removeDirectory(getPath(imgUrl), "img");

    res.status(200).json({
      success: true,
      message: `Image ${id} succesfully deleted`,
    });
  } catch (error) {
    return next(
      new Error(error.message || `Could not delete image with id ${id}.`)
    );
  }
};
