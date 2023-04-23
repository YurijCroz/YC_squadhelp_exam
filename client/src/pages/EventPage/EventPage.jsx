import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import {
  setLocalStorageEvents,
  getLocalStorageEvents,
} from "../../actions/actionCreator";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../components/OfferBox/confirmStyle.css";
import styles from "./EventPage.module.sass";
import EventForm from "../../components/Event/EventForm/EventForm.jsx";
import { differenceInSeconds } from "date-fns";
import EventAnimationBlock from "../../components/Event/EventAnimationBlock/EventAnimationBlock.jsx";
import EventHappenedBlock from "../../components/Event/EventHappenedBlock/EventHappenedBlock.jsx";

const getDiffInSec = (dateA, dateB = new Date()) =>
  differenceInSeconds(new Date(dateA), dateB);

function EventPage(props) {
  const {
    eventData: { events, isLoadingEvents },
    setLocalStorageEvents,
  } = props;

  const [frustratedEvents, setFrustratedEvents] = useState(null);
  const [happenedEvents, setHappenedEvents] = useState(null);
  const [rebuild, setRebuild] = useState(false);

  const deleteEvent = (targetDate, title) => {
    confirmAlert({
      title: "confirm",
      message: `Do you really want to delete ${title} event?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteEventHandler(targetDate),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const deleteEventHandler = (targetDate) => {
    const newEvents = events.filter(
      ({ startDate }) => startDate !== targetDate
    );
    setLocalStorageEvents(newEvents);
  };

  useEffect(() => {
    if (!isLoadingEvents) getLocalStorageEvents();
  }, [isLoadingEvents]);

  useEffect(() => {
    if (events || (rebuild && events)) {
      setFrustratedEvents(
        events.filter((event) => getDiffInSec(event.deadLine) >= 1)
      );
      setHappenedEvents(
        events.filter((event) => getDiffInSec(event.deadLine) <= 0)
      );
      setRebuild(false);
    }
  }, [rebuild, events]);

  return (
    <>
      <main className={styles.eventMain}>
        <EventForm
          getDiffInSec={getDiffInSec}
          events={events}
          setLocalStorageEvents={setLocalStorageEvents}
        />
        <section className={styles.eventContainer}>
          <section className={styles.headerDisplay}>
            <h3>Live upcomming checks</h3>
            <div>
              <p>Remaining time</p>
              <i className="far fa-clock" />
            </div>
          </section>
          <section className={styles.eventDisplay}>
            {happenedEvents &&
              happenedEvents.map((event) => (
                <EventHappenedBlock
                  event={event}
                  key={event.startDate}
                  deleteEvent={deleteEvent}
                />
              ))}
            {frustratedEvents &&
              frustratedEvents.map((event) => (
                <EventAnimationBlock
                  event={event}
                  key={event.startDate}
                  setRebuild={setRebuild}
                  getDiffInSec={getDiffInSec}
                  deleteEvent={deleteEvent}
                />
              ))}
          </section>
        </section>
      </main>
    </>
  );
}

const mapStateToProps = (state) => {
  const eventData = state.eventsStore;
  return { eventData };
};

const mapDispatchToProps = {
  setLocalStorageEvents,
  getLocalStorageEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
