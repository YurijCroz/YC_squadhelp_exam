import React, { useState, useEffect, useRef } from "react";
import styles from "./ButtonGroup.module.sass";

function ButtonGroup() {
  const [valueInput, setValueInput] = useState(null);
  const activeRef = useRef(null);

  useEffect(() => {
    activeRef.current.classList.add(styles.active);
    setValueInput(activeRef.current.dataset.choose);
  }, []);

  const handleClick = (event) => {
    const target = event.target.dataset.choose
      ? event.target
      : event.target.offsetParent;
    const choose = target.dataset.choose;

    if (choose) {
      setValueInput(choose);
      activeRef.current.classList.remove(styles.active);
      target.classList.add(styles.active);
      activeRef.current = target;
    }
  };

  return (
    <section className={styles.container}>
      <input type="hidden" name="company_url_needed" value={valueInput} />
      <div data-choose="asname" onClick={handleClick} className={styles.card}>
        <span className={styles.badge}>Yes</span>
        <h5>The Domain should exactly match the name</h5>
      </div>
      <div
        data-choose="yes"
        onClick={handleClick}
        className={styles.card}
        ref={activeRef}
      >
        <span className={styles.badge}>Yes</span>
        <h5>But minor variations are allowed (Recommended)</h5>
      </div>
      <div data-choose="no" onClick={handleClick} className={styles.card}>
        <span className={styles.badge}>No</span>
        <h5>I am only looking for a name, not a Domain</h5>
      </div>
    </section>
  );
}

export default ButtonGroup;
