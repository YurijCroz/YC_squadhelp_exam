import React from "react";
import { toast } from "react-toastify";
import WebSocket from "./WebSocket";
import Notification from "../../../components/Notification/Notification";

class NotificationSocket extends WebSocket {
  static userId = null;

  constructor(dispatch, getState, room) {
    super(dispatch, getState, room);
  }

  anotherSubscribes = () => {
    this.onEntryCreated();
    this.onChangeMark();
    this.onChangeOfferStatus();
    this.connectError();
  };

  onChangeMark = () => {
    this.socket.on("changeMark", () => {
      toast("Someone liked your offer");
    });
  };

  onChangeOfferStatus = () => {
    this.socket.on("changeOfferStatus", ({ message, contestId }) => {
      toast(<Notification message={message} contestId={contestId} />);
    });
  };

  onEntryCreated = () => {
    this.socket.on("onEntryCreated", () => {
      toast("New Entry");
    });
  };

  connectError = () => {
    this.socket.on("connect_error", () => {
      setTimeout(() => {
        if (NotificationSocket.userId) {
          this.socket.emit("subscribe", NotificationSocket.userId);
        }
      }, 5000);
    });
  };

  subscribe = (id) => {
    NotificationSocket.userId = id;
    this.socket.emit("subscribe", id);
  };

  unsubscribe = (id) => {
    NotificationSocket.userId = null;
    this.socket.emit("unsubscribe", id);
  };
}

export default NotificationSocket;
