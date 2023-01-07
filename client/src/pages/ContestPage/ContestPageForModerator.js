import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import classnames from "classnames";
import {
  getContestByIdForModerator,
  clearContestByIdForModerator,
  moderationContest,
  backToModerationList,
} from "../../actions/actionCreator";
import Header from "../../components/Header/Header";
import ContestSideBar from "../../components/ContestSideBar/ContestSideBar";
import styles from "./ContestPage.module.sass";
import CONSTANTS from "../../constants";
import Brief from "../../components/Brief/Brief";
import Spinner from "../../components/Spinner/Spinner";
import TryAgain from "../../components/TryAgain/TryAgain";
import "../../components/OfferBox/confirmStyle.css";

function ContestPageForModerator(props) {
  const { role } = props.userStore.data;
  const { getData, history, moderationContest, backPageAction } = props;
  const { error, isFetching, contestData, backPage } = props.contestByIdStore;

  const getDataHandler = () => {
    const { params } = props.match;
    getData({ contestId: params.id });
  };

  useEffect(() => {
    if (role !== CONSTANTS.MODER) return <Redirect to="/" />;
    getDataHandler();
    return () => props.clearData();
  }, []);

  useEffect(() => {
    if (backPage) history.goBack();
  }, [backPage]);

  const moderationHelper = () => {
    const data = {
      contestId: contestData.id,
      passedModeration: true,
    };
    return data;
  };

  const moderationAcceptHandler = () => {
    const data = moderationHelper();
    moderationContest(data);
  };

  const moderationRejectHandler = () => {
    const data = moderationHelper();
    data.banned = true;
    moderationContest(data);
  };

  const acceptContest = () => {
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

  const rejectContest = () => {
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
    <>
      <Header />
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
              <span className={classnames(styles.btn, styles.activeBtn)}>
                Brief
              </span>
            </section>
            <Brief contestData={contestData} role={role} />
            <section className={styles.btnsContainer}>
              <button onClick={backPageAction} className={styles.backBtn}>
                Back
              </button>
              <button onClick={acceptContest} className={styles.acceptBtn}>
                Accept
              </button>
              <button onClick={rejectContest} className={styles.rejectBtn}>
                Reject
              </button>
            </section>
          </section>
          <ContestSideBar contestData={contestData} totalEntries={0} />
        </main>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const { contestByIdForModeratorStore: contestByIdStore, userStore } = state;
  return { contestByIdStore, userStore };
};

const mapDispatchToProps = (dispatch) => ({
  getData: (data) => dispatch(getContestByIdForModerator(data)),
  clearData: () => dispatch(clearContestByIdForModerator()),
  moderationContest: (data) => dispatch(moderationContest(data)),
  backPageAction: () => dispatch(backToModerationList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContestPageForModerator);
