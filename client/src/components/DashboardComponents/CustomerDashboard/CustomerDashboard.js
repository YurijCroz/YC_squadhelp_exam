import React, { useEffect } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import {
  getContestsForCustomer,
  clearContestList,
  setNewCustomerFilter,
} from "../../../actions/actionCreator";
import CONSTANTS from "../../../constants";
import ContestsContainer from "../../ContestsContainer/ContestsContainer";
import ContestBox from "../../ContestBox/ContestBox";
import styles from "./CustomerDashboard.module.sass";
import TryAgain from "../../TryAgain/TryAgain";

const buttonName = {
  activeContests: "Active Contests",
  completedContests: "Completed Contests",
  inactiveContests: "Inactive contests",
};

function CustomerDashboard({
  getContests,
  customerFilter,
  clearContestsList,
  error,
  haveMore,
  newFilter,
  history,
  contests,
  isFetching,
}) {
  const loadMore = (startFrom) => {
    getContests({
      limit: 8,
      offset: startFrom,
      contestStatus: customerFilter,
    });
  };

  const getContestsHandler = () => {
    getContests({
      limit: 8,
      contestStatus: customerFilter,
    });
  };

  useEffect(() => {
    getContestsHandler();
    return () => {
      clearContestsList();
    };
  }, []);

  useEffect(() => {
    getContestsHandler();
  }, [customerFilter]);

  const goToExtended = (contestId) => {
    history.push(`/dashboard/contest/${contestId}`);
  };

  const setContestList = () => {
    const array = [];

    for (let i = 0; i < contests.length; i++) {
      array.push(
        <ContestBox
          data={contests[i]}
          key={contests[i].id}
          goToExtended={goToExtended}
        />
      );
    }
    return array;
  };

  const tryToGetContest = () => {
    clearContestsList();
    getContestsHandler();
  };

  const getButton = () => {
    return (
      <>
        {customerFilter === CONSTANTS.CONTEST_STATUS_ACTIVE ? (
          <div className={classnames(styles.btn, styles.activeFilter)}>
            {buttonName.activeContests}
          </div>
        ) : (
          <div
            onClick={() => newFilter(CONSTANTS.CONTEST_STATUS_ACTIVE)}
            className={classnames(styles.btn, styles.filter)}
          >
            {buttonName.activeContests}
          </div>
        )}
        {customerFilter === CONSTANTS.CONTEST_STATUS_FINISHED ? (
          <div className={classnames(styles.btn, styles.activeFilter)}>
            {buttonName.completedContests}
          </div>
        ) : (
          <div
            onClick={() => newFilter(CONSTANTS.CONTEST_STATUS_FINISHED)}
            className={classnames(styles.btn, styles.filter)}
          >
            {buttonName.completedContests}
          </div>
        )}
        {customerFilter === CONSTANTS.CONTEST_STATUS_PENDING ? (
          <div className={classnames(styles.btn, styles.activeFilter)}>
            {buttonName.inactiveContests}
          </div>
        ) : (
          <div
            onClick={() => newFilter(CONSTANTS.CONTEST_STATUS_PENDING)}
            className={classnames(styles.btn, styles.filter)}
          >
            {buttonName.inactiveContests}
          </div>
        )}
      </>
    );
  };

  return (
    <main className={styles.mainContainer}>
      <aside className={styles.filterContainer}>{getButton()}</aside>
      <section className={styles.contestsContainer}>
        {error ? (
          <TryAgain getData={tryToGetContest()} />
        ) : (
          <ContestsContainer
            isFetching={isFetching}
            loadMore={loadMore}
            history={history}
            haveMore={haveMore}
          >
            {setContestList()}
          </ContestsContainer>
        )}
      </section>
    </main>
  );
}

const mapStateToProps = (state) => state.contestsList;

const mapDispatchToProps = (dispatch) => ({
  getContests: (data) => dispatch(getContestsForCustomer(data)),
  clearContestsList: () => dispatch(clearContestList()),
  newFilter: (filter) => dispatch(setNewCustomerFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboard);
