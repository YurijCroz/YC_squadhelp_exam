"use strict";
const WebSocket = require("./WebSocket");
const CONSTANTS = require("../../constants");

class NotificationSocket extends WebSocket {
  anotherSubscribes(socket) {
    this.onSubscribe(socket);
    this.onUnsubscribe(socket);
  }

  emitEntryCreated(target) {
    this.io.to(target).emit(CONSTANTS.NOTIFICATION_ENTRY_CREATED);
  }

  emitChangeMark(target) {
    this.io.to(target).emit(CONSTANTS.NOTIFICATION_CHANGE_MARK);
  }

  emitChangeOfferStatus(target, message, contestId) {
    this.io
      .to(target)
      .emit(CONSTANTS.NOTIFICATION_CHANGE_OFFER_STATUS, { message, contestId });
  }

  onSubscribe(socket) {
    socket.on(CONSTANTS.SOCKET_SUBSCRIBE, (id) => {
      socket.join(id);
    });
  }

  onUnsubscribe(socket) {
    socket.on(CONSTANTS.SOCKET_UNSUBSCRIBE, (id) => {
      socket.leave(id);
    });
  }
}

module.exports = NotificationSocket;
