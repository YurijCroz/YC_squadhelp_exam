import React from "react";
import { connect } from "react-redux";
import Catalog from "../Catalog/Catalog";
import styles from "../CatalogListContainer/CatalogListContainer.module.sass";
import {
  changeShowModeCatalog,
  deleteCatalog,
} from "../../../../actions/actionCreator";

const CatalogList = (props) => {
  const goToCatalog = (event, catalog) => {
    props.changeShowModeCatalog(catalog);
    event.stopPropagation();
  };

  const deleteCatalog = (event, catalogId) => {
    props.deleteCatalog({ catalogId });
    event.stopPropagation();
  };

  const getListCatalog = () => {
    const { catalogList } = props;
    const elementList = [];
    catalogList.forEach((catalog) => {
      elementList.push(
        <Catalog
          catalog={catalog}
          key={catalog.id}
          deleteCatalog={deleteCatalog}
          goToCatalog={goToCatalog}
        />
      );
    });
    return elementList.length ? (
      elementList
    ) : (
      <span className={styles.notFound}>
        You have not created any directories.
      </span>
    );
  };

  return <section className={styles.listContainer}>{getListCatalog()}</section>;
};

const mapDispatchToProps = (dispatch) => ({
  changeShowModeCatalog: (data) => dispatch(changeShowModeCatalog(data)),
  deleteCatalog: (data) => dispatch(deleteCatalog(data)),
});

export default connect(null, mapDispatchToProps)(CatalogList);
