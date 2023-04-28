import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getLocalStorageEvents } from "../../../actions/actionCreator";
import CONSTANTS from "../../../constants";
import EventBadge from "../EventBadge/EventBadge.jsx";
import { getDiffInSec } from "../../../utils/utils";

const { EVENT_INTERVAL } = CONSTANTS;

const EventController = ({
  eventData: { events, isLoadingEvents },
  getLocalStorageEvents,
}) => {
  const [happenedEvents, setHappenedEvents] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!isLoadingEvents) getLocalStorageEvents();
  }, [isLoadingEvents]);

  useEffect(() => {
    if (isLoadingEvents) {
      if (isFetching && events) {
        const localFilter = events.filter(
          (event) => getDiffInSec(event.deadLine) <= 0
        );
        setHappenedEvents(localFilter.length !== 0 ? localFilter : null);
      } else if (isFetching && !events) {
        setHappenedEvents(null);
      }
      setIsFetching(false);
    }
  }, [isFetching, events]);

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

const mapDispatchToProps = {
  getLocalStorageEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventController);
