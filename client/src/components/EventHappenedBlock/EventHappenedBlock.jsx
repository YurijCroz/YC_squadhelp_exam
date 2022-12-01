import React from "react";
import styles from "./EventHappenedBlock.module.sass";

function EventHappenedBlock({event}) {
  return (
    <div className={styles.animationBlock}>
      <p className={styles.title}>{event.title}</p>
      <p>It's time</p>
    </div>
  );
}

export default EventHappenedBlock;
