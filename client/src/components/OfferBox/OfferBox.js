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
} from "../../actions/actionCreator";
import CONSTANTS from "../../constants";
import styles from "./OfferBox.module.sass";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./confirmStyle.css";

const OfferBox = (props) => {
  const { data, role, id, contestType } = props,
    { avatar, firstName, lastName, email, rating } = props.data.User;

  const findConversationInfo = () => {
    const { messagesPreview, id } = props;
    const participants = [id, props.data.User.id];
    participants.sort(
      (participant1, participant2) => participant1 - participant2
    );
    for (let i = 0; i < messagesPreview.length; i++) {
      if (isEqual(participants, messagesPreview[i].participants)) {
        return {
          participants: messagesPreview[i].participants,
          id: messagesPreview[i].id,
          blackList: messagesPreview[i].blackList,
          favoriteList: messagesPreview[i].favoriteList,
        };
      }
    }
    return null;
  };

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

  const changeMark = (value) => {
    props.clearError();
    props.changeMark({
      mark: value,
      offerId: props.data.id,
      isFirst: !props.data.mark,
      creatorId: props.data.User.id,
    });
  };

  const offerStatus = () => {
    const { status } = props.data;
    const { passedModeration, banned } = data;

    if (status === CONSTANTS.OFFER_STATUS_REJECTED) {
      return (
        <i
          className={classnames("fas fa-times-circle reject", styles.reject)}
        />
      );
    }
    if (status === CONSTANTS.OFFER_STATUS_WON) {
      return (
        <i
          className={classnames("fas fa-check-circle resolve", styles.resolve)}
        />
      );
    }
    if (data.User.id === id && !passedModeration && !banned) {
      return (
        <span
          className={classnames(styles.statusOffer, styles.statusInspection)}
        >
          inspection
        </span>
      );
    }
    if (data.User.id === id && passedModeration && !banned) {
      return (
        <span className={classnames(styles.statusOffer, styles.statusPassed)}>
          passed
        </span>
      );
    }
    if (data.User.id === id && passedModeration && banned) {
      return (
        <span className={classnames(styles.statusOffer, styles.statusBanned)}>
          banned
        </span>
      );
    }
    return null;
  };

  const goChat = () => {
    props.goToExpandedDialog({
      interlocutor: props.data.User,
      conversationData: findConversationInfo(),
    });
  };

  return (
    <section className={styles.offerContainer}>
      {offerStatus()}
      <article className={styles.mainInfoContainer}>
        <section className={styles.userInfo}>
          <section className={styles.creativeInfoContainer}>
            <img
              src={`${CONSTANTS.PUBLIC_URL}images_avatar/${avatar}`}
              alt="user"
            />
            <section className={styles.nameAndEmail}>
              <span>{`${firstName} ${lastName}`}</span>
              <span>{email}</span>
            </section>
          </section>
          <section className={styles.creativeRating}>
            <span className={styles.userScoreLabel}>Creative Rating </span>
            <Rating
              initialRating={rating}
              fractions={2}
              fullSymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                  alt="star"
                />
              }
              placeholderSymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                  alt="star"
                />
              }
              emptySymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                  alt="star-outline"
                />
              }
              readonly
            />
          </section>
        </section>
        <section className={styles.responseContainer}>
          {contestType === CONSTANTS.LOGO_CONTEST ? (
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
          {data.User.id !== id && (
            <Rating
              fractions={2}
              fullSymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                  alt="star"
                />
              }
              placeholderSymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                  alt="star"
                />
              }
              emptySymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                  alt="star"
                />
              }
              onClick={changeMark}
              placeholderRating={data.mark}
            />
          )}
        </section>
        {role !== CONSTANTS.CREATOR && (
          <i onClick={goChat} className="fas fa-comments" />
        )}
      </article>
      {props.needButtons(data.status) && (
        <section className={styles.btnsContainer}>
          <button onClick={resolveOffer} className={styles.resolveBtn}>
            Resolve
          </button>
          <button onClick={rejectOffer} className={styles.rejectBtn}>
            Reject
          </button>
        </section>
      )}
    </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeMark: (data) => dispatch(changeMark(data)),
  clearError: () => dispatch(clearChangeMarkError()),
  goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
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
  connect(mapStateToProps, mapDispatchToProps)(OfferBox)
);
