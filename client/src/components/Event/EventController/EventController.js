import React, { useEffect, useState } from "react";
import CONSTANTS from "../../../constants";
import { differenceInSeconds } from "date-fns";
import EventBadge from "../EventBadge/EventBadge.jsx";

const getItemLocal = () => localStorage.getItem(CONSTANTS.EVENT_KEY);

const getDiffInSec = (dateA, dateB = new Date()) =>
  differenceInSeconds(new Date(dateA), dateB);

const EventController = () => {
  const [happenedEvents, setHappenedEvents] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (isFetching && getItemLocal()) {
      const localFilter = JSON.parse(getItemLocal()).filter(
        (event) => getDiffInSec(event.deadLine) <= 1
      );
      setHappenedEvents(localFilter.length !== 0 ? localFilter : null);
    } else if (isFetching && !getItemLocal()) {
      setHappenedEvents(null);
    }
    setIsFetching(false);
  }, [isFetching]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFetching(true);
    }, CONSTANTS.EVENT_INTERVAL);
    return () => clearInterval(interval);
  });

  return happenedEvents && <EventBadge quantity={happenedEvents.length} />;
};

export default EventController;
