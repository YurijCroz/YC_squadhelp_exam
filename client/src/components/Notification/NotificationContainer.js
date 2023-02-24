import React from "react";
import { connect } from "react-redux";
import NotificationConnect from "./NotificationConnect";

const NotificationContainer = ({ data }) => data && <NotificationConnect />;

const mapStateToProps = (state) => state.userStore;

export default connect(mapStateToProps, null)(NotificationContainer);
