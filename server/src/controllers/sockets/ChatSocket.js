"use strict";
const WebSocket = require("./WebSocket");
const CONSTANTS = require("../../constants");

class ChatSocket extends WebSocket {
  anotherSubscribes(socket) {
    this.onSubscribeChat(socket);
    this.onUnsubscribeChat(socket);
  }

  onSubscribeChat(socket) {
    socket.on("subscribeChat", (id) => {
      socket.join(id);
    });
  }

  onUnsubscribeChat(socket) {
    socket.on("unsubscribeChat", (id) => {
      socket.leave(id);
    });
  }

  emitNewMessage(target, message) {
    this.io.to(target).emit(CONSTANTS.NEW_MESSAGE, { message });
  }

  emitChangeBlockStatus(target, message) {
    this.io.to(target).emit(CONSTANTS.CHANGE_BLOCK_STATUS, { message });
  }
}

module.exports = ChatSocket;
