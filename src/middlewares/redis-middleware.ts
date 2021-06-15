import container from "../service-container/inversify.config";
import { ServiceInterfaceTypes } from "../service-container/ServiceTypes";
import { CacheServiceInterface } from "../services";

const cacheService = container.get<CacheServiceInterface>(
  ServiceInterfaceTypes.ServiceTypes.cacheService
);

export const redisMiddleware = (req, res, next) => {
  let key = req.originalUrl || req.url;
  res.type("application/json");
  cacheService.getCache(key, function (err, cachedData) {
    if (cachedData) {
      res.send(JSON.parse(cachedData));
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        cacheService.setCache(key, JSON.stringify(body), 900);
        res.sendResponse(body);
      };
      next();
    }
  });
};
