"use strict";
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;
const fs = require("fs");
const path = require("path");
const logDir = path.resolve(__dirname, "../log/");
const backupLogDir = path.resolve(__dirname, "../log/backupLog/");
const errLogFileName = "error.log";
const moment = require("moment");

if (!fs.existsSync(backupLogDir)) {
  fs.mkdirSync(backupLogDir, {
    recursive: true,
  });
}

// logger
const myFormat = printf(({ message, timestamp, code, stack }) => {
  return JSON.stringify({
    message: message.replace(/"/gm, "'"),
    time: timestamp,
    code,
    stackTrace: { stack: stack.replace(/"/gm, "'") },
  });
});

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), myFormat),
  defaultMeta: { service: "user-service" },
  transports: [
    new transports.File({
      filename: `${logDir}/${errLogFileName}`,
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

// backup log

const backupLog = () => {
  try {
    const errorLogFile = fs.readFileSync(`${logDir}/${errLogFileName}`, {
      encoding: "utf-8",
    });
    fs.writeFileSync(`${logDir}/${errLogFileName}`, "");
    const errorLogArrObj = getArrObjErrorLog(errorLogFile);
    const nameNewBackupFile = `${moment().format("D-M-YYYY_hh:mm:ss")}.log`;
    backupInFile(errorLogArrObj, nameNewBackupFile);
  } catch (error) {
    logger.error(error);
  }
};

const getArrObjErrorLog = (log) =>
  JSON.parse(
    log
      .slice(0, -1)
      .replace(/(?<=})$/, "]")
      .replace(/(?<=})$/gm, ",")
      .replace(/^/, "[")
  );

const backupInFile = (log, fileName) => {
  try {
    log.forEach(({ message, code, time }) => {
      fs.appendFileSync(
        `${backupLogDir}/${fileName}`,
        JSON.stringify({
          message,
          code,
          time,
        }) + "\n"
      );
    });
  } catch (error) {
    logger.error(error);
  }
};

module.exports = { logger, backupLog };
