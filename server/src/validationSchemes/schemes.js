"use strict";
const yup = require("yup");

module.exports.registrationScheme = yup.object().shape({
  firstName: yup.string().required().min(1),
  lastName: yup.string().required().min(1),
  displayName: yup.string().required().min(1),
  email: yup.string().email().required().min(4),
  password: yup.string().required().min(6),
  role: yup
    .string()
    .matches(/(customer|creator)/)
    .required(),
});

module.exports.loginScheme = yup.object().shape({
  email: yup.string().email().required().min(4),
  password: yup.string().required().min(1),
});

module.exports.contestScheme = yup.object().shape({
  contestType: yup
    .string()
    .matches(/(name|logo|tagline)/)
    .required(),
  fileName: yup.string().min(1),
  originalFileName: yup.string().min(1),
  title: yup.string().required().min(1),
  typeOfName: yup.string().min(1),
  industry: yup.string().required().min(1),
  focusOfWork: yup.string().required().min(1),
  targetCustomer: yup.string().required().min(1),
  styleName: yup.string().min(1),
  nameVenture: yup.string().min(1),
  typeOfTagline: yup.string().min(1),
  brandStyle: yup.string().min(1),
});

module.exports.addMessageScheme = yup.object().shape({
  messageBody: yup.string().required().min(1),
  recipient: yup.number().required(),
  interlocutor: yup.object().shape({
    id: yup.number().required(),
    firstName: yup.string().required().min(1),
    lastName: yup.string().required().min(1),
    displayName: yup.string().required().min(1),
    avatar: yup.string().required().min(1),
  }),
});

module.exports.getChatScheme = yup.object().shape({
  interlocutorId: yup.number().required(),
});

module.exports.blackListScheme = yup.object().shape({
  blackListFlag: yup.boolean().required(),
  participants: yup.array().of(yup.number()).required(),
});

module.exports.favoriteChatScheme = yup.object().shape({
  favoriteFlag: yup.boolean().required(),
  participants: yup.array().of(yup.number()).required(),
});

module.exports.createCatalogScheme = yup.object().shape({
  catalogName: yup.string().required().min(1),
  chatId: yup.number().required(),
});

module.exports.updateNameCatalogScheme = yup.object().shape({
  catalogName: yup.string().required().min(1),
  catalogId: yup.number().required(),
});

module.exports.addAndRemoveChatToCatalogScheme = yup.object().shape({
  chatId: yup.number().required(),
  catalogId: yup.number().required(),
});

module.exports.deleteCatalogScheme = yup.object().shape({
  catalogId: yup.number().required(),
});
