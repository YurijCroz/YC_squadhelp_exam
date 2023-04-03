import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./BackButton.module.sass";

const BackButton = ({ history }) => {
  const clickHandler = () => {
    history.goBack();
  };

  return (
    <button onClick={clickHandler} className={styles.buttonContainer}>
      <span>Back</span>
    </button>
  );
};

export default withRouter(BackButton);
