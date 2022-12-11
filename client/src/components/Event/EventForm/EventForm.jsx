import React from "react";
import { Field, Form, Formik } from "formik";
import { format } from "date-fns";
import styles from "./EventForm.module.sass";
import CONSTANTS from "../../../constants.js";

function EventForm({ setIsFetching, getItemLocal, getDiffInSec }) {
  const initialValues = {
    title: "",
    deadLine: "",
  };

  const dateNow = () =>
    format(new Date(), "yyyy-MM-dd HH:mm").replace(/\s/, "T");

  const sendLocalStorage = (values, local) => {
    local.push(values);
    localStorage.setItem(CONSTANTS.EVENT_KEY, JSON.stringify(local));
  };

  const sortLocalByDate = () => {
    const local = JSON.parse(getItemLocal());
    const sortLocal = local.sort((eventA, eventB) => {
      return getDiffInSec(eventA.deadLine) - getDiffInSec(eventB.deadLine);
    });
    localStorage.setItem(CONSTANTS.EVENT_KEY, JSON.stringify(sortLocal));
    setIsFetching(true);
  };

  const handleSubmit = (values, formikBag) => {
    values.deadLine = new Date(values.deadLine);
    values.startDate = new Date();
    formikBag.resetForm();
    if (getItemLocal()) {
      const local = JSON.parse(getItemLocal());
      sendLocalStorage(values, local);
      sortLocalByDate();
    } else {
      const local = [];
      sendLocalStorage(values, local);
      setIsFetching(true);
    }
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
              minlength="4"
              maxlength="70"
              placeholder="Entry title event"
            />
          </label>
          <label>
            <span>Date and Time Event:</span>
            <Field
              type="datetime-local"
              name="deadLine"
              min={dateNow()}
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
