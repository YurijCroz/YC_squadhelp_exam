import React from "react";
import styles from "../../Brief/Brief.module.sass";
import CONSTANTS from "../../../constants";
import LogoContestSpecialInfo from "./LogoContestSpecialInfo";
import NameContestSpecialInfo from "./NameContestSpecialInfo";
import TaglineContestSpecialInfo from "./TaglineContestSpecialInfo";

const ContestInfo = (props) => {
  const { changeEditContest, userId, contestData, role, goChat } = props;
  const {
    typeOfTagline,
    brandStyle,
    typeOfName,
    styleName,
    contestType,
    title,
    focusOfWork,
    targetCustomer,
    industry,
    originalFileName,
    fileName,
    User,
    status,
  } = contestData;
  return (
    <article className={styles.mainContestInfoContainer}>
      <section className={styles.infoContainer}>
        <section className={styles.contestTypeContainer}>
          <section className={styles.dataContainer}>
            <span className={styles.label}>Contest Type</span>
            <span className={styles.data}>{contestType}</span>
          </section>
          {User.id === userId &&
            status !== CONSTANTS.CONTEST_STATUS_FINISHED && (
              <button
                onClick={() => changeEditContest(true)}
                className={styles.editBtn}
              >
                Edit
              </button>
            )}
          {role === CONSTANTS.CREATOR && (
            <i onClick={goChat} className="fas fa-comments" />
          )}
        </section>
        <section className={styles.dataContainer}>
          <span className={styles.label}>Title of the Project</span>
          <span className={styles.data}>{title}</span>
        </section>
        {contestType === CONSTANTS.NAME_CONTEST ? (
          <NameContestSpecialInfo
            typeOfName={typeOfName}
            styleName={styleName}
          />
        ) : contestType === CONSTANTS.TAGLINE_CONTEST ? (
          <TaglineContestSpecialInfo
            typeOfTagline={typeOfTagline}
            nameVenture={contestData.nameVenture}
          />
        ) : (
          <LogoContestSpecialInfo
            brandStyle={brandStyle}
            nameVenture={contestData.nameVenture}
          />
        )}
        <section className={styles.dataContainer}>
          <span className={styles.label}>
            What is your Business/ Brand about?
          </span>
          <span className={styles.data}>{focusOfWork}</span>
        </section>
        <section className={styles.dataContainer}>
          <span className={styles.label}>
            Description target customers of company{" "}
          </span>
          <span className={styles.data}>{targetCustomer}</span>
        </section>
        <section className={styles.dataContainer}>
          <span className={styles.label}>Industry of company</span>
          <span className={styles.data}>{industry}</span>
        </section>
        {originalFileName && (
          <section className={styles.dataContainer}>
            <span className={styles.label}>Additional File</span>
            <a
              target="_blank"
              className={styles.file}
              href={`${CONSTANTS.publicURL}${fileName}`}
              download={originalFileName}
              rel="noreferrer"
            >
              {originalFileName}
            </a>
          </section>
        )}
      </section>
    </article>
  );
};

export default ContestInfo;
