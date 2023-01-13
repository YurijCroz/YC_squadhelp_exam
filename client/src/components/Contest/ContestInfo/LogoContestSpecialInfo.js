import React from "react";
import styles from "./ContestInfo.module.sass";

const LogoContestSpecialInfo = (props) => {
  const { nameVenture, brandStyle } = props;
  return (
    <>
      {nameVenture && (
        <section className={styles.dataContainer}>
          <span className={styles.label}>Name ventrure</span>
          <span className={styles.data}>{nameVenture}</span>
        </section>
      )}
      <section className={styles.dataContainer}>
        <span className={styles.label}>Brand Style</span>
        <span className={styles.data}>{brandStyle}</span>
      </section>
    </>
  );
};

export default LogoContestSpecialInfo;
