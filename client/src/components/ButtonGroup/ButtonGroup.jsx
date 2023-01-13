import React, { useState } from "react";
import styles from "./ButtonGroup.module.sass";
import classnames from "classnames";

function ButtonGroup() {
  const [valueInput, setValueInput] = useState("yes");

  const activeHandler = ({ target }) => {
    if (target.localName !== "div") target = target.offsetParent;
    setValueInput(target.dataset.choose);
    removeActiveStyle();
    addActiveStyle(target);
  };
  const removeActiveStyle = () =>
    document
      .querySelector(`div.${styles.active}`)
      .classList.remove(styles.active);

  const addActiveStyle = (target) => target.classList.add(styles.active);

  return (
    <section className={styles.container}>
      <input type="hidden" name="company_url_needed" value={valueInput} />
      <div data-choose="asname" onClick={activeHandler} className={styles.card}>
        <span className={styles.badge}>Yes</span>
        <h5>The Domain should exactly match the name</h5>
      </div>
      <div
        data-choose="yes"
        onClick={activeHandler}
        className={classnames([styles.card, styles.active])}
      >
        <span className={styles.badge}>Yes</span>
        <h5>But minor variations are allowed (Recommended)</h5>
      </div>
      <div data-choose="no" onClick={activeHandler} className={styles.card}>
        <span className={styles.badge}>No</span>
        <h5>I am only looking for a name, not a Domain</h5>
      </div>
    </section>
  );
}

export default ButtonGroup;
