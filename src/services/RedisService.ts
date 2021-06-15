import { promisify } from "util";
import { inject, injectable } from "inversify";
import { createClient, RedisClient } from "redis";

import { ServiceInterfaceTypes } from "../service-container/ServiceTypes";
import { LoggerServiceInterface } from "./interfaces/LoggerServiceInterface";
import { CacheServiceInterface } from "./interfaces/CacheServiceInterface";

@injectable()
export class RedisService implements CacheServiceInterface {
  private logger;

  private client: RedisClient = createClient({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  });

  get getClient(): RedisClient {
    return this.client;
  }

  public constructor(
    @inject(ServiceInterfaceTypes.ServiceTypes.loggerService)
    logger: LoggerServiceInterface
  ) {
    this.logger = logger.getLogger();
  }
  connect(options: any, onError: any, onSuccess: any) {
    this.client = createClient(options)
      .on("error", onError)
      .on("ready", onSuccess);
  }

  setCache(key: string, data: any, duration?: number, onSuccess?: () => void) {
    if (duration) {
      return this.client.setex(key, duration, data, onSuccess);
    }

    return this.client.set(key, data, onSuccess);
  }

  getCache(key, onValue: (err, reply) => void) {
    return this.client.get(key, onValue);
  }

  clearCache(onFlush: (err, reply) => void) {
    this.client.flushall(onFlush);
  }
}
