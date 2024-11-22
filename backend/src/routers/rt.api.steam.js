const steamAppController = require("./../controllers/ct.steamApps");
const redisController = require("./../controllers/ct.redis");
const userController = require("../controllers/ct.users");

module.exports = function (app) {
    app.get("/api/v1/steamApp/upload", async function (req, res) {
        try {
            const response = await steamAppController.getAppList();
            const data = await response;

            if (!data) {
                return res.status(500).json({
                    status: "Failed",
                    message: "There is no data.",
                    data: res.message,
                });
            }
            await redisController.uploadAppList(data);
            res.status(200).json({
                status: "Success",
                message: "Data Uploaded to Redis.",
                data: data,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                status: "Failed",
                message: "Error",
                data: err,
            });
        }
    });

    app.get("/api/v1/redis/search", async function (req, res) {
        try {
            const appid = req.query.appid;
            let gameName = await redisController.searchAppList(appid);
            if (!gameName) {
                res.status(500).json({
                    status: "Failed",
                    message: `There is not game associated with app id: ${appid}`,
                });
            }

            res.status(200).json({
                status: "Success",
                message: `App ID: ${appid}`,
                data: `${gameName}`,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                status: "Failed",
                message: "Error",
                data: err,
            });
        }
    });

    app.get("/api/v1/user/steamID", async function (req, res) {
        try {
            const vanityURL = req.query.vanityurl;
            let steamID = await userController.getSteamIDFromVanity(vanityURL);
            if (!steamID) {
                res.status(500).json({
                    status: "Failed",
                    message: `Could not find Steam ID from ${vanityURL}`,
                });
            }

            res.status(200).json({
                status: "Success",
                message: `Vanity URL: ${vanityURL}`,
                data: steamID,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                status: "Failed",
                message: "Error",
                data: err,
            });
        }
    });

    app.get("/api/v1/user/playerSummary", async function (req, res) {
        try {
            const steamid = req.query.steamid;
            let playerSummary =
                await userController.getPlayerSummaries(steamid);
            if (!playerSummary) {
                res.status(500).json({
                    status: "Failed",
                    message: "Failed to grab player summary.",
                });
            }

            res.status(200).json({
                status: "Success",
                message: `User summary for Steam ID: ${steamid}`,
                data: playerSummary,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                status: "Failed",
                message: "Error",
                data: err,
            });
        }
    });

    app.get("/api/v1/user/ownedGames", async function (req, res) {
        try {
            const steamid = req.query.steamid;
            let ownedGames = await userController.getUserOwnedGames(steamid);
            if (!ownedGames) {
                res.status(500).json({
                    status: "Failed",
                    message: "This user has no steam games",
                });
            }

            res.status(200).json({
                status: "Success",
                message: `Games owned by ${steamid}`,
                data: ownedGames,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                status: "Failed",
                message: "Error",
                data: err,
            });
        }
    });
};
