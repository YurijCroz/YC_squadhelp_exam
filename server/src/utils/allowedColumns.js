"use strict";
const pick = require("lodash/pick");

const allowedColumnsForContest = [
  "title",
  "industry",
  "focusOfWork",
  "targetCustomer",
  "styleName",
  "typeOfName",
  "nameVenture",
  "brandStyle",
  "fileName",
  "originalFileName",
  "typeOfTagline",
];

module.exports.pickAllowedColumnsForContest = (body) => {
  return pick(body, allowedColumnsForContest);
};
