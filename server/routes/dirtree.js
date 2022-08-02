import express from "express";
import { getDirectoryTree } from "../controllers/dirtree.js";
import {
  clearCache,
  addCacheGroup,
  cache,
  only200,
} from "../middleware/cache.js";

const router = express.Router();

router
  .route("/dirtree")
  .get(
    clearCache,
    addCacheGroup,
    cache("5 minutes", only200),
    getDirectoryTree
  );

export default router;
