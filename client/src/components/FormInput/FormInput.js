import React from "react";
import { Field, ErrorMessage } from "formik";
import classnames from "classnames";

const FormInput = ({ classes, label, name, ...rest }) => (
  <Field name={name}>
    {(props) => {
      const {
        field,
        meta: { touched, error },
      } = props;

      const inputClassName = classnames(classes.input, {
        [classes.notValid]: touched && error,
        [classes.valid]: touched && !error,
      });
      return (
        <section className={classes.container}>
          <input
            type="text"
            {...field}
            placeholder={label}
            className={inputClassName}
            {...rest}
          />
          <ErrorMessage
            name={name}
            component="span"
            className={classes.warning}
          />
        </section>
      );
    }}
  </Field>
);

export default FormInput;
