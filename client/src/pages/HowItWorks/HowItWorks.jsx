import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./HowItWorks.module.sass";
import CONSTANTS from "../../constants";
import HeroBanner from "../../components/HowItWorksComponents/HeroBanner/HeroBanner";
import OurServices from "../../components/HowItWorksComponents/OurServices/OurServices";
import StepsContest from "../../components/HowItWorksComponents/StepsContest/StepsContest";
import FaqContest from "../../components/HowItWorksComponents/FaqContest/FaqContest";
import StatsSection from "../../components/HowItWorksComponents/StatsSection/StatsSection.jsx";
import classnames from "classnames";

function HowItWorks() {
  return (
    <>
      <Header />
      <main className={styles.mainContainer}>
        <section className={styles.heroBanner}>
          <HeroBanner />
        </section>
        <section className={styles.ourServices}>
          <OurServices />
        </section>
        <hr />
        <section className={styles.stepsContest}>
          <StepsContest />
        </section>
        <hr />
        <section className={styles.faqContest}>
          <FaqContest />
        </section>
        <section className={styles.ctaSection}>
          <article className={styles.ctaContainer}>
            <h3>Ready to get started?</h3>
            <p>Fill out your contest brief and begin receiving custom name suggestions within minutes.</p>
            <a href="#">Start A Contest</a>
          </article>
          <div className={classnames(styles.svgImg, styles.svgFirst)}>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}svgCTA-first.svg`}
              alt="first"
            />
          </div>
          <div className={classnames(styles.svgImg, styles.svgSecond)}>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}svgCTA-second.svg`}
              alt="second"
            />
          </div>
        </section>
        <section className={styles.stats} >
          <StatsSection />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default HowItWorks;
