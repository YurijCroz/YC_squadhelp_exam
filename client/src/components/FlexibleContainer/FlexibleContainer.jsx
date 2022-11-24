import React from "react";
import styles from "./FlexibleContainer.module.sass";
import classnames from "classnames";
import CONSTANTS from "../../constants.js";

function FlexibleContainer({ content, backgroundColor, color, rowReverse }) {
  const styleStep = classnames(styles.step, {
    [styles.rowReverse]: rowReverse,
    [styles.row]: !rowReverse,
  });
  return (
    <section
      className={styles.container}
      style={{ backgroundColor: `${backgroundColor}` }}
    >
      <section className={styleStep}>
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}${content.imgSrc}`}
          alt={`${content.imgAlt}`}
        />
        <article className={styles.articleStep} style={{ color: `${color}` }}>
          <h3>{content.title}</h3>
          {content.text.map((paragraph, index) => (
            <p key={index}>
              <i className="fas fa-check" />
              <span>{paragraph}</span>
            </p>
          ))}
        </article>
      </section>
    </section>
  );
}

FlexibleContainer.defaultProps = {
  backgroundColor: "white",
  color: "black",
  rowReverse: false,
};

export default FlexibleContainer;
