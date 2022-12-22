import React from "react";
import { connect } from "react-redux";
import CONSTANTS from "../../../constants";
import EventController from "../EventController/EventController";

const EventVerification = ({ role }) =>
  role === CONSTANTS.CUSTOMER && <EventController />;

const mapStateToProps = (state) => state.userStore.data;

export default connect(mapStateToProps)(EventVerification);
