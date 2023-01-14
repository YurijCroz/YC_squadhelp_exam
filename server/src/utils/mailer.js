const mailer = require("../nodemailer");
const CONSTANTS = require("../constants");
const contestQueries = require("../controllers/queries/contestQueries");

const { CONTEST, OFFER } = CONSTANTS;

const getStatus = (passedModeration, banned) => {
  if (passedModeration && !banned) return "approved by moderator";
  if (passedModeration && banned) return "not approved by the moderator";
};

const mailerHandler = async (type, id) => {
  const message = {
    subject: "Squadhelp, moderation result",
  };
  if (type === OFFER) {
    const offer = await contestQueries.getOfferById(id);
    if (!offer) {
      return;
    }
    const user = offer.User.dataValues;
    const contest = offer.Contest.dataValues;
    message.to = user.email;
    message.text = `Hello ${user.firstName}, the offer you suggested ${
      offer.text ? offer.text : offer.originalFileName
    }, in Contest "${contest.title}", ${getStatus(
      offer.passedModeration,
      offer.banned
    )} have a nice day`;
  }
  if (type === CONTEST) {
    const contest = await contestQueries.getContestById(id);
    if (!contest) {
      return;
    }
    const user = contest.User.dataValues;
    message.to = user.email;
    message.text = `Hello ${user.firstName}, the contest you suggested "${
      contest.title
    }", ${getStatus(contest.passedModeration, contest.banned)} have a nice day`;
  }
  mailer(message);
};

module.exports = mailerHandler;
