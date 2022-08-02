import { Op } from "sequelize";
import { Image } from "../models/index.js";
import { isEmpty, isPid } from "../util/validators.js";

//--------------------------------------------------------------------------------------
// fetchByDate
//--------------------------------------------------------------------------------------

const searchByDate = async (fileName, year, month) => {
  return await Image.findAll({
    where: {
      year: +year,
      month: +month,
      originalFileName: {
        [Op.like]: `%${fileName}%`,
      },
    },
    attributes: ["format", "url", "id", "projectId"],
    order: [["createdAt", "DESC"]],
    raw: true,
  });
};

//--------------------------------------------------------------------------------------
// fetchLastUploaded
//--------------------------------------------------------------------------------------

let count = 1;

const DEFAULT_IMG_LIMIT = 4;

const enqueue = (images, newImage) => {
  if (isEmpty(images) && isEmpty(newImage)) return;

  if (images.length > newImage.length) {
    for (let i = 0; i < images.length; ++i) {
      if (newImage[i] && newImage[i].id !== images[i].id) {
        images = [...images, newImage[i]];
      }
    }
  } else {
    for (let i = 0; i < newImage.length; ++i) {
      if (images[i] && newImage[i].id !== images[i].id) {
        images = [...images, newImage[i]];
      }
    }
  }

  return images;
};

const fetchLastUploaded = async (projectId, notify, limit) => {
  let images = [];

  const { withQueue, notifyOne, notifyAll } = notify;

  if (isPid(projectId)) {
    images = await Image.findAll({
      where: { projectId: +projectId },
      attributes: ["format", "url", "id", "projectId"],
      order: [["createdAt", "DESC"]],
      limit: limit ? limit : DEFAULT_IMG_LIMIT,
      raw: true,
    });

    if (isEmpty(images) && Boolean(notifyOne)) {
      count = 1;
      throw new Error(`Deleted all images of project ${projectId}.`);
    }

    if (Boolean(withQueue)) {
      const newImages = await Image.findAll({
        attributes: ["format", "url", "id", "projectId"],
        order: [["createdAt", "DESC"]],
        raw: true,
        limit: count++,
        offset: images.length > 0 ? images.length : 0,
      });

      images = enqueue(images, newImages);
    }
  } else {
    images = await Image.findAll({
      attributes: ["format", "url", "id", "projectId"],
      order: [["createdAt", "DESC"]],
      raw: true,
      limit: limit ? limit : DEFAULT_IMG_LIMIT,
    });

    if (isEmpty(images) && Boolean(notifyAll)) {
      throw new Error(
        `You probably have not uploaded any images yet, or you have deleted all projects, if not, 
         try to search by date and file name in the appropriate fields above.`
      );
    }
  }

  return images;
};

export const fetchByDate = async (data, notify) => {
  const { year, month, fileName, projectId } = data;

  if (fileName && fileName !== "undefined" && year && month) {
    return await searchByDate(fileName, year, month);
  }

  return await fetchLastUploaded(projectId, notify);
};

//--------------------------------------------------------------------------------------
// fetchImages
//--------------------------------------------------------------------------------------

export const fetchImages = async (limit) => {
  return await Image.findAndCountAll({
    attributes: {
      exclude: ["updatedAt", "year", "month"],
    },
    order: [["createdAt", "DESC"]],
    limit: limit ? limit : 10,
    raw: true,
  });
};

//--------------------------------------------------------------------------------------
// deleteImageById
//--------------------------------------------------------------------------------------

export const deleteImageById = async (id) => {
  await Image.destroy({
    where: {
      id,
    },
  });
};

//--------------------------------------------------------------------------------------
// deleteImageByUrl
//--------------------------------------------------------------------------------------

export const deleteImageByUrl = async (imageUrl) => {
  await Image.destroy({
    where: {
      url: imageUrl,
    },
  });
};
