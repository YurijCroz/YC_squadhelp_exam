import React from 'react';
import styles from "./StepsContest.module.sass";
import CONSTANTS from "../../../constants";
import stepArticle from "./stepArticle.json";

function StepsContest() {

  const getListStep = () => {
    return (
      <ul className={styles.listUnstyled} >
        {stepArticle.map((step, index)=>
          <li key={index} >
            <article className={styles.media} >
              <div className={styles.indicatorStep} >
                <span>{`${++index}.`}</span>
              </div>
              <p>{step}</p>
            </article>
          </li>
        )}
      </ul>
    )
  }

  return (
    <section className={styles.container} >
      <article className={styles.article} >
        <div className={styles.images} >
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}iconCup.svg`} alt="cup" />
        </div>
        <h2>How Do Naming Contests Work?</h2>
      </article>
      <section className={styles.stepWrapper} >
        <section className={styles.stepsContainer} >
          {getListStep()}
        </section>
        <div className={styles.images} >
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}svgMan.svg`} alt="man" />
        </div>
      </section>
    </section>
  )
}

export default StepsContest