import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./EventPage.module.sass";
import EventForm from "../../components/EventForm/EventForm.jsx";
import { differenceInSeconds } from "date-fns";
import EventAnimationBlock from "../../components/EventAnimationBlock/EventAnimationBlock.jsx";
import EventHappenedBlock from "../../components/EventHappenedBlock/EventHappenedBlock.jsx";

function EventPage() {
  const [frustratedEvents, setFrustratedEvents] = useState(null);
  const [happenedEvents, setHappenedEvents] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (isFetching && localStorage.getItem("event")) {
      setFrustratedEvents(
        JSON.parse(localStorage.getItem("event")).filter(
          (event) =>
            differenceInSeconds(new Date(event.deadLine), new Date()) >= 1
        )
      );
      setHappenedEvents(
        JSON.parse(localStorage.getItem("event")).filter(
          (event) =>
            differenceInSeconds(new Date(event.deadLine), new Date()) <= 1
        )
      );
      setIsFetching(false);
    } else {
      setIsFetching(false);
    }
  });

  return (
    <>
      <Header />
      <main>
        <EventForm setIsFetching={setIsFetching} />
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
                />
              ))}
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default EventPage;
