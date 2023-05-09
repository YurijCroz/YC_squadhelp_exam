"use strict";
const { Router } = require("express");
const { checkToken } = require("./middleware/checkToken");
const { onlyForModerator } = require("./middleware/checkRoles");

const router = Router();

const authRouter = require("./routes/authRouter.js");
router.use("/auth", authRouter);

const contestRouter = require("./routes/contestRouter.js");
router.use("/contests", contestRouter);

const moderatorRouter = require("./routes/moderatorRouter.js");
router.use("/moderation", checkToken, onlyForModerator, moderatorRouter);

const usersRouter = require("./routes/userRouter.js");
router.use("/users", usersRouter);

const chatRouter = require("./routes/chatRouter.js");
router.use("/chat", checkToken, chatRouter);

const chatRouterSQL = require("./routes/chatRouterSQL.js");
router.use("/chatSQL", checkToken, chatRouterSQL);

const paymentRouter = require("./routes/paymentRouter.js");
router.use("/payment", checkToken, paymentRouter);

module.exports = router;
