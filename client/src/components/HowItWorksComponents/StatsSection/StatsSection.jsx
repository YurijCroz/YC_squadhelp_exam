import React from "react";
import styles from "./StatsSection.module.sass";
import CONSTANTS from "../../../constants";
import classnames from "classnames";

function StatsSection() {
  return (
    <section className={styles.section}>
      <article className={classnames(styles.card, styles.verticalIndicator)}>
        <section className={styles.card__stats}>
          <div className={styles.card__images}>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}stars.svg`} alt="stars" />
          </div>
          <p className={styles.card__text}>
            <span>4.9 out of 5 stars</span> from 25,000+ customers.
          </p>
        </section>
      </article>
      <article className={classnames(styles.card, styles.verticalIndicator)}>
        <section className={styles.card__stats}>
          <div
            className={classnames(
              styles.card__images,
              styles.card__images_people
            )}
          >
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}people-photo.webp`}
              alt="people"
            />
          </div>
          <p className={styles.card__text}>
            Our branding community stands <span>200,000+</span> strong.
          </p>
        </section>
      </article>
      <article className={classnames(styles.card, styles.lastCard)}>
        <section className={styles.card__stats}>
          <div className={styles.card__images}>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}sharing-files.svg`}
              alt="files"
            />
          </div>
          <p className={styles.card__text}>
            <span>140+ Industries</span> supported across more than{" "}
            <span>85 countries</span>
            <br />– and counting.
          </p>
        </section>
      </article>
    </section>
  );
}

export default StatsSection;
