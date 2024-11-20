const steamAppController = require("./../controllers/ct.steamApps");
const redisController = require("./../controllers/ct.redis");

module.exports = function (app) {
    app.get("/api/v1/steamApp/upload", async function (req, res) {
        try {
            const response = steamAppController.getAppList();
            const data = await response.json();

            if (!data.applist || !data.applist.apps) {
                return res.status(500).json({
                    status: "Failed",
                    message: "There is no applist or applist.apps in data.",
                    data: res.message,
                });
            }
            const appList = data.appList.apps;
            await redisController.uploadAppList(appList);
            res.status(200).json({
                status: "Succeeded",
                message: "Data Uploaded to Redis.",
                data: appList,
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
