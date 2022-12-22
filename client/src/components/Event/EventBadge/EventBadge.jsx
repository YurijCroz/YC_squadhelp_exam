import React from "react";
import styles from "./EventBadge.module.sass";
import { Link } from "react-router-dom";

function EventBadge({ quantity }) {
  return (
    <Link to="/events">
      <div className={styles.container}>
        <div className={styles.badge}>
          <div className={styles.quantity} >{quantity}</div>
        </div>
      </div>
    </Link>
  );
}

export default EventBadge;
