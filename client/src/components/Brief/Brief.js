import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateContest,
  changeEditContest,
  clearUpdateContestStore,
} from "../../actions/actionCreator";
import ContestForm from "../ContestForm/ContestForm";
import styles from "./Brief.module.sass";
import ContestInfo from "../Contest/ContestInfo/ContestInfo";
import Error from "../Error/Error";

const Brief = ({
  contestData,
  isEditContest,
  updateContestStore,
  userStore,
  update,
  changeEditContest,
  clearUpdateContestStore,
  role,
  goChat,
}) => {
  const setNewContestData = (values) => {
    const data = new FormData();
    for (let [key, value] of Object.entries(values)) {
      if (key !== "file" && value) {
        data.append(key, value);
      }
    }
    if (values.file instanceof File) {
      data.append("file", values.file);
    }
    data.append("contestId", contestData.id);
    update(data);
  };

  const getContestObjInfo = () => {
    const defaultData = {};
    for (let [key, value] of Object.entries(contestData)) {
      if (value) {
        key === "originalFileName"
          ? (defaultData.file = { name: value })
          : (defaultData[key] = value);
      }
    }
    return defaultData;
  };

  const { error } = updateContestStore;
  const { id } = userStore.data;

  return !isEditContest ? (
    <ContestInfo
      userId={id}
      contestData={contestData}
      changeEditContest={changeEditContest}
      role={role}
      goChat={goChat}
    />
  ) : (
    <section className={styles.contestForm}>
      {error && (
        <Error
          data={error.data}
          status={error.status}
          clearError={clearUpdateContestStore}
        />
      )}
      <ContestForm
        contestType={contestData.contestType}
        defaultData={getContestObjInfo()}
        handleSubmit={setNewContestData}
      />
    </section>
  );
};

const mapStateToProps = ({
  contestByIdStore: { isEditContest },
  updateContestStore,
  userStore,
}) => ({
  isEditContest,
  updateContestStore,
  userStore,
});

const mapDispatchToProps = (dispatch) => ({
  update: (data) => dispatch(updateContest(data)),
  changeEditContest: (data) => dispatch(changeEditContest(data)),
  clearUpdateContestStore: () => dispatch(clearUpdateContestStore()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Brief));
