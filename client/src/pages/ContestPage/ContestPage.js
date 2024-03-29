import React, { useEffect } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import isEqual from "lodash/isEqual";
import LightBox from "react-image-lightbox";
import {
  getContestById,
  setOfferStatus,
  clearSetOfferStatusError,
  goToExpandedDialog,
  changeEditContest,
  changeContestViewMode,
  changeShowImage,
} from "../../actions/actionCreator";
import ContestSideBar from "../../components/ContestSideBar/ContestSideBar";
import styles from "./ContestPage.module.sass";
import OfferBox from "../../components/OfferBox/OfferBox";
import OfferForm from "../../components/OfferForm/OfferForm";
import CONSTANTS from "../../constants";
import Brief from "../../components/Brief/Brief";
import Spinner from "../../components/Spinner/Spinner";
import TryAgain from "../../components/TryAgain/TryAgain";
import "react-image-lightbox/style.css";
import Error from "../../components/Error/Error";

function ContestPage({
  contestByIdStore,
  changeShowImage,
  changeContestViewMode,
  changeEditContest,
  getData,
  clearSetOfferStatusError,
  userStore,
  setOfferStatus,
  goToExpandedDialog,
  chatStore: { messagesPreview },
  match: { params },
}) {
  const {
    isShowOnFull,
    imagePath,
    error,
    isFetching,
    isBrief,
    contestData,
    offers,
    setOfferStatusError,
  } = contestByIdStore;

  const { role } = userStore.data;

  useEffect(() => {
    getDataHandler();
    return () => {
      changeEditContest(false);
    };
  }, []);

  const getDataHandler = () => {
    getData({ contestId: params.id });
  };

  const setOffersList = () => {
    const array = [];
    for (let i = 0; i < offers.length; i++) {
      array.push(
        <OfferBox
          data={offers[i]}
          key={offers[i].id}
          needButtons={needButtons}
          setOfferStatus={setOfferStatusHandler}
          contestType={contestData.contestType}
          date={new Date()}
        />
      );
    }
    return array.length !== 0 ? (
      array
    ) : (
      <div className={styles.notFound}>
        There is no suggestion at this moment
      </div>
    );
  };

  const needButtons = (offerStatus) => {
    const contestCreatorId = contestData.User.id;
    const userId = userStore.data.id;
    const contestStatus = contestData.status;
    return (
      contestCreatorId === userId &&
      contestStatus === CONSTANTS.CONTEST_STATUS_ACTIVE &&
      offerStatus === CONSTANTS.OFFER_STATUS_PENDING
    );
  };

  const setOfferStatusHandler = (creatorId, offerId, command) => {
    clearSetOfferStatusError();
    const { id, orderId, priority } = contestData;
    const obj = {
      offerId,
      body: { command, creatorId, orderId, priority, contestId: id },
    };
    setOfferStatus(obj);
  };

  const findConversationInfo = (interlocutorId) => {
    const { id } = userStore.data;
    const participants = [id, interlocutorId];
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

  const goChat = () => {
    const { User } = contestData;
    goToExpandedDialog({
      interlocutor: User,
      conversationData: findConversationInfo(User.id),
    });
  };

  return (
    <>
      {isShowOnFull && (
        <LightBox
          mainSrc={`${CONSTANTS.PUBLIC_URL}images_logo/${imagePath}`}
          onCloseRequest={() =>
            changeShowImage({ isShowOnFull: false, imagePath: null })
          }
        />
      )}
      {error ? (
        <section className={styles.tryContainer}>
          <TryAgain getData={getData} />
        </section>
      ) : isFetching ? (
        <section className={styles.containerSpinner}>
          <Spinner />
        </section>
      ) : (
        <main className={styles.mainInfoContainer}>
          <section className={styles.infoContainer}>
            <section className={styles.buttonsContainer}>
              <span
                onClick={() => changeContestViewMode(true)}
                className={classnames(styles.btn, {
                  [styles.activeBtn]: isBrief,
                })}
              >
                Brief
              </span>
              <span
                onClick={() => changeContestViewMode(false)}
                className={classnames(styles.btn, {
                  [styles.activeBtn]: !isBrief,
                })}
              >
                Offer
              </span>
            </section>
            {isBrief ? (
              <Brief contestData={contestData} role={role} goChat={goChat} />
            ) : (
              <section className={styles.offersContainer}>
                {role === CONSTANTS.CREATOR &&
                  contestData.status === CONSTANTS.CONTEST_STATUS_ACTIVE && (
                    <OfferForm
                      contestType={contestData.contestType}
                      contestId={contestData.id}
                      customerId={contestData.User.id}
                    />
                  )}
                {setOfferStatusError && (
                  <Error
                    data={setOfferStatusError.data}
                    status={setOfferStatusError.status}
                    clearError={clearSetOfferStatusError}
                  />
                )}
                <section className={styles.offers}>{setOffersList()}</section>
              </section>
            )}
          </section>
          <ContestSideBar
            contestData={contestData}
            totalEntries={offers.length}
          />
        </main>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const { contestByIdStore, userStore, chatStore } = state;
  return { contestByIdStore, userStore, chatStore };
};

const mapDispatchToProps = (dispatch) => ({
  getData: (data) => dispatch(getContestById(data)),
  setOfferStatus: (data) => dispatch(setOfferStatus(data)),
  clearSetOfferStatusError: () => dispatch(clearSetOfferStatusError()),
  goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
  changeEditContest: (data) => dispatch(changeEditContest(data)),
  changeContestViewMode: (data) => dispatch(changeContestViewMode(data)),
  changeShowImage: (data) => dispatch(changeShowImage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContestPage);
