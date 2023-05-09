"use strict";
const { Router } = require("express");
const basicMiddleware = require("../middleware/basicMiddleware");
const { checkingBankAccount } = require("../middleware/checkBank");
const checkRoles = require("../middleware/checkRoles");
const paymentController = require("../controllers/paymentController");
const validators = require("../middleware/validators");
const upload = require("../utils/fileUpload");

const paymentRouter = Router();

paymentRouter.post(
  "/pay",
  checkRoles.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddleware.parseBody,
  checkingBankAccount,
  validators.validateContestCreation,
  paymentController.payment
);

paymentRouter.post(
  "/cashOut",
  checkRoles.onlyForCreative,
  paymentController.cashOut
);

module.exports = paymentRouter;
