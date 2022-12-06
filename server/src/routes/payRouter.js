const { Router } = require("express");
const basicMiddlewares = require("../middlewares/basicMiddlewares");
const userController = require("../controllers/userController");
const checkToken = require("../middlewares/checkToken");
const validators = require("../middlewares/validators");
const upload = require("../utils/fileUpload");

const payRouter = Router();

payRouter.post(
  "/pay",
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment
);

payRouter.post(
  "/cashout",
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  userController.cashout
);


module.exports =  payRouter;