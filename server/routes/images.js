import express from "express";
import {
  getImagesByDate,
  getImages,
  deleteImage,
} from "../controllers/images.js";
import {
  clearCache,
  addCacheGroup,
  cache,
  only200,
} from "../middleware/cache.js";

import { watch } from "../middleware/watcher.js";

const router = express.Router();

router
  .route("/:year/:month")
  .get(clearCache, addCacheGroup, cache("5 minutes", only200), getImagesByDate);

router
  .route("/all")
  .get(
    clearCache,
    addCacheGroup,
    cache("5 minutes", only200),
    watch,
    getImages
  );

router.route("/:id?").delete(deleteImage);

export default router;
