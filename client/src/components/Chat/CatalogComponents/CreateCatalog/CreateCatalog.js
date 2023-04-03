import React from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import FormInput from "../../../FormInput/FormInput";
import styles from "./CreateCatalog.module.sass";
import { createCatalog } from "../../../../actions/actionCreator";
import Schems from "../../../../validators/validationSchems";

const CreateCatalog = ({ createCatalog, addChatId }) => {
  const handleSubmit = (values) => {
    createCatalog({ catalogName: values.catalogName, chatId: addChatId });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ catalogName: "" }}
      validationSchema={Schems.CatalogSchema}
    >
      <Form className={styles.form}>
        <FormInput
          name="catalogName"
          type="text"
          label="name of catalog"
          classes={{
            container: styles.inputContainer,
            input: styles.input,
            warning: styles.fieldWarning,
          }}
        />
        <button type="submit">Create Catalog</button>
      </Form>
    </Formik>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createCatalog: (data) => dispatch(createCatalog(data)),
});

export default connect(
  (state) => state.chatStore,
  mapDispatchToProps
)(CreateCatalog);
