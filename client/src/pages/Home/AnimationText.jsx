import React, { useState, useEffect } from "react";
import CONSTANTS from "../../constants";
import styles from "./Home.module.sass";

function AnimationText() {
  const [index, setIndex] = useState(0);
  const [styleName, setStyleName] = useState(styles.headline__static);
  const [text, setText] = useState(CONSTANTS.HEADER_ANIMATION_TEXT[0])

  useEffect(() => {
    const timeout = setInterval(() => {
      setIndex(prev => prev + 1);
      setStyleName(styles.headline__isLoading);
    }, 3000);
    return () => {
      setStyleName(styles.headline__static);
      clearInterval(timeout);
    };
  });

  useEffect(() => {
    setText(prev => prev = CONSTANTS.HEADER_ANIMATION_TEXT[
      index % CONSTANTS.HEADER_ANIMATION_TEXT.length
    ])
  },[index])

  return <span className={styleName}>{text}</span>;
}

export default AnimationText;
