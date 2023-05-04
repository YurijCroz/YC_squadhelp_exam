import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import {
  setLocalStorageEvents,
  getLocalStorageEvents,
} from "../../actions/actionCreator";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useEventsFilter } from "../../hook";
import "../../components/OfferBox/confirmStyle.css";
import styles from "./EventPage.module.sass";
import EventForm from "../../components/Event/EventForm/EventForm.jsx";
import UpcomingEventsController from "../../components/Event/UpcomingEventsController/UpcomingEventsController";
import EventHappenedBlock from "../../components/Event/EventHappenedBlock/EventHappenedBlock.jsx";

function EventPage(props) {
  const {
    eventData: { events, isLoadingEvents },
    setLocalStorageEvents,
  } = props;

  const [rebuild, setRebuild] = useState(false);
  const [overdueEvents, upcomingEvents] = useEventsFilter(
    events,
    rebuild,
    setRebuild
  );

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

  return (
    <>
      <main className={styles.eventMain}>
        <EventForm
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
            {overdueEvents &&
              overdueEvents.map((event) => (
                <EventHappenedBlock
                  event={event}
                  key={event.startDate}
                  deleteEvent={deleteEvent}
                />
              ))}
            {upcomingEvents && (
              <UpcomingEventsController
                upcomingEvents={upcomingEvents}
                setRebuild={setRebuild}
                deleteEvent={deleteEvent}
              />
            )}
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
