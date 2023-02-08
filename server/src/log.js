"use strict";
const winston = require("winston");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

const myFormat = printf(({ message, timestamp, code, stack }) => {
  return JSON.stringify({
    message: message.replace(/"/gm, "'"),
    time: timestamp,
    code,
    stackTrace: stack.replace(/"/gm, "'"),
  });
});

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), myFormat),
  defaultMeta: { service: "user-service" },
  transports: [
    new transports.File({
      filename: `${(__dirname, "./")}/log/error.log`,
      level: "error",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.colorize(),
    })
  );
}

module.exports = logger;
