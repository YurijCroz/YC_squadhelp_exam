"use strict";
const jwt = require("jsonwebtoken");

const getJwtToken = (userData, secret, expiresIn) => {
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
    secret,
    { expiresIn }
  );
  return token;
};

module.exports = getJwtToken;
