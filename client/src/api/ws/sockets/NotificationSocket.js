import React from "react";
import { toast } from "react-toastify";
import WebSocket from "./WebSocket";
import Notification from "../../../components/Notification/Notification";

class NotificationSocket extends WebSocket {
  constructor(dispatch, getState, room) {
    super(dispatch, getState, room);
    this.userId = null;
  }

  anotherSubscribes = () => {
    this.onEntryCreated();
    this.onChangeMark();
    this.onChangeOfferStatus();
    this.onConnectError();
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

  onConnectError = () => {
    this.socket.on("connect_error", () => {
      this.socket.off("changeMark");
      this.socket.off("changeOfferStatus");
      this.socket.off("onEntryCreated");
      setTimeout(() => {
        if (this.userId) {
          this.socket.emit("subscribe", this.userId);
        }
      }, 5000);
    });
  };

  subscribe = (id) => {
    this.userId = id;
    this.socket.emit("subscribe", id);
  };

  unsubscribe = (id) => {
    this.userId = null;
    this.socket.off("changeMark");
    this.socket.off("changeOfferStatus");
    this.socket.off("onEntryCreated");
    this.socket.emit("unsubscribe", id);
  };
}

export default NotificationSocket;
