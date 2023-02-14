"use strict";
const { Server } = require("socket.io");
const ChatSocket = require("./controllers/sockets/ChatSocket");
const NotificationSocket = require("./controllers/sockets/NotificationSocket");

let notificationSocket;
let chatSocket;

const cors = {
  origin: "*",
};

module.exports.createConnection = (httpServer) => {
  const io = new Server(httpServer, { cors });
  notificationSocket = new NotificationSocket();
  notificationSocket.connect("/notifications", io);
  chatSocket = new ChatSocket();
  chatSocket.connect("/chat", io);
};

module.exports.getChatController = () => {
  return chatSocket;
};

module.exports.getNotificationController = () => {
  return notificationSocket;
};
