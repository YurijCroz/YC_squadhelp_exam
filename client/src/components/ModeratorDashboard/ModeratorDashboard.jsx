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

function ModeratorDashboard(props) {
  const { moderatorFilter, error, haveMore, clearModerationList } = props,
    { isShowOnFull, imagePath, changeShowImage } = props,
    { refresh, filterStatus, setFilterStatus } = props;

  const setModerationList = () => {
    const array = [];
    const { moderData } = props;
    if (moderatorFilter === CONSTANTS.MODER_STATUS_CONTESTS) {
      for (let i = 0; i < moderData.length; i++) {
        array.push(
          <ContestBoxForModerator
            data={moderData[i]}
            key={moderData[i].id}
            goToExtended={goToExtended}
          />
        );
      }
    } else if (moderatorFilter === CONSTANTS.MODER_STATUS_OFFERS) {
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
    if (moderatorFilter === CONSTANTS.MODER_STATUS_CONTESTS) {
      props.getContests({ ...data });
    }
    if (moderatorFilter === CONSTANTS.MODER_STATUS_OFFERS) {
      props.getOffers({ ...data });
    }
  };

  const tryToGetModerationList = () => {
    clearModerationList();
    getModerationList();
  };

  const goToExtended = (contest_id) => {
    props.history.push(`/dashboard/moderation-contest/${contest_id}`);
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

  return (
    <main className={styles.mainContainer}>
      <aside className={styles.filterContainer}>
        <section className={styles.btnContainer}>
          <section
            onClick={() => props.newFilter(CONSTANTS.MODER_STATUS_CONTESTS)}
            className={classnames(styles.btn, {
              [styles.activeFilter]:
                CONSTANTS.MODER_STATUS_CONTESTS === moderatorFilter,
              [styles.filter]:
                CONSTANTS.MODER_STATUS_CONTESTS !== moderatorFilter,
            })}
          >
            <h4>Contests</h4>
          </section>
          <section
            onClick={() => props.newFilter(CONSTANTS.MODER_STATUS_OFFERS)}
            className={classnames(styles.btn, {
              [styles.activeFilter]:
                CONSTANTS.MODER_STATUS_OFFERS === moderatorFilter,
              [styles.filter]:
                CONSTANTS.MODER_STATUS_OFFERS !== moderatorFilter,
            })}
          >
            <h4>Offers</h4>
          </section>
        </section>
        <select
          id="select"
          name="stateList"
          value={filterStatus}
          className={styles.select}
          onChange={filterStatusHandler}
        >
          <option value="inspection">inspection</option>
          <option value="passed">passed</option>
          <option value="banned">banned</option>
          <option value="all">all</option>
        </select>
      </aside>
      <section className={styles.contestsContainer}>
        {isShowOnFull && (
          <LightBox
            mainSrc={`${CONSTANTS.publicURL}${imagePath}`}
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
