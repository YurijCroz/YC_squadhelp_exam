import React from "react";
import CONSTANTS from "../../../constants";
import styles from "./PricingSection.module.sass";

function PricingSection() {
  return (
    <section className={styles.container}>
      <section className={styles.firstContainer}>
        <article className={styles.infoBlock}>
          <ul className={styles.listUnstyled}>
            <li className={styles.media}>
              <span className={styles.btnIcon}>
                <span className="fas fa-angle-right"></span>
              </span>
              <div className={styles.media__body}>
                <h5>Pay a Fraction of cost vs hiring an agency</h5>
                <p>
                  For as low as $199, our naming contests and marketplace allow
                  you to get an amazing brand quickly and affordably.
                </p>
              </div>
            </li>
            <li className={styles.border}></li>
            <li className={styles.media}>
              <span className={styles.btnIcon}>
                <span className="fas fa-angle-right"></span>
              </span>
              <div className={styles.media__body}>
                <h4>Satisfaction Guarantee</h4>
                <p>
                  Of course! We have policies in place to ensure that you are
                  satisfied with your experience. <a href="https://www.google.com/">Learn more</a>
                </p>
              </div>
            </li>
          </ul>
        </article>
      </section>
      <section className={styles.secondContainer}>
        <article className={styles.infoBlock} >
          <ul className={styles.listUnstyled} >
            <li className={styles.media} >
              <div className={styles.media__body} >
                <h3>Questions?</h3>
                <p className={styles.whiteText} >Speak with a Squadhelp platform expert to learn more and get your questions answered.</p>
                <button className={styles.whiteBtn} >Schedule Consultation</button>
                <a href={`tel:${CONSTANTS.CONTACTS.TEL}`} >
                  <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone_icon.svg`} alt="phone-call" />
                  {CONSTANTS.CONTACTS.TEL}
                </a>
                <span>Call us for assistance</span>
              </div>
            </li>
          </ul>
        </article>
      </section>
    </section>
  );
}

export default PricingSection;
