import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import origin from "./middleware/origin.js";
import compression from "compression";
import cacheRoutes from "./routes/cache.js";
import uploadRoutes from "./routes/upload.js";
import dirtreeRoutes from "./routes/dirtree.js";
import imagesRoutes from "./routes/images.js";
import backupRoutes from "./routes/backup.js";
import { errorHandler, notFound } from "./middleware/error.js";
import { connectDB } from "./db/database.js";
import { corsOptions } from "./middleware/config/cors.js";

dotenv.config();

const debug = false;

const setupExpress = (app) => {
  app.set("etag", false);
};

const setupRoutes = (app) => {
  app.use("/api", uploadRoutes);
  app.use("/api", dirtreeRoutes);
  app.use("/api/images", imagesRoutes);
  app.use("/api", backupRoutes);
  app.use("/api/cache", cacheRoutes);
  app.use(notFound);
  app.use(errorHandler);
};

const setupMiddleware = (app) => {
  app.use(express.json());
  app.use(express.static("public"));
  app.use("/upload/img", express.static(path.join("upload", "img")));
  app.use(origin);
  app.use(compression());
  app.use(cors(corsOptions));
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }
};

const setupApplication = (app) => {
  // Setup express
  setupExpress(app);

  //Setup middleware
  setupMiddleware(app);

  //Setup Routes
  setupRoutes(app);

  //Connect to database
  try {
    connectDB();
  } catch (error) {
    console.log("[Database Connection Error]: ", error);
  }

  return app;
};

export default setupApplication;
