"use strict";
const db = require("../models");
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
      [db.Sequelize.Op.or]: [
        CONSTANTS.CONTEST_STATUS_FINISHED,
        CONSTANTS.CONTEST_STATUS_ACTIVE,
      ],
    },
  });
  object.order.push(["id", "desc"]);
  return object;
};

function getPredicateTypes(index) {
  return { [db.Sequelize.Op.or]: [types[index].split(",")] };
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

module.exports.createWhereForModerator = (typeFilter) => {
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
