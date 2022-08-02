import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "projects",
    modelName: "Project",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

export default Project;
