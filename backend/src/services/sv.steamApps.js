class SteamAppServices {
    // HTTP METHODS:
    static GET = "GET";

    constructor() {
        this.httpClient = require("./sv.httpClient");
        const config = require("./../../../config.json");
        this.token = config.steam.api_key;
    }

    async getAppList(token = this.token) {
        let url = `https://api.steampowered.com/ISteamApps/GetAppList/v2/?key=${token}`;
        let response = await this.httpClient.submitRequest(
            url,
            SteamAppServices.GET,
        );
        if (!response.ok) {
            console.error("Error grabbing app list: ", response.error);
        }
        const filterAppList = (response) => {
            const appList = response.applist.apps;

            const filteredApps = appList.map((app) => ({
                appid: app.appid,
                gameName: app.name,
            }));
            return filteredApps;
        };
        const result = filterAppList(response);

        return result;
    }
}

module.exports = new SteamAppServices();
