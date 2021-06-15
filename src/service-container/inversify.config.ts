import { Container } from "inversify";

import { ServiceInterfaceTypes } from "./ServiceTypes";
import {
  RedisService,
  HTTPRequestInterface,
  HttpRequestService,
  CacheServiceInterface,
  LoggerService,
  LoggerServiceInterface,
  CharacterService,
  CharacterServiceInterface,
} from "../services";

var container = new Container();
container
  .bind<CacheServiceInterface>(ServiceInterfaceTypes.ServiceTypes.cacheService)
  .to(RedisService);
container
  .bind<HTTPRequestInterface>(
    ServiceInterfaceTypes.ServiceTypes.httpRequestService
  )
  .to(HttpRequestService);
container
  .bind<LoggerServiceInterface>(
    ServiceInterfaceTypes.ServiceTypes.loggerService
  )
  .to(LoggerService);
container
  .bind<CharacterServiceInterface>(
    ServiceInterfaceTypes.ServiceTypes.characterService
  )
  .to(CharacterService);

export default container;
