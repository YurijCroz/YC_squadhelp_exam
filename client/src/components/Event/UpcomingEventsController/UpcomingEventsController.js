import React, { useEffect, useState } from "react";
import EventAnimationBlock from "../EventAnimationBlock/EventAnimationBlock.jsx";

function UpcomingEventsController({ upcomingEvents, setRebuild, deleteEvent }) {
  const [nowDate, setNowDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNowDate(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {upcomingEvents.map((event) => (
        <EventAnimationBlock
          key={event.startDate}
          event={event}
          nowDate={nowDate}
          setRebuild={setRebuild}
          deleteEvent={deleteEvent}
        />
      ))}
    </>
  );
}

export default UpcomingEventsController;
