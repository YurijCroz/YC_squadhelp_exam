import React, { useEffect } from "react";
import { connect } from "react-redux";
import styles from "./Footer.module.sass";
import CONSTANTS from "../../constants";

const Footer = (props) => {
  // console.log("Footer")
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

  if (props.data?.role === CONSTANTS.MODER) {
    return null;
  }

  return (
    <footer className={styles.footerContainer}>
      <section className={styles.footerTop}>
        <section>{topFooterRender()}</section>
      </section>
    </footer>
  );
};

const mapStateToProps = (state) => state.userStore;

export default connect(mapStateToProps)(Footer);
