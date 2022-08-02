const data = {
  0: {
    originalname: "event6.jpg",
    field: undefined,
    large: {
      filename: "event6-03509405-3ac9-443f-9fcf-12544c1902b6-large.jpeg",
      path: "http://localhost:5000/upload/img/2022/06/large/event6-03509405-3ac9-443f-9fcf-12544c1902b6-large.jpeg",
    },
    medium: {
      filename: "event6-03509405-3ac9-443f-9fcf-12544c1902b6-medium.jpeg",
      path: "http://localhost:5000/upload/img/2022/06/medium/event6-03509405-3ac9-443f-9fcf-12544c1902b6-medium.jpeg",
    },
    thumbnail: {
      filename: "event6-03509405-3ac9-443f-9fcf-12544c1902b6-thumbnail.jpeg",
      path: "http://localhost:5000/upload/img/2022/06/thumbnail/event6-03509405-3ac9-443f-9fcf-12544c1902b6-thumbnail.jpeg",
    },
    original: {
      filename: "event6-03509405-3ac9-443f-9fcf-12544c1902b6-original.jpeg",
      path: "http://localhost:5000/upload/img/2022/06/original/event6-03509405-3ac9-443f-9fcf-12544c1902b6-original.jpeg",
    },
  },
  sizes: [
    { path: "large", width: 800, height: 600 },
    { path: "medium", width: 400, height: 300 },
    { path: "thumbnail", width: 200, height: 150 },
    { path: "original", width: 1920, height: 1280 },
  ],
};

// Positive lookbehind: (?<=Y)X, matches X, but only if there’s Y before it.
// Negative lookbehind: (?<!Y)X, matches X, but only if there’s no Y before it.

const transformData = (data) => {
  //Save size data
  const sizes = data.sizes;
  delete data.sizes;
  //Clean up usless info and save original file name
  const formats = data["0"];
  const originalFileName = formats.originalname;
  delete formats.originalname;
  delete formats.field;

  const project = [];
  const cleanData = Object.entries(Object.entries(data["0"]));

  let i = 0;
  for (const [_, [format, { filename, path }]] of cleanData) {
    const projectData = {};
    projectData["originalFileName"] = originalFileName;
    projectData["fileName"] = filename;
    projectData["url"] = path;
    projectData["format"] = format;
    projectData["year"] = path.match(/(?<!:)\b\d{4}\b/g)[0];
    projectData["month"] = path.match(/\d{2}/g)[0];
    projectData["width"] = sizes[i].width;
    projectData["height"] = sizes[i].height;
    project.push(projectData);
    i++;
  }

  return project;
};

transformData(data);
