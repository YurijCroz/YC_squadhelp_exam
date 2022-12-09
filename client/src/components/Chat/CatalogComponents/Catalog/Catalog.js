import React from 'react';
import styles from './Catalog.module.sass';

const Catalog = (props) => {
  const { deleteCatalog, goToCatalog } = props;
  const { catalogName, chats, _id } = props.catalog;
  return (
    <article className={styles.catalogContainer} onClick={(event) => goToCatalog(event, props.catalog)}>
      <span className={styles.catalogName}>{catalogName}</span>
      <section className={styles.infoContainer}>
        <span>Chats number:  </span>
        <span className={styles.numbers}>{chats.length}</span>
        <i className="fas fa-trash-alt" onClick={(event) => deleteCatalog(event, _id)} />
      </section>
    </article>
  );
};

export default Catalog;
