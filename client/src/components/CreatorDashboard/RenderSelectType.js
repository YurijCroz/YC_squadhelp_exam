import React from "react";
import styles from "./CreatorDashboard.module.sass";

const types = [
  "",
  "name, tagline, logo",
  "name",
  "tagline",
  "logo",
  "name, tagline",
  "logo, tagline",
  "name, logo",
];

function RenderSelectType(props) {
  const array = [];
  const { creatorFilter, changePredicate } = props;
  types.forEach(
    (el, i) =>
      !i ||
      array.push(
        <option key={i - 1} value={el}>
          {el}
        </option>
      )
  );
  return (
    <section className={styles.inputContainer}>
      <span>By contest type</span>
      <select
        onChange={({ target }) =>
          changePredicate({
            name: "typeIndex",
            value: types.indexOf(target.value),
          })
        }
        value={types[creatorFilter.typeIndex]}
        className={styles.input}
      >
        {array}
      </select>
    </section>
  );
}

export default RenderSelectType;
