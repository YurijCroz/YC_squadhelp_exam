import React from 'react';
import styles from "./OurServices.module.sass";
import CONSTANTS from "../../../constants";

function ServicesCard({card}) {
  const {img, title, text, btnName, btnSrc} = card;
  return (
    <article className={styles.card}>
      <div className={styles.image} >
        <img src={CONSTANTS.STATIC_IMAGES_PATH+img} alt="img" />
      </div>
      <h4>{title}</h4>
      <p>{text}</p>
      <a href={btnSrc}>{btnName}</a>
    </article>
  )
}

export default ServicesCard