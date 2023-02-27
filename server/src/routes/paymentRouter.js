"use strict";
const { Router } = require("express");
const basicMiddleware = require("../middleware/basicMiddleware");
const paymentController = require("../controllers/paymentController");
const checkToken = require("../middleware/checkToken");
const validators = require("../middleware/validators");
const upload = require("../utils/fileUpload");

const paymentRouter = Router();

paymentRouter.post(
  "/pay",
  checkToken.checkToken,
  basicMiddleware.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddleware.parseBody,
  validators.validateContestCreation,
  paymentController.payment
);

paymentRouter.post(
  "/cashOut",
  checkToken.checkToken,
  basicMiddleware.onlyForCreative,
  paymentController.cashOut
);

module.exports = paymentRouter;
