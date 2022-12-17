import React from "react";
import styles from "./FaqContest.module.sass";
import faqContest from "./faqContest.json";
import GetFaqSlider from "./GetFaqSlider";

function GetFaqBlock({ blockFaq, index }) {
  return (
    <>
      <section id={blockFaq.anchor} className={styles.faqSection}>
        <div className={styles.headline}>
          <h3>{blockFaq.section}</h3>
        </div>
        <section className={styles.faqAccordion}>
          {blockFaq.faq.map((card, index) => (
            <GetFaqSlider
              card={card}
              key={index}
              anchor={blockFaq.anchor}
              index={index}
            />
          ))}
        </section>
      </section>
      {index !== faqContest.length - 1 && <hr />}
    </>
  );
}

export default GetFaqBlock;
