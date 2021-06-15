export interface CacheServiceInterface {
  connect(options, onError, onSuccess);
  setCache(key: string, data: any, duration?: number, onSuccess?: () => void);
  getCache(key: string, onValue: (err, reply) => void);
  clearCache(onValue: (err, reply) => void);
}
