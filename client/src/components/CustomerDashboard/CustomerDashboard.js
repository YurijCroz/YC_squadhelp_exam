import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import {
  getContestsForCustomer,
  clearContestList,
  setNewCustomerFilter,
} from "../../actions/actionCreator";
import CONSTANTS from "../../constants";
import ContestsContainer from "../ContestsContainer/ContestsContainer";
import ContestBox from "../ContestBox/ContestBox";
import styles from "./CustomerDashboard.module.sass";
import TryAgain from "../TryAgain/TryAgain";

const buttonName = {
  activeContests: "Active Contests",
  completedContests: "Completed Contests",
  inactiveContests: "Inactive contests",
};

class CustomerDashboard extends React.Component {
  loadMore = (startFrom) => {
    this.props.getContests({
      limit: 8,
      offset: startFrom,
      contestStatus: this.props.customerFilter,
    });
  };

  componentDidMount() {
    this.getContests();
  }

  getContests = () => {
    this.props.getContests({
      limit: 8,
      contestStatus: this.props.customerFilter,
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.customerFilter !== prevProps.customerFilter) {
      this.getContests();
    }
  }

  goToExtended = (contest_id) => {
    this.props.history.push(`/dashboard/contest/${contest_id}`);
  };

  setContestList = () => {
    const array = [];
    const { contests } = this.props;
    for (let i = 0; i < contests.length; i++) {
      array.push(
        <ContestBox
          data={contests[i]}
          key={contests[i].id}
          goToExtended={this.goToExtended}
        />
      );
    }
    return array;
  };

  componentWillUnmount() {
    this.props.clearContestsList();
  }

  tryToGetContest = () => {
    this.props.clearContestsList();
    this.getContests();
  };

  getButton() {
    const { customerFilter, newFilter } = this.props;

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
  }

  render() {
    const { error, haveMore } = this.props;

    return (
      <main className={styles.mainContainer}>
        <aside className={styles.filterContainer}>{this.getButton()}</aside>
        <section className={styles.contestsContainer}>
          {error ? (
            <TryAgain getData={this.tryToGetContest()} />
          ) : (
            <ContestsContainer
              isFetching={this.props.isFetching}
              loadMore={this.loadMore}
              history={this.props.history}
              haveMore={haveMore}
            >
              {this.setContestList()}
            </ContestsContainer>
          )}
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => state.contestsList;

const mapDispatchToProps = (dispatch) => ({
  getContests: (data) => dispatch(getContestsForCustomer(data)),
  clearContestsList: () => dispatch(clearContestList()),
  newFilter: (filter) => dispatch(setNewCustomerFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboard);
