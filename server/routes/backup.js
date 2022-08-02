import express from "express";
import { backupData } from "../controllers/backup.js";

const router = express.Router();

router.route("/backup").get(backupData);

export default router;
