import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./EventPage.module.sass";
import EventForm from "../../components/EventForm/EventForm.jsx";

function EventPage() {

  return (
    <>
      <Header />
      <main>
        <EventForm/>
        <section className={styles.eventContainer}>
          <section className={styles.headerDisplay}>
            <h3>Live upcomming checks</h3>
            <div>
              <p>Remaining time</p>
              <i className="far fa-clock" />
            </div>
          </section>
          <section className={styles.eventDisplay}>
            <div className={styles.animationBlock}>
              <div className={styles.worm}></div>
              <p className={styles.title}>
                Server uptime check on hosting provider
              </p>
              <p>6m 18s</p>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default EventPage;
