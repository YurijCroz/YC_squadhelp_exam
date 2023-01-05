import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import classnames from "classnames";
import {
  getContestByIdForModerator,
  clearContestByIdForModerator,
  changeEditContest,
} from "../../actions/actionCreator";
import Header from "../../components/Header/Header";
import ContestSideBar from "../../components/ContestSideBar/ContestSideBar";
import styles from "./ContestPage.module.sass";
import CONSTANTS from "../../constants";
import Brief from "../../components/Brief/Brief";
import Spinner from "../../components/Spinner/Spinner";
import TryAgain from "../../components/TryAgain/TryAgain";
import "react-image-lightbox/style.css";

function ContestPageForModerator(props) {
  const { role } = props.userStore.data;
  const { contestByIdStore, getData, history } = props;
  const { error, isFetching, contestData } = contestByIdStore;

  const getDataHandler = () => {
    const { params } = props.match;
    getData({ contestId: params.id });
  };

  useEffect(() => {
    if (role !== CONSTANTS.MODER) return <Redirect to="/" />;
    getDataHandler();
    return () => props.clearData();
  }, []);

  const clickBackHandler = () => history.goBack();

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
              <button onClick={clickBackHandler} className={styles.backBtn}>
                Back
              </button>
              <button onClick={() => {}} className={styles.acceptBtn}>
                Accept
              </button>
              <button onClick={() => {}} className={styles.rejectBtn}>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContestPageForModerator);
