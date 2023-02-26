"use strict";
const bd = require("../models");
const jwt = require("jsonwebtoken");
const CONSTANTS = require("../constants");

module.exports.createWhereForAllContests = (
  typeIndex,
  contestId,
  industry,
  awardSort
) => {
  const object = {
    where: {},
    order: [],
  };
  if (typeIndex) {
    Object.assign(object.where, { contestType: getPredicateTypes(typeIndex) });
  }
  if (contestId) {
    Object.assign(object.where, { id: contestId });
  }
  if (industry) {
    Object.assign(object.where, { industry });
  }
  if (awardSort) {
    object.order.push(["prize", awardSort]);
  }
  Object.assign(object.where, {
    status: {
      [bd.Sequelize.Op.or]: [
        CONSTANTS.CONTEST_STATUS_FINISHED,
        CONSTANTS.CONTEST_STATUS_ACTIVE,
      ],
    },
  });
  object.order.push(["id", "desc"]);
  return object;
};

function getPredicateTypes(index) {
  return { [bd.Sequelize.Op.or]: [types[index].split(",")] };
}

const types = [
  "",
  "name,tagline,logo",
  "name",
  "tagline",
  "logo",
  "name,tagline",
  "logo,tagline",
  "name,logo",
];

const { INSPECTION, PASSED, BANNED } = CONSTANTS.STATUS_MODERATION;

module.exports.whereHelper = (typeFilter) => {
  if (typeFilter === INSPECTION) {
    return { passedModeration: false, banned: false };
  }
  if (typeFilter === PASSED) {
    return { passedModeration: true, banned: false };
  }
  if (typeFilter === BANNED) {
    return { passedModeration: true, banned: true };
  }
  return {};
};

module.exports.getJwtToken = (userData, expiresIn) => {
  const token = jwt.sign(
    {
      firstName: userData.firstName,
      userId: userData.id,
      role: userData.role,
      lastName: userData.lastName,
      avatar: userData.avatar,
      displayName: userData.displayName,
      balance: userData.balance,
      email: userData.email,
      rating: userData.rating,
    },
    CONSTANTS.JWT_SECRET,
    { expiresIn }
  );
  return token;
};
