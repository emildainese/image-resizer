import multer from "multer";

const fieldName = "image";

const storage = multer.memoryStorage();

const checkFileType = (file, cb) => {
  if (/(jpe?g|png)$/.test(file.mimetype)) {
    return cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

const imageUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single(fieldName);

export default imageUpload;
