class UserServives {
    // HTTP METHODS:
    static GET = "GET";

    constructor() {
        this.httpClient = require("./sv.httpClient");
        const config = require("./../../../config.json");
        this.token = config.steam.api_key;
    }

    async getSteamIDFromVanity(token = this.token, vanityurl) {
        let url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${token}&vanityurl=${vanityurl}`;
        let response = await this.httpClient.submitRequest(
            url,
            UserServives.GET,
        );
        if (!response.ok) {
            console.error("Error Grabbing SteamID: ", response.error);
        }
        return {
            steamID: response.response.steamid,
        };
    }

    async getPlayerSummaries(token = this.token, steamid) {
        let url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${token}&steamids=${steamid}`;
        let response = await this.httpClient.submitRequest(
            url,
            UserServives.GET,
        );
        if (!response.ok) {
            console.error("Error grabbing player summary: ", error);
        }
        return {
            steamID: response.response.steamid,
            personaName: response.response.personaname,
            profileURL: response.response.personaname,
            avatarFull: response.response.avatarfull,
            timecreated: response.response.timecreated,
        };
    }

    async getUserOwnedGames(token = this.token, steamid) {
        let url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${token}&steamid=${steamid}`;
        let response = await this.httpClient.submitRequest(
            url,
            UserServives.GET,
        );
        if (!response.ok) {
            console.error("Error grabbing owned games: ", error);
        }
        const filterGameData = (response) => {
            const games = response.response.games;

            const filteredGames = games.map((game) => ({
                appid: game.appid,
                playtime: game.playtime_forever,
            }));
            return filteredGames;
        };
        const result = filterGameData(response);

        return result;
    }

    async getUserRecentlyPlayedGames(token = this.token, steamid) {
        let url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${token}&steamid=${steamid}`;
        let response = await this.httpClient.submitRequest(
            url,
            UserServives.GET,
        );
        if (!response.ok) {
            console.error("Error grabbing owned games: ", error);
        }
        const filterGameData = (response) => {
            const games = response.response.games;

            const filteredGames = games.map((game) => ({
                appid: game.appid,
                name: game.name,
                playtime: game.playtime_forever,
            }));
            return filteredGames;
        };
        const result = filterGameData(response);

        return result;
    }
}

module.exports = new UserServives();
