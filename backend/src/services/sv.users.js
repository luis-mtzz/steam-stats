class UserServives {
    // HTTP METHODS:
    static GET = "GET";

    constructor() {
        this.httpClient = require("./sv.httpClient");
        const config = require("./../../../config.json");
        this.token = config.steam.api_key;
    }

    async getSteamIDFromVanity(vanityurl) {
        let url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${this.token}&vanityurl=${vanityurl}`;
        let response = await this.httpClient.submitRequest(
            url,
            UserServives.GET,
        );
        if (!response.ok) {
            console.error("Error Grabbing SteamID: ", response.error);
        }
        return {
            steamID: response.data.response.steamid,
        };
    }

    async getPlayerSummaries(steamid, token = this.token) {
        let url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${token}&steamids=${steamid}`;
        let response = await this.httpClient.submitRequest(
            url,
            UserServives.GET,
        );
        if (!response.ok) {
            console.error("Error grabbing player summary: ", error);
        }
        return {
            steamID: response.data.response.players[0].steamid,
            personaName: response.data.response.players[0].personaname,
            profileURL: response.data.response.players[0].profileurl,
            avatarFull: response.data.response.players[0].avatarfull,
            timecreated: new Date(
                response.data.response.players[0].timecreated * 1000,
            ).toLocaleDateString("en-US"),
        };
    }

    async getUserOwnedGames(steamid) {
        let url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${this.token}&steamid=${steamid}`;
        let response = await this.httpClient.submitRequest(
            url,
            UserServives.GET,
        );
        if (!response.ok) {
            console.error("Error grabbing owned games: ", error);
        }
        const filterGameData = (response) => {
            const games = response.data.response.games;

            const filteredGames = games.map((game) => ({
                appid: game.appid,
                playtime: game.playtime_forever,
            }));
            return filteredGames;
        };
        const result = filterGameData(response);

        return result;
    }

    async getUserRecentlyPlayedGames(steamid, token = this.token) {
        let url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${token}&steamid=${steamid}`;
        let response = await this.httpClient.submitRequest(
            url,
            UserServives.GET,
        );
        if (!response.ok) {
            console.error("Error grabbing owned games: ", error);
        }
        const filterGameData = (response) => {
            console.log(response);
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
