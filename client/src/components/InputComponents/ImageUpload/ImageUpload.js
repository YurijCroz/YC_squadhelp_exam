import React from "react";
import classNames from "classnames";
import { useField } from "formik";

const ImageUpload = ({ name, classes }) => {
  const [field, meta, helpers] = useField(name);
  const { uploadContainer, inputContainer, imgStyle } = classes;

  const onChange = (e) => {
    const node = window.document.getElementById("imagePreview");
    const file = e.target.files[0];
    const imageTypeReg = /image.*/;
    if (!file.type.match(imageTypeReg)) {
      e.target.value = "";
    } else {
      helpers.setValue(file);
      const reader = new FileReader();
      reader.onload = () => {
        node.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className={uploadContainer}>
      <section className={inputContainer}>
        <span>Support only images (*.png, *.gif, *.jpeg)</span>
        <input
          {...field}
          id="fileInput"
          type="file"
          value=""
          accept=".jpg, .png, .jpeg"
          onChange={onChange}
        />
        <label htmlFor="fileInput">Chose file</label>
      </section>
      <img
        id="imagePreview"
        className={classNames({ [imgStyle]: field.value })}
        alt="user"
      />
    </section>
  );
};

export default ImageUpload;
