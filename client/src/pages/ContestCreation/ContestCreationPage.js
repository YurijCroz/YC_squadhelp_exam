import React, { useRef } from "react";
import { connect } from "react-redux";
import styles from "./ContestCreationPage.module.sass";
import {
  saveContestToStore,
  clearDataForContest,
} from "../../actions/actionCreator";
import NextButton from "../../components/NextButton/NextButton";
import ContestForm from "../../components/ContestForm/ContestForm";
import BackButton from "../../components/BackButton/BackButton";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

const ContestCreationPage = (props) => {
  const formRef = useRef();
  const contestData = props.contestStore.contests[props.contestType]
    ? props.contestStore.contests[props.contestType]
    : { contestType: props.contestType };

  const handleSubmit = (values) => {
    props.saveContest({ type: props.contestType, info: values });
    const route =
      props.bundleStore.bundle[props.contestType] === "payment"
        ? "/payment"
        : `${props.bundleStore.bundle[props.contestType]}Contest`;
    props.history.push(route);
  };

  const submitForm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  !props.bundleStore.bundle && props.history.replace("/startContest");

  return (
    <>
      <main>
        <section className={styles.startContestHeader}>
          <article className={styles.startContestInfo}>
            <h2>{props.title}</h2>
            <span>
              Tell us a bit more about your business as well as your preferences
              so that creatives get a better idea about what you are looking for
            </span>
          </article>
          <ProgressBar currentStep={2} />
        </section>
        <section className={styles.container}>
          <section className={styles.formContainer}>
            <ContestForm
              contestType={props.contestType}
              handleSubmit={handleSubmit}
              formRef={formRef}
              defaultData={contestData}
            />
          </section>
        </section>
        <section className={styles.footerButtonsContainer}>
          <section className={styles.lastContainer}>
            <section className={styles.buttonsContainer}>
              <BackButton />
              <NextButton submit={submitForm} />
            </section>
          </section>
        </section>
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  const { contestStore, bundleStore } = state;
  return { contestStore, bundleStore };
};

const mapDispatchToProps = (dispatch) => ({
  saveContest: (data) => dispatch(saveContestToStore(data)),
  clearDataForContest: () => dispatch(clearDataForContest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContestCreationPage);
