const whitelist = [
  "http://localhost:5000/",
  "http://localhost:5000/api/upload",
  "localhost:5000",
  "http://localhost:3000/",
  "localhost:3000",
];

export const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} not allowed by CORS`));
    }
  },
};
