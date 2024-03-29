"use strict";
const http = require("http");
const app = require("./app.js");
const controller = require("./socketInit");
const job = require("./cron");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);

job.start()

controller.createConnection(server);
