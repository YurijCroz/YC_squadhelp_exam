import React from "react";
import { Field } from "formik";

const AgreeTermOfServiceInput = ({ id, type, classes, label, ...rest }) => (
  <Field {...rest}>
    {({ meta: { touched, error }, field }) => (
      <>
        <section className={classes.container}>
          <input {...field} placeholder={label} id={id} type={type} />
          <label htmlFor={id}>
            By clicking this checkbox, you agree to our{" "}
            <a href="https://www.google.com" target="_blank" rel="noreferrer">
              Terms of Service.
            </a>
          </label>
        </section>
        {touched && error && <span className={classes.warning}>{error}</span>}
      </>
    )}
  </Field>
);

export default AgreeTermOfServiceInput;
