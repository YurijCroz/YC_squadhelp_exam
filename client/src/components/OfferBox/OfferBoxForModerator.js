import React from "react";
import { connect } from "react-redux";
import Rating from "react-rating";
import { withRouter } from "react-router-dom";
import isEqual from "lodash/isEqual";
import classnames from "classnames";
import { confirmAlert } from "react-confirm-alert";
import {
  changeMark,
  clearChangeMarkError,
  goToExpandedDialog,
  changeShowImage,
  changeModalShow,
} from "../../actions/actionCreator";
import CONSTANTS from "../../constants";
import styles from "./OfferBox.module.sass";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./confirmStyle.css";

const OfferBoxForModerator = (props) => {
  const resolveOffer = () => {
    confirmAlert({
      title: "confirm",
      message: "Are u sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            props.setOfferStatus(props.data.User.id, props.data.id, "resolve"),
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
      message: "Are u sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            props.setOfferStatus(props.data.User.id, props.data.id, "reject"),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const { data, role, id, contestType } = props;
  const { firstName, lastName, email } = props.data.User;
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
        <button onClick={resolveOffer} className={styles.resolveBtn}>
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
});

const mapStateToProps = (state) => {
  const { changeMarkError, isShowModal } = state.contestByIdStore;
  const { id, role } = state.userStore.data;
  const { messagesPreview } = state.chatStore;
  return {
    changeMarkError,
    id,
    role,
    messagesPreview,
    isShowModal,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OfferBoxForModerator)
);
