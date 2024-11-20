const redisServices = requre("./../services/sv.");
const logExceptions = require("./../services/sv.logExceptions");

class RedisController {
    async uploadAppList(req) {
        try {
            await redisServices.uploadAppList(req);
        } catch (ex) {
            logExceptions(ex, req);
            throw ex;
        }
    }
}
