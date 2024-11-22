const redisServices = require("./../services/sv.redis");
const logExceptions = require("./../services/sv.logExceptions");

class RedisController {
    async uploadAppList(req) {
        try {
            return await redisServices.uploadAppList(req);
        } catch (ex) {
            logExceptions.log(ex, req);
            throw ex;
        }
    }

    async searchAppList(req) {
        try {
            return await redisServices.searchAppList(req);
        } catch (ex) {
            logExceptions.log(ex, req);
            throw ex;
        }
    }
}

module.exports = new RedisController();
