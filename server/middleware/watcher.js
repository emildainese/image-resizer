import Watcher from "../util/watcher/watcher.js";

export const watch = (req, res, next) => {
  if (Boolean(req.query.force)) {
    Watcher.watch();
  }
  next();
};
