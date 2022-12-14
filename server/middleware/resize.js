import path from "path";
import SharpResizer from "multer-sharp-resizer";
import { v4 } from "uuid";

const resizeImage = async (req, res, next) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = `${today.getMonth() + 1}`.padStart(2, "0");
  const { file } = req;
  const sizes = JSON.parse(req.body.sizes);
  const originalImageSize = +req.body.originalImageSize;

  const filename = `${year}-${month}-${
    file.originalname.split(".")[0]
  }-${v4()}${path.extname(file.originalname)}`;

  const uploadPath = path.join(
    path.resolve(),
    "upload",
    "img",
    `${year}`,
    `${month}`
  );

  const fileUrl = `${req.protocol}://${req.get(
    "host"
  )}/upload/img/${year}/${month}`;

  // sharp options
  const sharpOptions = {
    fit: "cover",
    background: { r: 255, g: 255, b: 255 },
  };

  // create a new instance of MulterSharpResizer and pass params
  const resizeObj = new SharpResizer(
    req,
    filename,
    sizes,
    uploadPath,
    fileUrl,
    sharpOptions
  );

  // call resize method for resizing files
  await resizeObj.resize();

  // Get details of uploaded files: Used by multer .array() or .single()
  const imagesData = {
    ...resizeObj.getData(),
    sizes,
    originalImageSize,
  };

  req.body.imagesData = imagesData;

  next();
};

export default resizeImage;

// let buffer = null;
// if (file.mimetype === 'image/jpeg') {
//   buffer = await sharp(file.buffer)
//     .jpeg({ quality: +quality })
//     .toBuffer();
// } else if (file.mimetype === 'image/png') {
//   buffer = await sharp(file.buffer)
//     .png({ palette: true, quality: +quality })
//     .toBuffer();
// }
// console.log(buffer);
// console.log(buffer.byteLength);
