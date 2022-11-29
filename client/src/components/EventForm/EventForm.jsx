import React from "react";
import { Field, Form, Formik } from "formik";
import { format } from "date-fns";
import styles from "./EventForm.module.sass";

function EventForm() {
  const initialValues = {
    title: "",
    deadLine: "",
  };

  const dateNow = () =>
    format(new Date(), "yyyy-MM-dd HH:mm").replace(/\s/, "T");

  const sendLocalStorage = (values, local) => {
    local.push(values);
    localStorage.setItem("event", JSON.stringify(local));
  };

  const handleSubmit = (values, formikBag) => {
    values.startDate = dateNow();
    formikBag.resetForm();
    if (localStorage.getItem("event")) {
      const local = JSON.parse(localStorage.getItem("event"));
      sendLocalStorage(values, local);
    } else {
      const local = [];
      sendLocalStorage(values, local);
    }
  };

  return (
    <section className={styles.formContainer}>
      <h2>Add event:</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={styles.formEvent}>
          <label>
            <span>title event:</span>
            <Field type="text" name="title" minlength="4" maxlength="70" placeholder="Entry title event" />
          </label>
          <label>
            <span>Date and Time Event:</span>
            <Field type="datetime-local" name="deadLine" min={dateNow()} required/>
          </label>
          <button type="submit">Send data</button>
        </Form>
      </Formik>
    </section>
  );
}

export default EventForm;
