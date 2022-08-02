import { log } from "../../util/log.js";

export const logHeaders = (req, res, next) => {
  log("[logHeaders() Middleware]: ", req.headers);
  next();
};
