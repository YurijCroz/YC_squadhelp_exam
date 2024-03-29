import React from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import SelectInput from "../../../SelectInput/SelectInput";
import { addChatToCatalog } from "../../../../actions/actionCreator";
import styles from "./AddToCatalog.module.sass";

const AddToCatalog = ({ catalogList, addChatToCatalog, addChatId }) => {
  const selectArray = catalogList.map((catalog) => catalog.catalogName);
  const valueArray = catalogList.map((catalog) => catalog.id);

  const click = (values) => {
    addChatToCatalog({ chatId: addChatId, catalogId: values.catalogId });
  };

  return (
    <>
      {selectArray.length !== 0 ? (
        <Formik onSubmit={click} initialValues={{ catalogId: "" }}>
          <Form className={styles.form}>
            <SelectInput
              name="catalogId"
              header="name of catalog"
              classes={{
                inputContainer: styles.selectInputContainer,
                inputHeader: styles.selectHeader,
                selectInput: styles.select,
              }}
              optionsArray={selectArray}
              valueArray={valueArray}
            />
            <button type="submit">Add</button>
          </Form>
        </Formik>
      ) : (
        <div className={styles.notFound}>
          You have not created any directories.
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  addChatToCatalog: (data) => dispatch(addChatToCatalog(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCatalog);
