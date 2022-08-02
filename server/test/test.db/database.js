import { Sequelize } from "sequelize";
import SQLite from "sqlite3";

const debug = false;
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "test.db",
  logging: debug && console.log,
  dialectOptions: {
    mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
  },
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();

    console.log(
      "[Test Database]: Connection has been established successfully."
    );
  } catch (error) {
    console.error("[Test Database]: Unable to connect to the database:", error);
  }
};

export default sequelize;
