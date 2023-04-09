import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CONSTANTS from "../../../constants";
import { differenceInSeconds } from "date-fns";
import EventBadge from "../EventBadge/EventBadge.jsx";

const { EVENT_INTERVAL } = CONSTANTS;

const getDiffInSec = (dateA, dateB = new Date()) =>
  differenceInSeconds(new Date(dateA), dateB);

const EventController = ({ eventData: { events } }) => {
  const [happenedEvents, setHappenedEvents] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (isFetching && events) {
      const localFilter = events.filter(
        (event) => getDiffInSec(event.deadLine) <= 1
      );
      setHappenedEvents(localFilter.length !== 0 ? localFilter : null);
    } else if (isFetching && !events) {
      setHappenedEvents(null);
    }
    setIsFetching(false);
  }, [isFetching]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFetching(true);
    }, EVENT_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return happenedEvents && <EventBadge quantity={happenedEvents.length} />;
};

const mapStateToProps = (state) => {
  const eventData = state.eventsStore;
  return { eventData };
};

export default connect(mapStateToProps)(EventController);
