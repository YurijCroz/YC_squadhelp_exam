import { useEffect, useState } from "react";
import { getDiffInSec } from "../utils/utils";

const useEventsFilter = (events, rebuild, setRebuild) => {
  const [overdueEvents, setOverdueEvents] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState(null);

  useEffect(() => {
    if (events || (rebuild && events)) {
      const newUpcomingEvents = events.filter(
        (event) => getDiffInSec(event.deadLine) >= 1
      );
      const newOverdueEvents = events.filter(
        (event) => getDiffInSec(event.deadLine) <= 0
      );
      setUpcomingEvents(
        newUpcomingEvents.length > 0 ? newUpcomingEvents : null
      );
      setOverdueEvents(
        newOverdueEvents.length > 0 ? newOverdueEvents : null
      );
      setRebuild(false);
    }
  }, [rebuild, events]);

  return [overdueEvents, upcomingEvents];
};

export default useEventsFilter;
