import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./EventPage.module.sass";
import EventForm from "../../components/EventForm/EventForm.jsx";
import EventAnimationBlock from "../../components/EventAnimationBlock/EventAnimationBlock.jsx";

function EventPage() {
  const [local, setLocal] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    if (isFetching) {
      setLocal(JSON.parse(localStorage.getItem("event")));
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
            {local &&
              local.map((event) => (
                <EventAnimationBlock event={event} key={event.startDate} setIsFetching={setIsFetching} />
              ))}
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default EventPage;
