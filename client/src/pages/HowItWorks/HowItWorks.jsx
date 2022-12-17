import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./HowItWorks.module.sass";
import CONSTANTS from "../../constants";
import HeroBanner from "../../components/HowItWorksComponents/HeroBanner/HeroBanner";
import OurServices from "../../components/HowItWorksComponents/OurServices/OurServices";
import StepsContest from "../../components/HowItWorksComponents/StepsContest/StepsContest";
import FaqContest from "../../components/HowItWorksComponents/FaqContest/FaqContest";


function HowItWorks() {
  return (
    <>
      <Header />
      <main className={styles.mainContainer}>
        <section className={styles.heroBanner}>
          <HeroBanner />
        </section>
        <section className={styles.ourServices} >
          <OurServices />
        </section>
        <hr/>
        <section className={styles.stepsContest} >
          <StepsContest />
        </section>
        <hr/>
        <section className={styles.faqContest} >
          <FaqContest />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default HowItWorks;
