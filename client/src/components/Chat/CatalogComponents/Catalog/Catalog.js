import React from "react";
import styles from "./Catalog.module.sass";

const Catalog = ({ catalog, deleteCatalog, goToCatalog }) => {
  const { catalogName, chats, id } = catalog;

  const handleCatalogClick = (event) => {
    goToCatalog(event, catalog);
  };

  const handleDeleteCatalogClick = (event) => {
    deleteCatalog(event, id);
  };

  return (
    <article className={styles.catalogContainer} onClick={handleCatalogClick}>
      <span className={styles.catalogName}>{catalogName}</span>
      <section className={styles.infoContainer}>
        <span>Chats number: </span>
        <span className={styles.numbers}>{chats.length}</span>
        <i className="fas fa-trash-alt" onClick={handleDeleteCatalogClick} />
      </section>
    </article>
  );
};

export default Catalog;
