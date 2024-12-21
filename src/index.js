import os from "os";
import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import cluster from "cluster";
import path from "path";
import cors from "cors";
import { I18n } from "i18n";
import model from "./model";
import routes from "./routes";
export default class Bootstrap {
  constructor(app) {
    this.app = app;
    this.middleware();
    this.route();
    this.connectDB();
    this.start();
  }
  middleware() {
    const { app } = this;
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(compression());
    app.use(express.static(path.join(__dirname, "public")));
    app.use(cors());
    const i18n = new I18n({
      locales: ["en", "hi", "chineese"],
      defaultLocale: "en",
      directory: path.join(__dirname, "translation"),
    });
    app.use(i18n.init);
  }
  route() {
    const { app } = this;
    routes(app);
  }
  connectDB() {
    const { mongoose } = model;
  }
  start() {
    const environment = process.env.APPLICATION_ENVIRONMENT;
    if (environment === "production") {
      const totalCPUs = os.cpus().length;
      if (cluster.isPrimary) {
        for (let i = 0; i < totalCPUs; i++) {
          cluster.fork();
        }
        cluster.on("exit", (worker, code, signal) => {
          console.log(`Worker ${worker.process.pid} is died`);
        });
      } else {
        const { app } = this;
        const port = app.get("port");
        const server = app.listen(port || 5050, () => {
          console.log("Server started at port number : ", port);
        });
      }
    } else {
      const { app } = this;
      const port = app.get("port");
      const server = app.listen(port || 5050, () => {
        console.log("Server started at port number : ", port);
      });
    }
  }
}
