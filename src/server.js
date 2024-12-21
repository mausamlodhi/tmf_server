import express from "express";
import dotenv from "dotenv";
import Bootstrap from ".";
dotenv.config();

const app = express();
app.set('port',process.env.PORT || 5050);
const server = new Bootstrap(app);