import React from "react";
import styles from "./ContestBox.module.sass";
import classnames from "classnames";

const ContestBoxForModerator = ({data, goToExtended}) => {

  const ucFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const { id, title, contestType, User } = data;
  const { firstName, email } = User

  return (
    <section
      className={styles.contestBoxContainer}
      onClick={() => goToExtended(id)}
    >
      <article className={styles.mainContestInfo}>
        <section className={styles.titleAndIdContainer}>
          <span className={styles.title}>{title}</span>
          <span className={styles.id}>{`(#${id})`}</span>
        </section>
        <section className={styles.contestType}>
          <span>{`${ucFirstLetter(contestType)}`}</span>
        </section>
      </article>
      <article className={classnames(styles.entryAndTimeContainer, styles.infoUser)}>
        <section className={styles.timeContainer}>
          <span className={styles.timeContest}>{firstName}</span>
          <span>{email}</span>
        </section>
      </article>
    </section>
  );
};

export default ContestBoxForModerator;
