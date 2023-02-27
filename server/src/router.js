"use strict";
const { Router } = require("express");

const router = Router();

const authRouter = require("./routes/authRouter.js");
router.use("/auth", authRouter);

const contestRouter = require("./routes/contestRouter.js");
router.use("/contests", contestRouter);

const moderatorRouter = require("./routes/moderatorRouter.js");
router.use("/moderation", moderatorRouter);

const usersRouter = require("./routes/userRouter.js");
router.use("/users", usersRouter);

const chatRouter = require("./routes/chatRouter.js");
router.use("/chat", chatRouter);

const chatRouterSQL = require("./routes/chatRouterSQL.js");
router.use("/chatSQL", chatRouterSQL);

const paymentRouter = require("./routes/paymentRouter.js");
router.use("/payment", paymentRouter);

module.exports = router;
