import path from 'path';
import { createDirTree } from '../lib/dirTree.js';

export const getDirectoryTree = (req, res, next) => {
  const targetDir = req.query.directory;
  if (!targetDir) {
    return next(new Error('Invalid directory name'));
  }
  const rootPath = path.join(path.resolve(), 'upload', targetDir);
  const dirTree = createDirTree(rootPath);
  res.status(200).json(dirTree);
};
