import React, { useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import classnames from "classnames";
import isEqual from "lodash/isEqual";
import {
  getContestsForCreative,
  clearContestList,
  setNewCreatorFilter,
  getDataForContest,
} from "../../../actions/actionCreator";
import ContestsContainer from "../../ContestsContainer/ContestsContainer";
import ContestBox from "../../ContestBox/ContestBox";
import styles from "./CreatorDashboard.module.sass";
import TryAgain from "../../TryAgain/TryAgain";
import RenderSelectType from "./RenderSelectType";
import RenderIndustryType from "./RenderIndustryType";

function CreatorDashboard(props) {
  const {
    location: { search },
    error,
    history,
    clearContestsList,
    getDataForContest,
    haveMore,
    creatorFilter,
    contests,
    newFilter,
    getContests,
    dataForContest,
  } = props;
  const { isFetching } = dataForContest;

  const prevLocationSearchRef = useRef(null);
  const prevCreatorFilterRef = useRef(null);

  useEffect(() => {
    getDataForContest();
    if (parseUrlForParams(search) && !contests.length) {
      getContestsHandler(creatorFilter);
    }
    return () => {
      clearContestsList();
    };
  }, []);

  useEffect(() => {
    if (
      prevLocationSearchRef.current !== null &&
      prevLocationSearchRef.current !== search
    ) {
      parseUrlForParams(search);
    }
    prevLocationSearchRef.current = search;
    prevCreatorFilterRef.current = creatorFilter;
  }, [search]);

  const getContestsHandler = (filter) => {
    getContests({
      limit: 8,
      offset: 0,
      ...filter,
    });
  };

  const changePredicate = ({ name, value }) => {
    newFilter({ [name]: value });
    parseParamsToUrl({
      ...creatorFilter,
      ...{ [name]: value },
    });
  };

  const parseParamsToUrl = (creatorFilter) => {
    const obj = {};
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) obj[el] = creatorFilter[el];
    });
    history.push(`/Dashboard?${queryString.stringify(obj)}`);
  };

  const parseUrlForParams = (search) => {
    const obj = queryString.parse(search);
    const filter = {
      typeIndex: Number(obj.typeIndex) || creatorFilter.typeIndex,
      contestId: obj.contestId || creatorFilter.contestId,
      industry: obj.industry || creatorFilter.industry,
      awardSort: obj.awardSort || creatorFilter.awardSort,
      ownEntries: obj.ownEntries || creatorFilter.ownEntries,
    };
    if (!isEqual(filter, prevCreatorFilterRef.current)) {
      newFilter(filter);
      clearContestsList();
      getContestsHandler(filter);
      return false;
    }
    return true;
  };

  const getPredicateOfRequest = () => {
    const obj = {};
    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) {
        obj[el] = creatorFilter[el];
      }
    });
    obj.ownEntries = creatorFilter.ownEntries;
    return obj;
  };

  const loadMore = (startFrom) => {
    getContests({
      limit: 8,
      offset: startFrom,
      ...getPredicateOfRequest(),
    });
  };

  const getContestList = () => {
    return contests.map((contest) => (
      <ContestBox data={contest} key={contest.id} goToExtended={goToExtended} />
    ));
  };

  const goToExtended = (contestId) => {
    history.push(`/dashboard/contest/${contestId}`);
  };

  const tryLoadAgain = () => {
    clearContestsList();
    getContests({
      limit: 8,
      offset: 0,
      ...getPredicateOfRequest(),
    });
  };

  return (
    <main className={styles.mainContainer}>
      <aside className={styles.filterContainer}>
        <span className={styles.headerFilter}>Filter Results</span>
        <section className={styles.inputsContainer}>
          <button
            onClick={() =>
              changePredicate({
                name: "ownEntries",
                value: !creatorFilter.ownEntries,
              })
            }
            className={classnames(styles.myEntries, {
              [styles.activeMyEntries]: creatorFilter.ownEntries,
            })}
          >
            My Entries
          </button>
          <RenderSelectType
            creatorFilter={creatorFilter}
            changePredicate={changePredicate}
          />
          <section className={styles.inputContainer}>
            <span>By contest ID</span>
            <input
              type="number"
              onChange={({ target }) =>
                changePredicate({
                  name: "contestId",
                  value: target.value,
                })
              }
              name="contestId"
              min="1"
              value={creatorFilter.contestId}
              className={styles.inputText}
            />
          </section>
          {!isFetching && (
            <RenderIndustryType
              creatorFilter={creatorFilter}
              industry={dataForContest.data.industry}
              changePredicate={changePredicate}
            />
          )}
          <section className={styles.inputContainer}>
            <span>By amount award</span>
            <select
              onChange={({ target }) =>
                changePredicate({
                  name: "awardSort",
                  value: target.value,
                })
              }
              value={creatorFilter.awardSort}
              className={styles.input}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </section>
        </section>
      </aside>
      <section className={styles.contestsContainer}>
        {error ? (
          <section className={styles.messageContainer}>
            <TryAgain getData={tryLoadAgain} />
          </section>
        ) : (
          <ContestsContainer
            isFetching={props.isFetching}
            loadMore={loadMore}
            history={history}
            haveMore={haveMore}
          >
            {getContestList()}
          </ContestsContainer>
        )}
      </section>
    </main>
  );
}

const mapStateToProps = (state) => {
  const { contestsList, dataForContest } = state;
  return { ...contestsList, dataForContest };
};

const mapDispatchToProps = (dispatch) => ({
  getContests: (data) => dispatch(getContestsForCreative(data)),
  clearContestsList: () => dispatch(clearContestList()),
  newFilter: (filter) => dispatch(setNewCreatorFilter(filter)),
  getDataForContest: () => dispatch(getDataForContest()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreatorDashboard)
);
