import React from "react";
import { connect } from "react-redux";
import Chat from "../Chat/Chat";
import CONSTANTS from "../../../../constants";

const ChatContainer = ({ data }) =>
  data && data.role !== CONSTANTS.MODER && <Chat />;

const mapStateToProps = (state) => state.userStore;

export default connect(mapStateToProps, null)(ChatContainer);
