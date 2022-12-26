import React from "react";
import styles from "./FaqContest.module.sass";
import faqContest from "./faqContest.json";
import GetFaqBlock from "./GetFaqBlock.jsx";

const getNavBlock = (card) => {
  return (
    <li key={card.anchor}>
      <a href={`#${card.anchor}`}>{card.section}</a>
    </li>
  );
};

function FaqContest() {
  return (
    <section className={styles.container}>
      <section className={styles.row}>
        <section className={styles.blockStartPoint}>
          <nav className={styles.navBlock}>
            <ul>{faqContest.map(getNavBlock)}</ul>
          </nav>
        </section>
        <section className={styles.faqColumn}>
          {faqContest.map((blockFaq, index) => (
            <GetFaqBlock blockFaq={blockFaq} key={index} index={index} />
          ))}
        </section>
      </section>
    </section>
  );
}

export default FaqContest;
