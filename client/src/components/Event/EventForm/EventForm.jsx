import React from "react";
import { Field, Form, Formik } from "formik";
import { format } from "date-fns";
import styles from "./EventForm.module.sass";
import CONSTANTS from "../../../constants.js";

const dateNow = format(new Date(), "yyyy-MM-dd HH:mm").replace(/\s/, "T");

function EventForm({ setIsFetching, getItemLocal, getDiffInSec }) {
  
  const initialValues = {
    title: "",
    deadLine: dateNow,
  };

  const sendLocalStorage = (newLocal) => {
    localStorage.setItem(CONSTANTS.EVENT_KEY, JSON.stringify(newLocal));
  };

  const sortLocalByDate = (local) =>
    local.sort(
      (eventA, eventB) =>
        getDiffInSec(eventA.deadLine) - getDiffInSec(eventB.deadLine)
    );

  const handleSubmit = (values, formikBag) => {
    values.deadLine = new Date(values.deadLine);
    values.startDate = new Date();
    formikBag.resetForm();
    if (getItemLocal()) {
      const local = JSON.parse(getItemLocal());
      const sortLocal = sortLocalByDate([...local, values]);
      sendLocalStorage(sortLocal);
    } else {
      sendLocalStorage([values]);
    }
    setIsFetching(true);
  };

  return (
    <section className={styles.formContainer}>
      <h2>Add event:</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={styles.formEvent}>
          <label>
            <span>title event:</span>
            <Field
              type="text"
              name="title"
              minLength="4"
              maxLength="70"
              placeholder="Entry title event"
            />
          </label>
          <label>
            <span>Date and Time Event:</span>
            <Field
              type="datetime-local"
              name="deadLine"
              min={dateNow}
              className={styles.dateForm}
              required
            />
          </label>
          <button type="submit">Send Event</button>
        </Form>
      </Formik>
    </section>
  );
}

export default EventForm;
