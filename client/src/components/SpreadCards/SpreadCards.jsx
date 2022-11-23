import React from 'react';
import styles from "./SpreadCards.module.sass";
import CONSTANTS from '../../constants';

function SpreadCards({cards}) {
  return (
    <section className={styles.cardContainer}>
        {cards.map((card, index)=>(
            <article className={styles.card} key={index}>
              <img src={`${CONSTANTS.STATIC_IMAGES_PATH}${card.img}`} alt={`${card.imgAlt}`}/>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
        ))}
    </section>
  )
}

export default SpreadCards