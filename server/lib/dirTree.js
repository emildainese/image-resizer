import fs from 'fs';
import path from 'path';

const isDirectory = (path) => fs.statSync(path).isDirectory();

const isFile = (path) => fs.statSync(path).isFile();

const hasFiles = (dirPath) => {
  const content = fs.readdirSync(dirPath);
  return content.some((data) => isFile(path.resolve(dirPath, data)));
};

const getFiles = (dirPath) => {
  const content = fs.readdirSync(dirPath);
  return content.filter((data) => data && isFile(path.resolve(dirPath, data)));
};

const hasChildsFolder = (root) => {
  const dirs = fs.readdirSync(root);
  if (dirs.length) {
    return dirs.some((dir) => {
      const dirPath = path.resolve(root, dir);
      return isDirectory(dirPath);
    });
  }
  return false;
};

const hasFoldersAndFiles = (dirPath) => {
  return hasChildsFolder(dirPath) && hasFiles(dirPath);
};

const hasFoldersNotFiles = (dirPath) => {
  return hasChildsFolder(dirPath) && !hasFiles(dirPath);
};

const notFoldersHasFiles = (dirPath) => {
  return !hasChildsFolder(dirPath) && hasFiles(dirPath);
};

const notFoldersNotFiles = (dirPath) => {
  return !hasChildsFolder(dirPath) && !hasFiles(dirPath);
};

export const notExist = (dirPath) => {
  return notFoldersNotFiles(dirPath);
};

const processDirectory = (root, dir, dirPath) => {
  if (hasFoldersAndFiles(dirPath)) {
    root.push({
      label: dir,
      type: 'root',
      children: [...createDirectoryTree(dirPath, [])],
      files: getFiles(dirPath),
    });
  } else if (hasFoldersNotFiles(dirPath)) {
    root.push({
      label: dir,
      type: 'root',
      children: [...createDirectoryTree(dirPath, [])],
      files: null,
    });
  } else if (notFoldersHasFiles(dirPath)) {
    root.push({
      label: dir,
      type: 'root',
      children: null,
      files: getFiles(dirPath),
    });
  } else if (notExist(dirPath)) {
    root.push({
      label: dir,
      type: 'root',
      children: null,
      files: null,
    });
  } else {
    root.push({
      label: dir + ' (empty folder)',
      type: 'root',
      children: null,
      files: null,
    });
  }
};

const createDirectoryTree = (rootPath, data = []) => {
  fs.readdirSync(rootPath).forEach((dirName) => {
    const dirPath = path.resolve(rootPath, dirName);
    if (isDirectory(dirPath)) {
      processDirectory(data, dirName, dirPath);
    }
  });
  return data;
};

export const createDirTree = (rootPath) => {
  const mainRoot = {};
  const directoryTree = [];
  mainRoot.type = 'root';
  mainRoot.label = 'Your Projects';
  mainRoot.children = createDirectoryTree(rootPath);
  directoryTree.push(mainRoot);
  return directoryTree;
};

// } else if (notExist(dirPath)) {
//   throw new Error(`Error: Path ${dirPath} not found.`);
