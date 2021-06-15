import express from "express";
import { IExpressWithJson, JsonErrorResponse } from "express-with-json/dist";
import { validationResult } from "express-validator";

import container from "../service-container/inversify.config";

import { ServiceInterfaceTypes } from "../service-container/ServiceTypes";
import { CharacterServiceInterface } from "../services";

var characterService = container.get<CharacterServiceInterface>(
  ServiceInterfaceTypes.ServiceTypes.characterService
);

export async function create(req: any) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new JsonErrorResponse({ errors: errors.array() });
    }

    const { character } = req.body;

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
  return await characterService.getPaginated(req.query);
}

export async function update(req: express.Request) {
  const { id } = req.params;

  const existingImage = await characterService.getById(id);

  return await characterService.update(existingImage);
}

export default (app: IExpressWithJson) => {
  app.postJson("/characters", create);
  app.deleteJson("/characters/:id", remove);
  app.getJson("/characters", getAll);
  app.getJson("/characters/:id", get);
};
