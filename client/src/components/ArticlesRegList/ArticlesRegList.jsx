import articles from './articles.json';
import React from 'react';
import styles from "./ArticlesRegList.module.sass";
import CONSTANTS from '../../constants';

function ArticlesRegList() {
  const getAdditionalArticle = index => {
    if(index === 1) {
      return (
        <articles>
          <h3 className={styles.headerArticle}>
            I have other questions! How can I get in touch with Squadhelp?
          </h3>
          <p className={styles.article}>
            Check out our <span className={styles.orangeSpan}>FAQs</span> or
            send us a <span className={styles.orangeSpan}>message</span>.
            For assistance with launching a contest, 
            you can also call us at {
              <a className={styles.orangeSpan} href={`tel:${CONSTANTS.CONTACTS.TEL}`}>
                {CONSTANTS.CONTACTS.TEL}
              </a>
            } or schedule a <span className={styles.orangeSpan}>Branding Consultation</span>
          </p>
        </articles>
      )
    }
  }
  return (
    <section className={styles.articlesMainContainer}>
      {articles.map((column, index) => (
        <section className={styles.ColumnContainer} key={index}>
          {column.map(article => (
            <articles>
              <h3 className={styles.headerArticle}>{article.title}</h3>
              <p className={styles.article}>{article.text}</p>
            </articles>
          ))}
          {getAdditionalArticle(index)}
        </section>
      ))}
    </section>
  )
}

export default ArticlesRegList