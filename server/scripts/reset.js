import path from "path";
import fs from "fs";

const __dirname = path.resolve();

const dbPath = path.join(__dirname, "db", "data.db");
const imgPath = path.join(__dirname, "upload", "img");

fs.rmSync(imgPath, { force: true, recursive: true });

if (!fs.existsSync(imgPath)) {
  fs.mkdirSync(imgPath);
}

if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
}
