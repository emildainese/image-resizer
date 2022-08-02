import express from "express";
import resizeImage from "../middleware/resize.js";
import uploadImage from "../middleware/upload.js";
import compressImage from "../middleware/compress.js";
import { postImage } from "../controllers/upload.js";
import { clearCache } from "../middleware/cache.js";

const router = express.Router();

router
  .route("/upload")
  .post(uploadImage, compressImage, resizeImage, clearCache, postImage);

export default router;
