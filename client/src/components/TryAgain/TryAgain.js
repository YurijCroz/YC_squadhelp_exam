import React from "react";
import styles from "./TryAgain.module.sass";

const TryAgain = (props) => {
  const { getData } = props;
  return (
    <article className={styles.container}>
      <span onClick={() => getData()}>Server Error. Try again</span>
      <i className="fas fa-redo" onClick={() => getData()} />
    </article>
  );
};

export default TryAgain;
