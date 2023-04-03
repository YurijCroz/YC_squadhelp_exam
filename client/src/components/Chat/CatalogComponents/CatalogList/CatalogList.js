import React from "react";
import { connect } from "react-redux";
import Catalog from "../Catalog/Catalog";
import styles from "../CatalogListContainer/CatalogListContainer.module.sass";
import {
  changeShowModeCatalog,
  deleteCatalog,
} from "../../../../actions/actionCreator";

const CatalogList = ({
  catalogList,
  changeShowModeCatalogAction,
  deleteCatalogAction,
}) => {
  const goToCatalog = (event, catalog) => {
    changeShowModeCatalogAction(catalog);
    event.stopPropagation();
  };

  const removeCatalog = (event, catalogId) => {
    deleteCatalogAction({ catalogId });
    event.stopPropagation();
  };

  const elementList = catalogList.map((catalog) => (
    <Catalog
      catalog={catalog}
      key={catalog.id}
      deleteCatalog={removeCatalog}
      goToCatalog={goToCatalog}
    />
  ));

  return (
    <section className={styles.listContainer}>
      {elementList.length ? (
        elementList
      ) : (
        <span className={styles.notFound}>
          You have not created any directories.
        </span>
      )}
    </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeShowModeCatalogAction: (data) => dispatch(changeShowModeCatalog(data)),
  deleteCatalogAction: (data) => dispatch(deleteCatalog(data)),
});

export default connect(null, mapDispatchToProps)(CatalogList);
