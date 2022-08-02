import path from "path";
import { createDirTree } from "../lib/dirtree.js";

export const getDirectoryTree = (req, res, next) => {
  const targetDir = req.query.dir;

  if (!targetDir) {
    return next(new Error("Invalid directory name"));
  }

  const rootPath = path.join(path.resolve(), "upload", targetDir);

  const dirTree = createDirTree(rootPath);

  res.status(200).json(dirTree);
};
