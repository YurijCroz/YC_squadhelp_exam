import socketIoClient from "socket.io-client";
import CONSTANTS from "../../../constants";

class WebSocket {
  constructor(dispatch, getState, room) {
    this.dispatch = dispatch;
    this.getState = getState;
    this.socket = socketIoClient(`${CONSTANTS.BASE_URL}${room}`, {
      randomizationFactor: 2,
      reconnectionDelay: 1500,
    });
    this.listen();
  }

  listen = () => {
    this.socket.on("connect", () => {
      this.anotherSubscribes();
    });
  };
}

export default WebSocket;
