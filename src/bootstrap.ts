import express from "express";
import withJson from "express-with-json";
import { default as Pino } from "pino-http";
import glob from "glob";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import container from "./service-container/inversify.config";
import { ServiceInterfaceTypes } from "./service-container/ServiceTypes";

const port = 3000;

function findAllControllers() {
  return glob
    .sync(path.join(__dirname, "controllers/*"), { absolute: true })
    .map((controllerPath) => require(controllerPath).default)
    .filter((applyController) => applyController);
}

function errorHandler(error, req, res, next) {
  if (!error) {
    return next();
  }

  if (error) {
    res.status(500);
    res.json({ error: error.message });
  }
  console.error(error);
}

export async function bootstrap() {
  const app = withJson(express());
  app.use(bodyParser.json());
  app.use(cors());

  findAllControllers().map((applyController) => applyController(app));
  app.use(errorHandler);

  app.listen(port, () => console.log("Listening on port", port));

  return app;
}
