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

const backupLog = async () => {
  try {
    const errorLogFile = await fs.promises.readFile(
      `${logDir}/${errLogFileName}`,
      {
        encoding: "utf-8",
      }
    );
    if (errorLogFile) {
      await fs.promises.writeFile(`${logDir}/${errLogFileName}`, "");
      const errorLogArrObj = await getArrObjErrorLog(errorLogFile);
      const nameNewBackupFile = `${moment().format("D-M-YYYY_hh:mm:ss-a")}.log`;
      backupInFile(errorLogArrObj, nameNewBackupFile);
    }
  } catch (error) {
    logger.error(error);
  }
};

const regexObjSeparator = /(?<=\})\s*(?=\{)/gm;

const getArrObjErrorLog = (log) =>
  JSON.parse(`[${log.replace(regexObjSeparator, ",")}]`);

const backupInFile = (log, fileName) => {
  try {
    log.forEach(async ({ message, code, time }) => {
      await fs.promises.appendFile(
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
