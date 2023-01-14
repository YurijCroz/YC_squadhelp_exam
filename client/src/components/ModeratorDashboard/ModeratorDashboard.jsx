import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import LightBox from "react-image-lightbox";
import {
  getContestsForModerator,
  getOffersForModerator,
  clearModerationList,
  setNewModerationFilter,
  changeShowImage,
  setStatusModerationFilter,
} from "../../actions/actionCreator";
import styles from "./ModeratorDashboard.module.sass";
import TryAgain from "../TryAgain/TryAgain";
import classnames from "classnames";
import CONSTANTS from "../../constants";
import ContestsContainer from "../ContestsContainer/ContestsContainer";
import ContestBoxForModerator from "../ContestBox/ContestBoxForModerator";
import OfferBoxForModerator from "../OfferBox/OfferBoxForModerator";

const buttonName = {
  contests: "Contests",
  offers: "Offers",
};

const { INSPECTION, PASSED, BANNED } = CONSTANTS.STATUS_MODERATION;
const { MODER_STATUS_CONTESTS, MODER_STATUS_OFFERS } = CONSTANTS;

function ModeratorDashboard(props) {
  const { moderatorFilter, error, haveMore, clearModerationList } = props,
    { isShowOnFull, imagePath, changeShowImage } = props,
    { refresh, filterStatus, setFilterStatus } = props;

  const setModerationList = () => {
    const array = [];
    const { moderData } = props;
    if (moderatorFilter === MODER_STATUS_CONTESTS) {
      for (let i = 0; i < moderData.length; i++) {
        array.push(
          <ContestBoxForModerator
            data={moderData[i]}
            key={moderData[i].id}
            goToExtended={goToExtended}
          />
        );
      }
    } else if (moderatorFilter === MODER_STATUS_OFFERS) {
      for (let i = 0; i < moderData.length; i++) {
        array.push(
          <OfferBoxForModerator data={moderData[i]} key={moderData[i].id} />
        );
      }
    }
    return array;
  };

  const filterStatusHandler = () => {
    const state = window.document.getElementById("select");
    setFilterStatus(state.value);
  };

  const getModerationList = (startFrom = 0) => {
    const data = {
      limit: 8,
      offset: startFrom,
      filter: filterStatus,
    };
    if (moderatorFilter === MODER_STATUS_CONTESTS) {
      props.getContests({ ...data });
    }
    if (moderatorFilter === MODER_STATUS_OFFERS) {
      props.getOffers({ ...data });
    }
  };

  const tryToGetModerationList = () => {
    clearModerationList();
    getModerationList();
  };

  const goToExtended = (contestId) => {
    props.history.push(`/dashboard/moderation-contest/${contestId}`);
  };

  useEffect(() => {
    if (refresh) {
      getModerationList();
    }
  }, [refresh]);

  useEffect(() => {
    getModerationList();
    return () => clearModerationList();
  }, [moderatorFilter, filterStatus]);

  const getButton = () => {
    return (
      <>
        {moderatorFilter === MODER_STATUS_CONTESTS ? (
          <div className={classnames(styles.btn, styles.activeFilter)}>
            <h4>{buttonName.contests}</h4>
          </div>
        ) : (
          <div
            onClick={() => props.newFilter(MODER_STATUS_CONTESTS)}
            className={classnames(styles.btn, styles.filter)}
          >
            <h4>{buttonName.contests}</h4>
          </div>
        )}
        {moderatorFilter === MODER_STATUS_OFFERS ? (
          <div className={classnames(styles.btn, styles.activeFilter)}>
            <h4>{buttonName.offers}</h4>
          </div>
        ) : (
          <div
            onClick={() => props.newFilter(MODER_STATUS_OFFERS)}
            className={classnames(styles.btn, styles.filter)}
          >
            <h4>{buttonName.offers}</h4>
          </div>
        )}
      </>
    );
  };

  return (
    <main className={styles.mainContainer}>
      <aside className={styles.filterContainer}>
        <section className={styles.btnContainer}>{getButton()}</section>
        <select
          id="select"
          name="stateList"
          value={filterStatus}
          className={styles.select}
          onChange={filterStatusHandler}
        >
          <option value={INSPECTION}>inspection</option>
          <option value={PASSED}>passed</option>
          <option value={BANNED}>banned</option>
          <option value="all">all</option>
        </select>
      </aside>
      <section className={styles.contestsContainer}>
        {isShowOnFull && (
          <LightBox
            mainSrc={`${CONSTANTS.PUBLIC_URL}images_logo/${imagePath}`}
            onCloseRequest={() =>
              changeShowImage({ isShowOnFull: false, imagePath: null })
            }
          />
        )}
        {error ? (
          <TryAgain getData={tryToGetModerationList()} />
        ) : (
          <ContestsContainer
            isFetching={props.isFetching}
            loadMore={getModerationList}
            history={props.history}
            haveMore={haveMore}
          >
            {setModerationList()}
          </ContestsContainer>
        )}
      </section>
    </main>
  );
}

const mapStateToProps = (state) => state.moderatorList;

const mapDispatchToProps = (dispatch) => ({
  getContests: (data) => dispatch(getContestsForModerator(data)),
  getOffers: (data) => dispatch(getOffersForModerator(data)),
  clearModerationList: () => dispatch(clearModerationList()),
  newFilter: (filter) => dispatch(setNewModerationFilter(filter)),
  setFilterStatus: (filter) => dispatch(setStatusModerationFilter(filter)),
  changeShowImage: (data) => dispatch(changeShowImage(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModeratorDashboard)
);
