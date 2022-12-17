import React from "react";
import styles from "./FaqContest.module.sass";
import classnames from "classnames";
import "./styleID.sass"

// const regTag = /(<([^>]+)>)/gim;
const keyForID = [
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];

function GetFaqSlider({ card, anchor, index }) {
  const idCard = `${anchor}${keyForID[index]}`;

  const test = (event) => {};

  return (
    <article className={styles.card}>
      <section className={styles.card__header}>
        <button data-active={idCard} onClick={test} className={styles.btn}>
          <h5>{card.question}</h5>
          <span className="fas fa-arrow-down"></span>
        </button>
      </section>
      <section id={idCard} className="animation height" >
        <section className={styles.card__body}>
          <div
            className={styles.card__text}
            dangerouslySetInnerHTML={{ __html: card.reply }}
          />
          {card.listing && (
            <ul className={styles.card__listing}>
              {card.listing.map((li, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: li }} />
              ))}
            </ul>
          )}
        </section>
      </section>
    </article>
  );
}

export default GetFaqSlider;
