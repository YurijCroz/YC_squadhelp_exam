"use strict";
const CONSTANTS = require("../../constants");

class WebSocket {
  connect(namespace, io) {
    this.io = io.of(namespace);
    this.listen();
  }

  listen() {
    this.io.on(CONSTANTS.SOCKET_CONNECTION, (socket) => {
      this.anotherSubscribes(socket);
    }); 
  }
}

module.exports = WebSocket;
