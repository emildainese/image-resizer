import path from "path";
import { Sequelize } from "sequelize";
import SQLite from "sqlite3";
import dotenv from "dotenv";

// TODO Create a Database class

dotenv.config({ path: path.resolve(".env") });

const debug = true;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/data.db",
  logging:
    process.env.NODE_ENV === "development" && debug ? console.log : false,
  dialectOptions: {
    mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
  },
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("[Database]: Connection has been established successfully.");
  } catch (error) {
    console.error("[Database]: Unable to connect to the database:", error);
    throw error;
  }
};

export default sequelize;
