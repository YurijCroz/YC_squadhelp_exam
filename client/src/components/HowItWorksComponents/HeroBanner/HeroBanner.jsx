import React from "react";
import styles from "./HeroBanner.module.sass";
import CONSTANTS from "../../../constants";

function HeroBanner() {
  return (
    <section className={styles.container}>
      <section className={styles.content}>
        <article className={styles.articleSection}>
          <span>World's #1 Naming Platform</span>
          <h1>How Does Squadhelp Work?</h1>
          <p>
            Squadhelp helps you come up with a great name for your business by
            combining the power of crowdsourcing with sophisticated technology
            and Agency-level validation services.
          </p>
          <a href="#"><i className="fas fa-play" />Play Video</a>
        </article>
        <section className={styles.images}>
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}svgMobile.svg`} alt="mobile" />
        </section>
      </section>
    </section>
  );
}

export default HeroBanner;
