import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { changeShowImage, moderationOffer } from "../../actions/actionCreator";
import CONSTANTS from "../../constants";
import classnames from "classnames";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./confirmStyle.css";
import styles from "./OfferBox.module.sass";

const buttonName = {
  accept: "Accept",
  reject: "Reject",
};

const moderationHelper = (offerId, customerUserId, value) => {
  const data = {
    offerId,
    body: {
      customerUserId,
      banned: value,
    },
  };
  return data;
};

const OfferBoxForModerator = (props) => {
  const { data, moderationOffer } = props;
  const { firstName, lastName, email } = data.User;

  const moderationHandler = (value) => {
    const newData = moderationHelper(data.id, data.Contest.userId, value);
    moderationOffer(newData);
  };

  const confirmHelper = (result) => {
    confirmAlert({
      title: "confirm",
      message: `Are you sure you want to ${result ? "reject" : "accept"}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => moderationHandler(result),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const offerStatus = () => {
    const { passedModeration, banned } = data;

    if (!passedModeration && !banned) {
      return (
        <span
          className={classnames(styles.statusOffer, styles.statusInspection)}
        >
          inspection
        </span>
      );
    }
    if (passedModeration && !banned) {
      return (
        <span className={classnames(styles.statusOffer, styles.statusPassed)}>
          passed
        </span>
      );
    }
    if (passedModeration && banned) {
      return (
        <span className={classnames(styles.statusOffer, styles.statusBanned)}>
          banned
        </span>
      );
    }
    return null;
  };

  const getButton = () => {
    return (
      <>
        {!data.passedModeration || data.banned ? (
          <button onClick={() => confirmHelper(false)} className={styles.resolveBtn}>
            {buttonName.accept}
          </button>
        ) : (
          <button
            className={classnames(styles.acceptBtn, styles.deactivateAcceptBtn)}
          >
            {buttonName.accept}
          </button>
        )}
        {!data.banned ? (
          <button onClick={() => confirmHelper(true)} className={styles.rejectBtn}>
            {buttonName.reject}
          </button>
        ) : (
          <button
            className={classnames(styles.rejectBtn, styles.deactivateRejectBtn)}
          >
            {buttonName.reject}
          </button>
        )}
      </>
    );
  };

  return (
    <section className={styles.offerContainer}>
      {offerStatus()}
      <article className={styles.mainInfoContainer}>
        <section className={styles.userInfo}>
          <section className={styles.creativeInfoContainer}>
            <section className={styles.nameAndEmail}>
              <span className={styles.margin}>
                {`${firstName} ${lastName}`}
              </span>
              <span className={styles.margin}>{email}</span>
            </section>
          </section>
        </section>
        <section className={styles.idOffer}>
          <span>{`(#${data.id})`}</span>
        </section>
        <section className={styles.responseContainer}>
          {data.fileName ? (
            <img
              onClick={() =>
                props.changeShowImage({
                  imagePath: data.fileName,
                  isShowOnFull: true,
                })
              }
              className={styles.responseLogo}
              src={`${CONSTANTS.PUBLIC_URL}images_logo/${data.fileName}`}
              alt="logo"
            />
          ) : (
            <span className={styles.response}>{data.text}</span>
          )}
        </section>
      </article>
      <section className={styles.btnsContainer}>{getButton()}</section>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeShowImage: (data) => dispatch(changeShowImage(data)),
  moderationOffer: (data) => dispatch(moderationOffer(data)),
});

const mapStateToProps = (state) => state.moderatorList;

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OfferBoxForModerator)
);
