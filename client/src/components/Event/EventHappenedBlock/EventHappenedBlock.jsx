import React from "react";
import styles from "./EventHappenedBlock.module.sass";

function EventHappenedBlock({ event, deleteEvent }) {
  return (
    <div
      className={styles.animationBlock}
      onClick={() => deleteEvent(event.startDate, event.title)}
    >
      <p className={styles.title}>{event.title}</p>
      <p>It's time</p>
    </div>
  );
}

export default EventHappenedBlock;
