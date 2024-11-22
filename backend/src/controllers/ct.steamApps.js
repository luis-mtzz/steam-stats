const steamAppServices = require("./../services/sv.steamApps");
const logExceptions = require("./../services/sv.logExceptions");

class SteamAppController {
    async getAppList() {
        try {
            const apps = await steamAppServices.getAppList();
            console.log(apps);
            return apps;
        } catch (ex) {
            logExceptions.log(ex);
            throw ex;
        }
    }
}

module.exports = new SteamAppController();
