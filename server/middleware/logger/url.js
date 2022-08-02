import { URL } from "node:url";
import { log } from "../../util/log.js";

export const logURL = (req, res, next) => {
  const url = new URL(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
  log("[Middleware clearCache() path name]: " + url);
  log("[logURL() Middleware] pathname: " + url.pathname);
  log("[logURL() Middleware] origin: " + url.origin);
  log("[logURL() Middleware] hostname: " + url.hostname);
  log("[logURL() Middleware] host: " + url.host);
  log("[logURL() Middleware] href: " + url.href);
  log("[logURL() Middleware] hash: " + url.hash);
  log("[logURL() Middleware] port: " + url.port);
  log("[logURL() Middleware] protocol: " + url.protocol);
  log("[logURL() Middleware] searchParams: " + url.searchParams);
  next();
};
