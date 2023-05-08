import React, { useState } from "react";
import styles from "./BundleBox.module.sass";
import CONSTANTS from "../../constants";

const BundleBox = (props) => {
  const { setBundle, header, describe, path } = props;
  const [showBlueImage, setShowBlueImage] = useState(false);
  const defaultPathToImages = `${CONSTANTS.STATIC_IMAGES_PATH}contestLabels/`;

  const renderImage = () =>
    path.map((pathItem, i) => (
      <div key={i} className={styles.imgContainer}>
        <img
          src={defaultPathToImages + pathItem}
          alt={pathItem.replace(/.png/g, "Contest")}
          style={{ display: !showBlueImage ? "block" : "none" }}
        />
        <img
          src={`${defaultPathToImages}blue_${pathItem}`}
          alt={pathItem.replace(/.png/g, "Contest")}
          style={{ display: showBlueImage ? "block" : "none" }}
        />
      </div>
    ));

  const handleImageChange = (event) => {
    const element = document.getElementById(header);
    if (!element.contains(event.relatedTarget)) {
      setShowBlueImage(!showBlueImage);
    }
  };

  const getBackClass = () =>
    path.length === 1 ? " " : ` ${styles.combinedBundle}`;

  return (
    <section
      onMouseOver={handleImageChange}
      onMouseOut={handleImageChange}
      onClick={() => setBundle(header)}
      id={header}
      className={styles.bundleContainer + getBackClass()}
    >
      <div>{renderImage()}</div>
      <article className={styles.infoContainer}>
        <span className={styles.bundleName}>{header}</span>
        <hr />
        <span className={styles.infoBundle}>{describe}</span>
      </article>
    </section>
  );
};

export default BundleBox;
