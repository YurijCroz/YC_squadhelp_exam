import React from "react";
import styles from "./NextButton.module.sass";

const NextButton = (props) => {
  const { submit } = props;

  return (
    <button onClick={submit} className={styles.buttonContainer}>
      <span>Next</span>
    </button>
  );
};

export default NextButton;
