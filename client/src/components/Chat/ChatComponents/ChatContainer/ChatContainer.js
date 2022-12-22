import React from "react";
import { connect } from "react-redux";
import Chat from "../Chat/Chat";

const ChatContainer = ({ data }) => data && <Chat />

const mapStateToProps = (state) => state.userStore;

export default connect(mapStateToProps, null)(ChatContainer);
