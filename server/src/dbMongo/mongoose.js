"use strict";
const mongoose = require("mongoose");
const path = require("path");
const env = process.env.NODE_ENV || "development";
const configPath = path.join(__dirname, "..", "config/mongoConfig.json");
const config = require(configPath)[env];
const { logger } = require("../log");

mongoose.connect(
  `mongodb://${config.host}:${config.port}/${config.database}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      logger.error(err);
      process.exit(1);
    } else {
      console.log("Connection with mongo db is success!!! ");
    }
  }
);
mongoose.set("debug", env === "development");

module.exports = mongoose.connection;
