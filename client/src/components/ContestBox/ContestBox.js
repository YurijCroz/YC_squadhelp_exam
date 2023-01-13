import React from "react";
import moment from "moment";
import styles from "./ContestBox.module.sass";
import CONSTANTS from "../../constants";

const ContestBox = (props) => {
  const { id, title, contestType, prize, count } = props.data;

  const getTimeStr = () => {
    const diff = moment.duration(moment().diff(moment(props.data.createdAt)));
    let str = "";
    if (diff._data.days !== 0) str = `${diff._data.days}d `;
    if (diff._data.hours !== 0) str += `${diff._data.hours}h`;
    if (str.length === 0) str = "less than one hour";
    return str;
  };

  const getPreferenceContest = () => {
    const { data } = props;
    if (data.contestType === CONSTANTS.NAME_CONTEST) return data.typeOfName;
    if (data.contestType === CONSTANTS.LOGO_CONTEST) return data.brandStyle;
    return data.typeOfTagline;
  };

  const ucFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <section
      className={styles.contestBoxContainer}
      onClick={() => props.goToExtended(id)}
    >
      <article className={styles.mainContestInfo}>
        <section className={styles.titleAndIdContainer}>
          <span className={styles.title}>{title}</span>
          <span className={styles.id}>{`(#${id})`}</span>
        </section>
        <section className={styles.contestType}>
          <span>{`${ucFirstLetter(
            contestType
          )} / ${getPreferenceContest()}`}</span>
        </section>
        <section className={styles.contestType}>
          <span>
            This is an Invitation Only Contest and is only open to those
            Creatives who have achieved a Tier A status.
          </span>
        </section>
        <article className={styles.prizeContainer}>
          <section className={styles.guaranteedContainer}>
            <div>
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}smallCheck.png`}
                alt="check"
              />
            </div>
            <span>Guaranteed prize</span>
          </section>
          <section className={styles.prize}>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}diamond.png`}
              alt="diamond"
            />
            <span>{`$${prize}`}</span>
          </section>
        </article>
      </article>
      <article className={styles.entryAndTimeContainer}>
        <section className={styles.entriesContainer}>
          <section className={styles.entriesCounter}>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}entrieImage.png`}
              alt="logo"
            />
            <span>{count}</span>
          </section>
          <span>Entries</span>
        </section>
        <section className={styles.timeContainer}>
          <span className={styles.timeContest}>{getTimeStr()}</span>
          <span>Going</span>
        </section>
      </article>
    </section>
  );
};

export default ContestBox;
