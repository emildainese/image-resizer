import { log } from "../util/log.js";

const debug = true;

export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
  });
};

export const databaseError = (req, res, next) => {};

export const connectionError = (req, res, next) => {};

export const errorHandler = (err, req, res, next) => {
  debug && log("[Error Middleware] ", err);
  res.status(req.statusCode || 500).json({
    success: false,
    error: err.message
      ? err.message
      : err
      ? JSON.stringify(err)
      : "Internal Server Error",
  });
};
