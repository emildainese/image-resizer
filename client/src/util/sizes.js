export const setSizes = (large, medium, thumbnail) => [
  {
    path: 'original',
    width: null,
    height: null,
  },
  {
    path: 'large',
    width: +large.width,
    height: +large.height,
  },
  {
    path: 'medium',
    width: +medium.width,
    height: +medium.height,
  },
  {
    path: 'thumbnail',
    width: +thumbnail.width,
    height: +thumbnail.height,
  },
];
