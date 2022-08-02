import path from "path";
import fs, { existsSync } from "fs";
import { unlink, rmdir, readdir, access, stat } from "fs/promises";

const __dirname = path.resolve();

//-----------------------------------------------------------------------------------------
// Utility functions
//-----------------------------------------------------------------------------------------

const isEmptySync = (dir) => fs.readdirSync(dir).length === 0;

const isEmpty = async (dir) => (await readdir(dir)).length === 0;

const existSync = (dir) => fs.existsSync(dir);

const exist = async (dir) => await access(dir);

const isFileSync = (file) => fs.statSync(file).isFile();

const isFile = async (file) => (await stat(file)).isFile();

const isDirSync = (dir) => fs.statSync(dir).isDirectory();

export const isDir = async (dir) => (await stat(dir)).isDirectory();

//-----------------------------------------------------------------------------------------
// Remove files and dierectory at specific path. Syncronous and recursive version
//-----------------------------------------------------------------------------------------

export const removeDirectorySync = (imagePath, upTo = "img") => {
  try {
    if (existSync(imagePath)) {
      if (isFileSync(imagePath)) {
        fs.unlinkSync(imagePath);
      } else if (isDirSync(imagePath)) {
        const baseName = path.basename(imagePath);
        if (baseName === upTo) return;
        fs.rmdirSync(imagePath);
      }

      const folderPath = path.dirname(imagePath);
      if (existSync(folderPath) && isEmptySync(folderPath)) {
        removeDirectorySync(folderPath);
      }
    }
  } catch (err) {
    throw err;
  }
};

//-----------------------------------------------------------------------------------------
// Remove files and dierectory at specific path. Asyncronous and recursive version
//-----------------------------------------------------------------------------------------

export const removeDirectory = async (imagePath, upTo = "img") => {
  try {
    if (existSync(imagePath)) {
      if (isFileSync(imagePath)) {
        await unlink(imagePath);
      } else if (isDirSync(imagePath)) {
        const baseName = path.basename(imagePath);
        if (baseName === upTo) return;
        await rmdir(imagePath);
      }

      const folderPath = path.dirname(imagePath);
      if (existSync(folderPath) && isEmptySync(folderPath)) {
        removeDirectory(folderPath);
      }
    }
  } catch (err) {
    throw err;
  }
};

//-----------------------------------------------------------------------------------------
// Remove files and dierectory at specific path. Syncronous and ITERATIVE version
//-----------------------------------------------------------------------------------------

export const rmDirSync = (imgUrl, upTo = "img") => {
  const rest = imgUrl.match(
    /\/\d{4}\/\d{2}\/[a-z1-9]+\/\b[a-z\d-]+\b\.jpe?g|png$/gi
  )[0];

  const imagePath = path.join(__dirname, "upload", "img", rest);

  if (existSync(imagePath)) {
    let formatPath = path.dirname(imagePath);
    fs.unlinkSync(imagePath);
    while (
      existsSync(formatPath) &&
      isEmptySync(formatPath) &&
      path.basename(formatPath) !== upTo
    ) {
      fs.rmdirSync(formatPath);
      formatPath = path.dirname(formatPath);
    }
  }
};

// const monthFolder = path.dirname(formatPath);
// const yearFolder = path.dirname(monthFolder);
// fs.rmdirSync(folderPath);
// if (existSync(monthFolder) && isEmptySync(monthFolder)) {
//   fs.rmdirSync(monthFolder);
//   if (existSync(yearFolder) && isEmptySync(yearFolder)) {
//     fs.rmdirSync(yearFolder);
//   }
// }
