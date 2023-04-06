import React from "react";
import styles from "./Footer.module.sass";
import CONSTANTS from "../../constants";

const Footer = () => {
  const topFooterItemsRender = (item) => (
    <nav key={item.title}>
      <h4>{item.title}</h4>
      {item.items.map((i) => (
        <a key={i} href="https://google.com">
          {i}
        </a>
      ))}
    </nav>
  );

  const topFooterRender = () => {
    return CONSTANTS.FOOTER_ITEMS.map((item) => topFooterItemsRender(item));
  };

  return (
    <footer className={styles.footerContainer}>
      <section className={styles.footerTop}>
        <section>{topFooterRender()}</section>
      </section>
    </footer>
  );
};

export default Footer;
