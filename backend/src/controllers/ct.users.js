const userServices = require("./../services/sv.users");
const logExceptions = require("./../services/sv.logExceptions");
const redisController = require("./../controllers/ct.redis");

class UserController {
    async getSteamIDFromVanity(req) {
        try {
            return await userServices.getSteamIDFromVanity(req);
        } catch (ex) {
            logExceptions.log(ex, req);
            throw ex;
        }
    }

    async getPlayerSummaries(req) {
        try {
            return await userServices.getPlayerSummaries(req);
        } catch (ex) {
            logExceptions.log(ex, req);
            throw ex;
        }
    }

    async getUserOwnedGames(req) {
        try {
            const gameData = await userServices.getUserOwnedGames(req);
            let results = {};
            for (const game of gameData) {
                let gameName = await redisController.searchAppList(game.appid);
                results[`${game.appid}`] = {
                    gameName: `${gameName}`,
                    totalPlaytime: `${Number(game.playtime / 60).toFixed(2)} Hrs.`,
                };
            }
            return results;
        } catch (ex) {
            logExceptions.log(ex, req);
            throw ex;
        }
    }

    async getUserRecentlyPlayedGames(req) {
        try {
            const recentGames =
                await userServices.getUserRecentlyPlayedGames(req);
            let results = {};
            for (const game of recentGames) {
                let gameName = await redisController.searchAppList(game.appid);
                results[`${game.appid}`] = {
                    gameName: gameName,
                };
            }
        } catch (ex) {
            logExceptions.log(ex, req);
            throw ex;
        }
    }
}

module.exports = new UserController();
