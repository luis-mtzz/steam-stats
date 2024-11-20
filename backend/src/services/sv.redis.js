class RedisServices {
    constructor() {
        this.httpClient = require("./sv.httpClient");

        const config = require("./../../../config.json");
        this.host = config.redis.host;
        this.password = config.redis.host;
        this.port = config.redis.port;
        this.publicEndpoint = config.redis.publicEndpoint;
        this.databaseName = config.redis.databaseName;

        const redis = require("redis");

        const client = redis.createClient({
            password: this.password,
            socket: {
                host: this.host,
                port: this.port,
            },
        });

        client.on("error", (err) =>
            console.error("Cannot connect to Redis Server: ", err),
        );

        async () => {
            await client.connect();
            console.log("Connected to Redis Server!");
        };
    }

    async uploadAppList(appList) {
        const pipeline = client.pipeline();
        appList.forEach((app) => {
            pipeline.hSet("steam:apps", app.appid, app.name);
        });
        await pipeline.exec();
        console.log("Imported App List into Redis!");
    }
}

module.exports = new RedisServices();
