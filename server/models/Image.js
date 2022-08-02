import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const Image = sequelize.define(
  "Image",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    originalFileName: {
      type: DataTypes.STRING,
      notNull: true,
      notEmpty: true,
    },
    originalImageSize: {
      type: DataTypes.SMALLINT,
    },
    fileName: {
      type: DataTypes.STRING,
      notNull: true,
      notEmpty: true,
    },
    url: {
      type: DataTypes.STRING,
      notNull: true,
      notEmpty: true,
      unique: true,
      isUrl: true,
    },
    imageSize: {
      type: DataTypes.SMALLINT,
    },
    format: {
      type: DataTypes.STRING,
      required: true,
      notEmpty: true,
    },
    year: {
      type: DataTypes.SMALLINT,
      notNull: true,
      notEmpty: true,
    },
    month: {
      type: DataTypes.SMALLINT,
      notNull: true,
      notEmpty: true,
    },
    width: {
      type: DataTypes.SMALLINT,
      notNull: true,
      notEmpty: true,
    },
    height: {
      type: DataTypes.SMALLINT,
      notNull: true,
      notEmpty: true,
    },
  },
  {
    sequelize,
    tableName: "images",
    modelName: "Image",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

export default Image;

// projectId: {
//   type: DataTypes.INTEGER,
//   unique: true,
//   notNull: true,
//   references: {
//     model: "Project",
//     key: "id",
//     onDelete: "CASCADE",
//   },
// },
