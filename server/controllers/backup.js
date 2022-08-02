import path from "path";
import { writeFile } from "node:fs/promises";
import { Image } from "../models/index.js";

const data = path.join(process.cwd(), "backup", "data.json");

export const backupData = async (req, res, next) => {
  try {
    const images = await Image.findAll({ raw: true });
    await writeFile(data, JSON.stringify(images));
    res.status(201).json(images);
  } catch (error) {
    return next(new Error(error.message || "Error: could not backup data"));
  }
};
