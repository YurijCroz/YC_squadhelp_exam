import articles from './articles.json';
import React from 'react';
import styles from "./RegistrationPage.module.sass";
import CONSTANTS from '../../constants';

function ArticlesRegList() {
  const getAdditionalArticle = index => {
    if(index === 1) {
      return (
        <>
          <div className={styles.headerArticle}>
            I have other questions! How can I get in touch with Squadhelp?
          </div>
          <div className={styles.article}>
            Check out our <span className={styles.orangeSpan}>FAQs</span> or
            send us a <span className={styles.orangeSpan}>message</span>.
            For assistance with launching a contest, 
            you can also call us at {
              <a className={styles.orangeSpan} href={`tel:${CONSTANTS.CONTACTS.TEL}`}>
                {CONSTANTS.CONTACTS.TEL}
              </a>
            } or schedule a <span className={styles.orangeSpan}>Branding Consultation</span>
          </div>
        </>
      )
    }
  }
  return (
    <div className={styles.articlesMainContainer}>
      {articles.map((column, index) => (
        <div className={styles.ColumnContainer} key={index}>
          {column.map(article => (
            <div>
              <div className={styles.headerArticle}>{article.title}</div>
              <div className={styles.article}>{article.text}</div>
            </div>
          ))}
          {getAdditionalArticle(index)}
        </div>
      ))}
    </div>
  )
}

export default ArticlesRegList