import React from "react";
import styles from "./RoleInput.module.sass";

function RoleInput({ id, strRole, infoRole, field, type }) {
  return (
    <label htmlFor={id}>
      <section className={styles.roleContainer}>
        <input {...field} type={type} id={id} />
        <section className={styles.infoRoleContainer}>
          <span className={styles.role}>{strRole}</span>
          <span className={styles.infoRole}>{infoRole}</span>
        </section>
      </section>
    </label>
  );
}

export default RoleInput;
