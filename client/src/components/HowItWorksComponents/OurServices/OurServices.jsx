import React from "react";
import styles from "./OurServices.module.sass";
import ServicesCard from "./ServicesCard.jsx";
import cards from "./cardsContent.json";

function OurServices() {

  return (
    <section className={styles.container}>
      <article className={styles.headArticle}>
        <span>Our Services</span>
        <h2>3 Ways To Use Squadhelp</h2>
        <p>Squadhelp offers 3 ways to get you a perfect name for your business.</p>
      </article>
      <section className={styles.cardsContainer} >
        {cards.map(card => 
          <ServicesCard card={card}  />
        )}
      </section>
    </section>
  );
}

export default OurServices;
