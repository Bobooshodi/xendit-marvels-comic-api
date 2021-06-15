import express from "express";
import withJson from "express-with-json";
import { default as Pino } from "pino-http";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import glob from "glob";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import container from "./service-container/inversify.config";
import { ServiceInterfaceTypes } from "./service-container/ServiceTypes";
import { CacheServiceInterface } from "./services";

const port = 8080;
const cacheService = container.get<CacheServiceInterface>(
  ServiceInterfaceTypes.ServiceTypes.cacheService
);

function connectToRedisServer() {
  cacheService.clearCache(() => {
    console.log("Cache Cleared !!!");
  });
  cacheService.connect(
    { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT },
    (error) => {
      console.error(error);
    },
    () => {
      console.log("Redis Server is Up and Running");
    }
  );
}

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

    if (error.message) {
      res.json({ error: error.message });
    } else {
      res.json(error);
    }
  }
  console.error(error);
}

export async function bootstrap() {
  const app = withJson(express());
  app.use(bodyParser.json());
  app.use(cors());

  findAllControllers().map((applyController) => applyController(app));
  app.use(errorHandler);

  connectToRedisServer();

  //Swagger Configuration
  const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "Marvel Comics API",
        version: "1.0.0",
      },
    },
    apis: ["src/controllers/*.ts"],
  };
  const swaggerDocs = swaggerJSDoc(swaggerOptions);

  app.use("/api-docs", serve, setup(swaggerDocs));

  app.listen(port, () => console.log("Listening on port", port));

  return app;
}
