import path from "path";
import fs from "fs";

const isFile = (path) => fs.statSync(path).isFile();

const isDir = (path) => fs.statSync(path).isDirectory();

export const walk = (root, config, matches = []) => {
  let folders = [];

  try {
    folders = fs.readdirSync(root);
  } catch (error) {
    //Meglio non rilanciare in questo caso
    return [];
  }

  const { year, month, protocol, host } = config;

  folders.forEach((folder) => {
    const currentPath = path.resolve(root, folder);
    if (fs.existsSync(currentPath)) {
      if (isFile(currentPath)) {
        if (config) {
          const basename = path
            .basename(folder, path.extname(folder))
            .split("-");
          const format = basename[basename.length - 1];
          matches.push({
            format: format,
            url: `${protocol}://${host}/upload/img/${year}/${month}/${format}/${folder}`,
          });
        } else {
          matches.push({ url: currentPath });
        }
      } else if (isDir(currentPath)) {
        walk(currentPath, config, matches);
      }
    }
  });

  return matches;
};
