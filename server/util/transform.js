export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const transformData = (data, id) => {
  const sizes = data.sizes;
  delete data.sizes;

  const formats = data["0"];
  const originalImageSize = data.originalImageSize;
  const originalFileName = formats.originalname;

  delete formats.originalname;
  delete formats.field;

  const project = [];
  const cleanData = Object.entries(Object.entries(data["0"]));

  let i = 0;
  for (const [_, [format, { filename, path }]] of cleanData) {
    const projectData = {};
    projectData["originalFileName"] = originalFileName;
    projectData["originalImageSize"] = originalImageSize;
    projectData["fileName"] = filename;
    projectData["url"] = path;
    projectData["format"] = format;
    projectData["year"] = path.match(/(?<!:)\b\d{4}\b/g)[0];
    projectData["month"] = path.match(/(?<=\/)\b\d{2}\b/g)[0];
    projectData["width"] = sizes[i].width;
    projectData["height"] = sizes[i].height;
    projectData["projectId"] = id;

    project.push(projectData);
    i++;
  }

  return project;
};
