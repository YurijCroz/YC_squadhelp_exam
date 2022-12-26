import React from "react";
import styles from "./SatisfactionCard.module.sass";

function SatisfactionCard() {
  return (
    <article className={styles.card}>
      <section className={styles.card__body}>
        <h4 className={styles.card__textPrimary}>We Stand By Our Process.</h4>
        <p className={styles.card__text}>If you are not satisfied receive</p>
        <ul className={styles.card__listUnstyled}>
          <li className={styles.card__list}>
            <div className={styles.card__media}>
              <span className={styles.card__btnIcon}>
                <span className="fas fa-heart"></span>
              </span>
              <div className={styles.card__media_text}>
                Complimentary extension of your contest timeline.
              </div>
            </div>
          </li>
          <li className={styles.card__list}>
            <div className={styles.card__media}>
              <span className={styles.card__btnIcon}>
                <span className="fas fa-smile"></span>
              </span>
              <div className={styles.card__media_text}>
                Complimentary consultation with a Squadhelp branding consultant.
              </div>
            </div>
          </li>
          <li className={styles.card__list}>
            <div className={styles.card__media}>
              <span className={styles.card__btnIcon}>
                <span className="fab fa-studiovinari"></span>
              </span>
              <div className={styles.card__media_text}>
                Apply your contest award toward the purchase of any premium name
                from our Marketplace.
              </div>
            </div>
          </li>
          <li className={styles.card__list}>
            <div className={styles.card__media}>
              <span className={styles.card__btnIcon}>
                <span className="fab fa-steam-symbol"></span>
              </span>
              <div className={styles.card__media_text}>
                Partial refund for Gold and Platinum packages.{" "}
                <a href="#">Read more.</a>
              </div>
            </div>
          </li>
          <li className={styles.card__list}>
            <div className={styles.card__media}>
              <span className={styles.card__btnIcon}>
                <span className="fas fa-table-tennis"></span>
              </span>
              <div className={styles.card__media_text}>
                No-questions-asked refund within 10 days for any marketplace
                domains purchased. <a href="#">Read more.</a>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <section className={styles.card__footer}>
        <button className={styles.card__btn}>Close</button>
      </section>
    </article>
  );
}

export default SatisfactionCard;
