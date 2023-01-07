import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { changeShowImage, moderationOffer } from "../../actions/actionCreator";
import CONSTANTS from "../../constants";
import styles from "./OfferBox.module.sass";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./confirmStyle.css";

const OfferBoxForModerator = (props) => {
  const { data, moderationOffer } = props;
  const { firstName, lastName, email } = props.data.User;

  const moderationHelper = () => {
    const data = {
      offerId: props.data.id,
      passedModeration: true,
    };
    return data;
  };

  const moderationAcceptHandler = () => {
    const data = moderationHelper();
    moderationOffer(data);
  };

  const moderationRejectHandler = () => {
    const data = moderationHelper();
    data.banned = true;
    moderationOffer(data);
  };

  const acceptOffer = () => {
    confirmAlert({
      title: "confirm",
      message: "Are you sure you want to accept?",
      buttons: [
        {
          label: "Yes",
          onClick: () => moderationAcceptHandler(),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const rejectOffer = () => {
    confirmAlert({
      title: "confirm",
      message: "Are you sure you want to reject?",
      buttons: [
        {
          label: "Yes",
          onClick: () => moderationRejectHandler(),
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <section className={styles.offerContainer}>
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
        <section className={styles.responseConainer}>
          {data.fileName ? (
            <img
              onClick={() =>
                props.changeShowImage({
                  imagePath: data.fileName,
                  isShowOnFull: true,
                })
              }
              className={styles.responseLogo}
              src={`${CONSTANTS.publicURL}${data.fileName}`}
              alt="logo"
            />
          ) : (
            <span className={styles.response}>{data.text}</span>
          )}
        </section>
      </article>
      <section className={styles.btnsContainer}>
        <button onClick={acceptOffer} className={styles.resolveBtn}>
          Accept
        </button>
        <button onClick={rejectOffer} className={styles.rejectBtn}>
          Reject
        </button>
      </section>
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
