import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getLocalStorageEvents } from "../../../actions/actionCreator";
import { useEventsFilter } from "../../../hook";
import CONSTANTS from "../../../constants";
import EventBadge from "../EventBadge/EventBadge.jsx";

const { EVENT_INTERVAL } = CONSTANTS;

const EventController = ({
  eventData: { events, isLoadingEvents },
  getLocalStorageEvents,
}) => {
  const [rebuild, setRebuild] = useState(true);
  const [overdueEvents] = useEventsFilter(events, rebuild, setRebuild);

  useEffect(() => {
    if (!isLoadingEvents) getLocalStorageEvents();
  }, [isLoadingEvents]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRebuild(true);
    }, EVENT_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return overdueEvents && <EventBadge quantity={overdueEvents.length} />;
};

const mapStateToProps = (state) => {
  const eventData = state.eventsStore;
  return { eventData };
};

const mapDispatchToProps = {
  getLocalStorageEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventController);
