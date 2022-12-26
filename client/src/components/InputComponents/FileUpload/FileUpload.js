import React, { useState } from "react";
import { useField } from "formik";

function FileUpload({ name, classes }) {
  const [field, meta, helpers] = useField(name);
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;
  const [fileName, setFileName] = useState("");

  const onChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    helpers.setValue(file);
  };

  return (
    <section className={fileUploadContainer}>
      <label htmlFor="fileInput" className={labelClass}>
        Choose file
      </label>
      <span id="fileNameContainer" className={fileNameClass}>
        {fileName}
      </span>
      <input
        {...field}
        className={fileInput}
        id="fileInput"
        type="file"
        onChange={onChange}
        value=""
      />
    </section>
  );
}

export default FileUpload;
