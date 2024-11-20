const steamAppServices = rquire("./../services/sv.steamApps");
const logExceptions = require("./../services/sv.logExceptions");

class SteamAppController {
    async getAppList() {
        try {
            apps = await steamAppServices.getAppList();
            return apps;
        } catch (ex) {
            logExceptions.log(ex, req);
            throw ex;
        }
    }
}

module.exports = new SteamAppController();
