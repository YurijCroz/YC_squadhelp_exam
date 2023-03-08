import isEqual from "lodash/isEqual";
import WebSocket from "./WebSocket";
import CONSTANTS from "../../../constants";
import {
  addMessage,
  changeBlockStatusInStore,
} from "../../../actions/actionCreator";

class ChatSocket extends WebSocket {
  static userId = null;

  constructor(dispatch, getState, room) {
    super(dispatch, getState, room);
  }

  anotherSubscribes = () => {
    this.onNewMessage();
    this.onChangeBlockStatus();
    this.connectError();
  };

  onChangeBlockStatus = () => {
    this.socket.on(CONSTANTS.CHANGE_BLOCK_STATUS, (data) => {
      const { message } = data;
      const { messagesPreview } = this.getState().chatStore;
      messagesPreview.forEach((preview) => {
        if (isEqual(preview.participants, message.participants))
          preview.blackList = message.blackList;
      });
      this.dispatch(
        changeBlockStatusInStore({ chatData: message, messagesPreview })
      );
    });
  };

  onNewMessage = () => {
    this.socket.on("newMessage", (data) => {
      const { message, preview } = data.message;
      const { messagesPreview } = this.getState().chatStore;
      let isNew = true;
      messagesPreview.forEach((preview) => {
        if (isEqual(preview.participants, message.participants)) {
          preview.text = message.body;
          preview.sender = message.sender;
          preview.createAt = message.createdAt;
          isNew = false;
        }
      });
      if (isNew) {
        messagesPreview.push(preview);
      }
      this.dispatch(addMessage({ message, messagesPreview }));
    });
  };

  connectError = () => {
    this.socket.on("connect_error", () => {
      this.socket.off(CONSTANTS.CHANGE_BLOCK_STATUS);
      this.socket.off("newMessage");
      setTimeout(() => {
        if (ChatSocket.userId) {
          this.socket.emit("subscribeChat", ChatSocket.userId);
        }
      }, 5000);
    });
  };

  subscribeChat = (id) => {
    ChatSocket.userId = id;
    this.socket.emit("subscribeChat", id);
  };

  unsubscribeChat = (id) => {
    ChatSocket.userId = null;
    this.socket.off(CONSTANTS.CHANGE_BLOCK_STATUS);
    this.socket.off("newMessage");
    this.socket.emit("unsubscribeChat", id);
  };
}

export default ChatSocket;
