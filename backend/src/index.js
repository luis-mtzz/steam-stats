const express = require("express");
const app = express();
const PORT = 8000;

var apiSteam = require("./routers/rt.api.steam");

apiSteam(app);

app.listen(PORT || 8001, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
