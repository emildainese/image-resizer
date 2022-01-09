import path from 'path';
import fs from 'fs';

//-----------------------------------------------------------

export const postImage = async (req, res, next) => {
  const { file } = req;
  const { imagesData } = req.body;

  if (!file) {
    return next(new Error('Please provide a file'));
  }

  res.status(200).json({
    message: `Image ${file.originalname} succesfully uploaded and optimized`,
    images: imagesData,
  });
};

//-----------------------------------------------------------

export const getImages = async (req, res, next) => {
  const { date } = req.params;

  if (!date) {
    return next(new Error('You must provide a valid date'));
  }

  const month = null;
  const year = null;

  const filepath = path.join(
    path.resolve(),
    '..',
    'upload',
    'img',
    year,
    month
  );

  const imageType = null;

  res.setHeader('Content-Type', `image/${imageType}`);

  const stream = fs.createReadStream(filepath);
  stream.pipe(res);
};
