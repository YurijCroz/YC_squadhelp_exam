import React from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import {
  changeShowModeCatalog,
  changeRenameCatalogMode,
  changeCatalogName,
} from "../../../../actions/actionCreator";
import styles from "./CatalogHeader.module.sass";
import FormInput from "../../../FormInput/FormInput";
import Schems from "../../../../validators/validationSchems";

const CatalogHeader = ({
  catalogName,
  isRenameCatalog,
  initialValues,
  id,
  changeShowModeCatalog,
  changeRenameCatalogMode,
  changeCatalogName,
}) => {
  const handleCatalogNameChange = (values) => {
    changeCatalogName({ catalogName: values.catalogName, catalogId: id });
  };
  
  return (
    <section className={styles.headerContainer}>
      <i
        className="fas fa-long-arrow-alt-left"
        onClick={() => changeShowModeCatalog()}
        aria-label="Go to previous screen"
      />
      {!isRenameCatalog && (
        <section className={styles.infoContainer}>
          <span>{catalogName}</span>
          <i
            className="fas fa-edit"
            onClick={() => changeRenameCatalogMode()}
            aria-label="Edit Catalog Name"
          />
        </section>
      )}
      {isRenameCatalog && (
        <section className={styles.changeContainer}>
          <Formik
            onSubmit={handleCatalogNameChange}
            initialValues={initialValues}
            validationSchema={Schems.CatalogSchema}
          >
            <Form>
              <FormInput
                name="catalogName"
                classes={{
                  container: styles.inputContainer,
                  input: styles.input,
                  warning: styles.fieldWarning,
                  notValid: styles.notValid,
                }}
                type="text"
                label="Catalog Name"
              />
              <button type="submit">Change</button>
            </Form>
          </Formik>
        </section>
      )}
    </section>
  );
};

const mapStateToProps = (state) => {
  const { isRenameCatalog, currentCatalog } = state.chatStore;
  const { catalogName, id } = currentCatalog;
  return {
    id,
    catalogName,
    isRenameCatalog,
    initialValues: {
      catalogName,
    },
  };
};

export default connect(mapStateToProps, { 
  changeShowModeCatalog, 
  changeRenameCatalogMode,
  changeCatalogName
})(CatalogHeader);