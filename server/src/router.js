"use strict";
const { Router } = require("express");

const router = Router();

// authRouter  /api/auth

const authRouter = require("./routes/authRouter.js");
router.use("/auth", authRouter);

// contestRouter /api/contests

const contestRouter = require("./routes/contestRouter.js");
router.use("/contests", contestRouter);

// moderatorRouter /api/moderation

const moderatorRouter = require("./routes/moderatorRouter.js");
router.use("/moderation", moderatorRouter);

// userRouter /api/users

const usersRouter = require("./routes/userRouter.js");
router.use("/users", usersRouter);

// chatRouter /api/chat

const chatRouter = require("./routes/chatRouter.js");
router.use("/chat", chatRouter);

// payRouter  /api/pay

const payRouter = require("./routes/payRouter.js");
router.use("/pay", payRouter);

module.exports = router;
