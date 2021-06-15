import { inject, injectable } from "inversify";

import { ServiceInterfaceTypes } from "../service-container/ServiceTypes";
import { LoggerServiceInterface } from "./interfaces/LoggerServiceInterface";
import { CacheServiceInterface } from "./interfaces/CacheServiceInterface";

@injectable()
export class RedisService implements CacheServiceInterface {
  private logger;

  public constructor(
    @inject(ServiceInterfaceTypes.ServiceTypes.loggerService)
    logger: LoggerServiceInterface
  ) {
    this.logger = logger.getLogger();
  }
  connect(options: any, onError: any, onSuccess: any) {
    throw new Error("Method not implemented.");
  }
}
