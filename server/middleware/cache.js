import apicache from "apicache";
import { log } from "../util/log.js";

const debug = false;

//------------------------------------------------------------------------
// Clear specific cache groups if data needs update, client can control cache
// updates by force refresh cache entry and bypass cache. After each upload
// request all cache entries are cleared for serving the new upcomming data
//------------------------------------------------------------------------

export const clearCache = (req, res, next) => {
  const { force } = req.query;

  if (force === "undefined" || !force) {
    debug && log("[clearCache() Middleware]: Cache NOT Clear");
    return next();
  }

  const shouldClear = Boolean(force);

  if (shouldClear) {
    debug && log("[clearCache() Middleware]: Bypass and Clear Cache");
    let group = setGroup(req);
    if (/upload/gi.test(group)) {
      apicache.clear();
      return next();
    }
    apicache.clear(group);
  }

  next();
};

//------------------------------------------------------------------------
// Add cache group for fine grain cache control
//------------------------------------------------------------------------

export const addCacheGroup = (req, res, next) => {
  let group = setGroup(req);

  req.apicacheGroup = group;

  debug &&
    log("[addCacheGroup() Middleware] Cache Index: ", apicache.getIndex());

  next();
};

const setGroup = (req) => {
  if (Object.keys(req.query).length > 0) {
    if (req.originalUrl) {
      return req.originalUrl.split("?")[0];
    } else {
      return req.url.split("?")[0];
    }
  }
  return req.originalUrl || req.url;
};

//------------------------------------------------------------------------
// Create and config options for apicache middleware. Cache only 200 status
// code response
//------------------------------------------------------------------------

export const only200 = (req, res) => res.statusCode === 200;

export const cache = apicache.options({
  debug: debug,
  respectCacheControl: true,
}).middleware;
