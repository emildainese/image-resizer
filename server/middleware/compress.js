import imagemin from "imagemin";
import imageminPngquant from "imagemin-pngquant";
import imageminMozjpeg from "imagemin-mozjpeg";

const compressImage = async (req, res, next) => {
  const quality = +req.body.quality || 80;

  const { file } = req;

  if (!file) {
    return next(new Error("Please upload an image file!"));
  }

  try {
    const buffer = await imagemin.buffer(file.buffer, {
      plugins: [
        imageminMozjpeg({ quality }),
        imageminPngquant({
          quality: [quality / 100, quality / 100],
        }),
      ],
    });

    if (!buffer) {
      return next(
        new Error("Could not read image data, please upload a valid image!")
      );
    }

    req.file = {
      ...file,
      size: buffer.byteLength,
      buffer: buffer,
    };
  } catch (err) {
    return next(new Error(err.message || "Image compression fail"));
  }

  next();
};

export default compressImage;
