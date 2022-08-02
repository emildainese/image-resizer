import express from "express";
import setupApplication from "./setup.js";

const app = express();

const PORT = process.env.PORT;

//TODO middleware for timeout error, database error, connection error, helmet and rate limit

setupApplication(app).listen(PORT, () => {
  console.log(`[Application]: Server running on port ${PORT}`);
});
