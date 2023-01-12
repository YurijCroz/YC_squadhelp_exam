import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import styles from "./ContestSideBar.module.sass";
import CONSTANTS from "../../constants";

const ContestSideBar = (props) => {
  const { totalEntries, data, contestData } = props;
  const { User, prize } = props.contestData;

  const getTimeStr = () => {
    const diff = moment.duration(moment().diff(moment(contestData.createdAt)));
    let str = "";
    if (diff._data.days !== 0) str = `${diff._data.days} days `;
    if (diff._data.hours !== 0) str += `${diff._data.hours} hours`;
    if (str.length === 0) str = "less than one hour";
    return str;
  };

  const getCustomerInfo = () => {
    return (
      <article className={styles.infoCustomerContainer}>
        <span className={styles.labelCustomerInfo}>About Contest Holder</span>
        <section className={styles.customerInfo}>
          <img
            src={
              User.avatar === "anon.png"
                ? CONSTANTS.ANONYM_IMAGE_PATH
                : `${CONSTANTS.publicURL}images_avatar/${User.avatar}`
            }
            alt="user"
          />
          <section className={styles.customerNameContainer}>
            <span>{`${User.firstName} ${User.lastName}`}</span>
            <span>{User.displayName}</span>
          </section>
        </section>
      </article>
    );
  };

  const getModerationInfoStatus = () => {
    const { passedModeration, banned } = contestData;

    const infoStatusHelper = () => {
      if (!passedModeration && !banned) return <span>inspection</span>;
      if (passedModeration && !banned) return <span>passed</span>;
      if (passedModeration && banned) return <span>banned</span>;
    };

    if (data.id === User.id || data.role === CONSTANTS.MODER) {
      return (
        <article className={styles.contestStats}>
          <span>Moderation status</span>
          <section className={styles.totalEntries}>
            {infoStatusHelper()}
          </section>
        </article>
      );
    }
    return null;
  };

  return (
    <aside className={styles.contestSideBarInfo}>
      <article className={styles.contestInfo}>
        <section className={styles.awardAndTimeContainer}>
          <section className={styles.prizeContainer}>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}big-diamond.png`}
              alt="diamond"
            />
            <span>{`$ ${prize}`}</span>
          </section>
          <section className={styles.timeContainer}>
            <section className={styles.timeDesc}>
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}clock.png`}
                alt="clock"
              />
              <span>Going</span>
            </section>
            <span className={styles.time}>{getTimeStr()}</span>
          </section>
          <section className={styles.guaranteedPrize}>
            <div>
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}smallCheck.png`}
                alt="check"
              />
            </div>
            <span>Guaranteed prize</span>
          </section>
        </section>
        <article className={styles.contestStats}>
          <span>Contest Stats</span>
          <section className={styles.totalEntries}>
            <span className={styles.totalEntriesLabel}>Total Entries</span>
            <span>{totalEntries}</span>
          </section>
        </article>
        {getModerationInfoStatus()}
      </article>
      {data.id !== User.id && getCustomerInfo()}
    </aside>
  );
};

const mapStateToProps = (state) => state.userStore;

export default connect(mapStateToProps, null)(ContestSideBar);
