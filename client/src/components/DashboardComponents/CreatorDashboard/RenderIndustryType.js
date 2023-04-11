import React from "react";
import styles from "./CreatorDashboard.module.sass";

function RenderIndustryType(props) {
  const { creatorFilter, industry, changePredicate } = props;
  const array = [];
  array.push(
    <option key={0} value={""}>
      Choose industry
    </option>
  );
  industry.forEach((industry, i) =>
    array.push(
      <option key={i + 1} value={industry}>
        {industry}
      </option>
    )
  );
  return (
    <section className={styles.inputContainer}>
      <span>By industry</span>
      <select
        onChange={({ target }) =>
          changePredicate({
            name: "industry",
            value: target.value,
          })
        }
        value={creatorFilter.industry}
        className={styles.input}
      >
        {array}
      </select>
    </section>
  );
}

export default RenderIndustryType;
