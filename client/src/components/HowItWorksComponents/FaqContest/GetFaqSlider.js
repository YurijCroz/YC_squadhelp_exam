import React, { useEffect, useState } from "react";
import styles from "./FaqContest.module.sass";
import { Collapse } from "react-collapse";
import classnames from "classnames";

function GetFaqSlider({ card, index, isAllCollapsed, setIsAllCollapsed }) {
  const [isOpen, setIsOpen] = useState(false);
  const [handlerHelper, setHandlerHelper] = useState(false);

  useEffect(() => {
    if (index === 0) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (isAllCollapsed) {
      setIsOpen(false);
      setIsAllCollapsed(false);
    }
  });

  useEffect(() => {
    if (handlerHelper) {
      setIsOpen(!isOpen);
      setHandlerHelper(false);
    }
  });

  const activeHandler = () => {
    setIsAllCollapsed(true);
    setHandlerHelper(true);
  };

  return (
    <article className={styles.card}>
      <section className={styles.card__header}>
        <button onClick={activeHandler} className={styles.btn}>
          <h5>{card.question}</h5>
          <span
            className={classnames(styles.btn__arrows, {
              [styles.btn__arrows_collapse]: isOpen,
            })}
          >
            <span className="fas fa-arrow-down"></span>
          </span>
        </button>
      </section>
      <Collapse
        isOpened={isOpen}
        isFullyOpened={true}
        theme={{ collapse: styles.collapse, content: styles.card__body }}
      >
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
      </Collapse>
    </article>
  );
}

export default GetFaqSlider;
