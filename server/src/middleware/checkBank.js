"use strict";
const { Bank } = require("../models");
const NotEnoughMoney = require("../errors/NotEnoughMoney");
const BankDeclineError = require("../errors/BankDeclineError");
const { logger } = require("../log");

module.exports.checkingBankAccount = async (req, res, next) => {
  try {
    const card = await Bank.findOne({
      where: {
        cardNumber: req.body.number.replace(/ /g, ""),
        expiry: req.body.expiry,
        cvc: req.body.cvc,
      },
      attributes: ["balance"],
      nest: true,
      raw: true,
    });
    if (!card) {
      return next(new BankDeclineError());
    }
    if (card.balance - req.body.price < 0) {
      return next(new NotEnoughMoney());
    }
    next();
  } catch (error) {
    next(error);
    logger.error(error);
  }
};
