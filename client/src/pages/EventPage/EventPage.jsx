import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setLocalStorageData } from "../../actions/actionCreator";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./EventPage.module.sass";
import EventForm from "../../components/Event/EventForm/EventForm.jsx";
import { differenceInSeconds } from "date-fns";
import EventAnimationBlock from "../../components/Event/EventAnimationBlock/EventAnimationBlock.jsx";
import EventHappenedBlock from "../../components/Event/EventHappenedBlock/EventHappenedBlock.jsx";
import CONSTANTS from "../../constants.js";

const { CUSTOMER } = CONSTANTS;

const getDiffInSec = (dateA, dateB = new Date()) =>
  differenceInSeconds(new Date(dateA), dateB);

function EventPage(props) {
  const {
    role,
    history,
    eventData: { events },
    setLocalStorageData,
  } = props;

  const [frustratedEvents, setFrustratedEvents] = useState(null);
  const [happenedEvents, setHappenedEvents] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (role !== CUSTOMER) history.push("/");
  }, []);

  useEffect(() => {
    if (isFetching && events) {
      setFrustratedEvents(
        events.filter((event) => getDiffInSec(event.deadLine) >= 1)
      );
      setHappenedEvents(
        events.filter((event) => getDiffInSec(event.deadLine) <= 1)
      );
    }
    setIsFetching(false);
  }, [isFetching]);

  return (
    <>
      <Header />
      <main className={styles.eventMain}>
        <EventForm
          setIsFetching={setIsFetching}
          getDiffInSec={getDiffInSec}
          events={events}
          setLocalStorageData={setLocalStorageData}
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
                <EventHappenedBlock event={event} key={event.startDate} />
              ))}
            {frustratedEvents &&
              frustratedEvents.map((event) => (
                <EventAnimationBlock
                  event={event}
                  key={event.startDate}
                  setIsFetching={setIsFetching}
                  getDiffInSec={getDiffInSec}
                />
              ))}
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  const userData = state.userStore.data;
  const eventData = state.eventsStore;
  return { ...userData, eventData };
};

const mapDispatchToProps = {
  setLocalStorageData,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
