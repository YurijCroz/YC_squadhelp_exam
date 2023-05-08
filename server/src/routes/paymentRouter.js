"use strict";
const { Router } = require("express");
const basicMiddleware = require("../middleware/basicMiddleware");
const paymentController = require("../controllers/paymentController");
const validators = require("../middleware/validators");
const upload = require("../utils/fileUpload");

const paymentRouter = Router();

paymentRouter.post(
  "/pay",
  basicMiddleware.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddleware.parseBody,
  validators.validateContestCreation,
  paymentController.payment
);

paymentRouter.post(
  "/cashOut",
  basicMiddleware.onlyForCreative,
  paymentController.cashOut
);

module.exports = paymentRouter;
