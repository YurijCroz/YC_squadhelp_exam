import React from "react";
import articles from "./articles.json";
import styles from "./ArticlesRegList.module.sass";
import CONSTANTS from "../../constants";

function AdditionalArticle() {
  return (
    <article>
      <h3 className={styles.headerArticle}>
        I have other questions! How can I get in touch with Squadhelp?
      </h3>
      <p className={styles.article}>
        Check out our <span className={styles.orangeSpan}>FAQs</span> or send us
        a <span className={styles.orangeSpan}>message</span>. For assistance
        with launching a contest, you can also call us at{" "}
        {
          <a
            className={styles.orangeSpan}
            href={`tel:${CONSTANTS.CONTACTS.TEL}`}
          >
            {CONSTANTS.CONTACTS.TEL}
          </a>
        }{" "}
        or schedule a <span className={styles.orangeSpan}>Branding Consultation</span>
      </p>
    </article>
  );
}

function ArticlesRegList() {
  return (
    <section className={styles.articlesMainContainer}>
      {articles.map((column, columnIndex) => (
        <section className={styles.columnContainer} key={columnIndex}>
          {column.map((article, articleIndex) => (
            <article key={articleIndex}>
              <h3 className={styles.headerArticle}>{article.title}</h3>
              <p className={styles.article}>{article.text}</p>
            </article>
          ))}
          {columnIndex === 1 && <AdditionalArticle />}
        </section>
      ))}
    </section>
  );
}

export default ArticlesRegList;
