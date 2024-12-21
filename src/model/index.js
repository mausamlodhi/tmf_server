import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import config from "../config"

const dbConfig = config.database;
const db = {};

mongoose
  .connect(`mongodb://${dbConfig.mongodb.host}:${dbConfig.mongodb.port}/${dbConfig.mongodb.db}`, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection established successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf(".") !== 0 && file !== "index.js")
  .forEach((file) => {
    const modelPath = path.join(__dirname, file);
    const defineModel = require(modelPath).default || require(modelPath);

    if (typeof defineModel === "function") {
      const modelName = path.basename(file, path.extname(file));
      db[modelName] = defineModel(mongoose);
    }
  });

db.mongoose = mongoose;

export default db;
