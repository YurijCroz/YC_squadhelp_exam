import React from "react";
import { Field, Form, Formik } from "formik";
import { format, differenceInSeconds } from "date-fns";
import styles from "./EventForm.module.sass";

function EventForm({setIsFetching}) {
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

  const sortLocalByDate = () => {
    const local = JSON.parse(localStorage.getItem("event"));
    const sortLocal = local.sort((a, b)=> {
      return differenceInSeconds(new Date(a.deadLine), new Date())-differenceInSeconds(new Date(b.deadLine), new Date())
    })
    localStorage.setItem("event", JSON.stringify(sortLocal));
    setIsFetching(true);
  }

  const handleSubmit = (values, formikBag) => {
    values.deadLine = new Date(values.deadLine)
    values.startDate = new Date();
    formikBag.resetForm();
    if (localStorage.getItem("event")) {
      const local = JSON.parse(localStorage.getItem("event"));
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
            <Field type="text" name="title" minlength="4" maxlength="70" placeholder="Entry title event" />
          </label>
          <label>
            <span>Date and Time Event:</span>
            <Field type="datetime-local" name="deadLine" min={dateNow()} required/>
          </label>
          <button type="submit">Send Event</button>
        </Form>
      </Formik>
    </section>
  );
}

export default EventForm;
