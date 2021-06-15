import express from "express";
import { IExpressWithJson, JsonErrorResponse } from "express-with-json/dist";
import { validationResult } from "express-validator";

import container from "../service-container/inversify.config";

import { ServiceInterfaceTypes } from "../service-container/ServiceTypes";
import { CacheServiceInterface, CharacterServiceInterface } from "../services";
import { redisMiddleware } from "../middlewares/redis-middleware";

var characterService = container.get<CharacterServiceInterface>(
  ServiceInterfaceTypes.ServiceTypes.characterService
);

var cacheService = container.get<CacheServiceInterface>(
  ServiceInterfaceTypes.ServiceTypes.cacheService
);

export async function create(req: any) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new JsonErrorResponse({ errors: errors.array() });
    }

    const { character } = req.body;

    cacheService.clearCacheWithPattern("character/*", (err) => {
      console.error("Unable to clear Pattern from cache");
    });

    return await characterService.createAndSave(character);
  } catch (error) {
    console.error(error);
    throw new JsonErrorResponse({ error: "some error occured" });
  }
}

export async function remove(req: express.Request) {
  const { id } = req.params;

  const res = await characterService.delete(id);
  return { ok: res };
}

export async function get(req: express.Request) {
  const { id } = req.params;

  return await characterService.getById(id);
}

export async function getAll(req: express.Request) {
  return await characterService.getAll(req.query);
}

export async function update(req: express.Request) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new JsonErrorResponse({ errors: errors.array() });
  }
  const { id } = req.params;
  const { character } = req.body;

  cacheService.clearCacheWithPattern("character/*", (err) => {
    console.error("Unable to clear Pattern from cache");
  });

  return await characterService.update(id, character);
}

export default (app: IExpressWithJson) => {
  app.postJson("/characters", create);
  app.deleteJson("/characters/:id", remove);
  /**
   * @swagger
   * /characters:
   *   get:
   *     description: Get all Character IDs
   *     responses:
   *       200:
   *         description: Success
   *
   */
  app.getJson("/characters", redisMiddleware, getAll);
  /**
   * @swagger
   * /characters/{id}:
   *   get:
   *     description: Get a Character Details
   *     parameters:
   *     - name: ID
   *       description: The Character's ID
   *       in: path
   *       required: true
   *       schema:
   *         type: integer
   *     responses:
   *       200:
   *         description: Success
   *
   */
  app.getJson("/characters/:id", redisMiddleware, get);
};
