import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminMozjpeg from 'imagemin-mozjpeg';

const compressImage = async (req, res, next) => {
  const quality = +req.body.quality || 80;

  const { file } = req;

  try {
    const buffer = await imagemin.buffer(file.buffer, {
      plugins: [
        imageminMozjpeg({ quality }),
        imageminPngquant({
          quality: [quality / 100, quality / 100],
        }),
      ],
    });

    req.file = {
      ...file,
      size: buffer.byteLength,
      buffer: buffer,
    };
  } catch (err) {
    return next(new Error(err.message));
  }

  next();
};

export default compressImage;
