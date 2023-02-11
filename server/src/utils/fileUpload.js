"use strict";
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const ServerError = require("../errors/ServerError");
const env = process.env.NODE_ENV || "development";
const devFilePath = path.resolve(__dirname, "../../public");
const { logger } = require("../log");

const filePath = env === "production" ? "/var/www/html" : devFilePath;

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, {
    recursive: true,
  });
  fs.mkdirSync(`${filePath}/images_avatar`, {
    recursive: true,
  });
  fs.mkdirSync(`${filePath}/images_logo`, {
    recursive: true,
  });
  fs.mkdirSync(`${filePath}/contest_files`, {
    recursive: true,
  });
}

const storageHandler = (req) => {
  if (req.url === "/updateUser") {
    return `${filePath}/images_avatar`;
  } else if (req.url === "/setNewOffer") {
    return `${filePath}/images_logo`;
  } else if (req.url === "/updateContest" || req.url === "/pay") {
    return `${filePath}/contest_files`;
  }
};

const storageContestFiles = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, storageHandler(req));
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const uploadAvatars = multer({ storage: storageContestFiles }).single("file");

const uploadContestFiles = multer({ storage: storageContestFiles }).array(
  "files",
  3
);

const updateContestFile = multer({ storage: storageContestFiles }).single(
  "file"
);

const uploadLogoFiles = multer({ storage: storageContestFiles }).single(
  "offerData"
);

module.exports.uploadAvatar = (req, res, next) => {
  uploadAvatars(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      logger.error(err);
      next(new ServerError());
    } else if (err) {
      logger.error(err);
      next(new ServerError());
    }
    return next();
  });
};

module.exports.uploadContestFiles = (req, res, next) => {
  uploadContestFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      logger.error(err);
      next(new ServerError());
    } else if (err) {
      logger.error(err);
      next(new ServerError());
    }
    return next();
  });
};

module.exports.updateContestFile = (req, res, next) => {
  updateContestFile(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      logger.error(err);
      next(new ServerError());
    } else if (err) {
      logger.error(err);
      next(new ServerError());
    }
    return next();
  });
};

module.exports.uploadLogoFiles = (req, res, next) => {
  uploadLogoFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      logger.error(err);
      next(new ServerError());
    } else if (err) {
      logger.error(err);
      next(new ServerError());
    }
    return next();
  });
};
