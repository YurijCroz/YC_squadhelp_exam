import React, { useState, useEffect } from "react";
import CONSTANTS from "../../constants";
import styles from "./Home.module.sass";

function AnimationText() {
  const [index, setIndex] = useState(0);
  const [styleName, setStyleName] = useState(styles.headline__static);

  useEffect(() => {
    const timeout = setInterval(() => {
      setIndex(index + 1);
      setStyleName(styles.headline__isLoading);
    }, 3000);
    return () => {
      setStyleName(styles.headline__static);
      clearInterval(timeout);
    };
  });

  const text =
    CONSTANTS.HEADER_ANIMATION_TEXT[
      index % CONSTANTS.HEADER_ANIMATION_TEXT.length
    ];
  return <span className={styleName}>{text}</span>;
}

export default AnimationText;
