import React from "react";
import { Field, Form, Formik } from "formik";
import { format } from "date-fns";
import styles from "./EventForm.module.sass";

const dateNow = () => format(new Date(), "yyyy-MM-dd HH:mm").replace(/\s/, "T");

function EventForm({ getDiffInSec, events, setLocalStorageEvents }) {
  const initialValues = {
    title: "",
    deadLine: dateNow(),
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
    if (events) {
      const sortLocal = sortLocalByDate([...events, values]);
      setLocalStorageEvents(sortLocal);
    } else {
      setLocalStorageEvents([values]);
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
              minLength="4"
              maxLength="70"
              placeholder="Entry title event"
              required
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
