const { SchemaFieldTypes, createClient } = require("redis");

class RedisServices {
    constructor() {
        this.httpClient = require("./sv.httpClient");

        const config = require("./../../../config.json");
        this.host = config.redis.host;
        this.password = config.redis.password;
        this.port = config.redis.port;
        this.publicEndpoint = config.redis.publicEndpoint;
        this.databaseName = config.redis.databaseName;

        this.client = createClient({
            password: this.password,
            socket: {
                host: this.host,
                port: this.port,
            },
        });

        this.client.on("error", (err) =>
            console.error("Cannot connect to Redis Server: ", err),
        );

        this.connectClient();
        // this.createSteamIndex();
    }

    async connectClient() {
        try {
            await this.client.connect();
            console.log("Connected to Redis Server");
        } catch (ex) {
            console.error("Error connecting to Redis Server: ", ex);
        }
    }

    async createSteamIndex() {
        try {
            await this.client.ft.create(
                "steamAppsIndex",
                {
                    "$.appid": {
                        type: SchemaFieldTypes.TEXT,
                        AS: "appid",
                    },
                    "$.gameName": {
                        type: SchemaFieldTypes.TEXT,
                        AS: "gameName",
                    },
                },
                {
                    ON: "HASH",
                    PREFIX: "steam:apps",
                },
            );
            console.log("Index created successfully");
        } catch (err) {
            if (err.message === "Index already exists") {
                console.log("Index already exists");
            } else {
                console.error("Error creating index:", err);
            }
        }
    }

    async uploadAppList(appList) {
        const multi = this.client.multi();
        appList.forEach((app) => {
            const appid = String(app.appid);
            const name = String(app.gameName);
            multi.hSet("steam:apps", appid, name);
        });
        await multi.exec();
        console.log("Imported App List into Redis!");
    }

    async searchAppList(key) {
        const searchResult = await this.client.hGet("steam:apps", `${key}`);
        return searchResult;
    }
}

module.exports = new RedisServices();
