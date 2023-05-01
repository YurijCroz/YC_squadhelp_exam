import React, { useEffect } from "react";
import styles from "./ContestContainer.module.sass";
import Spinner from "../Spinner/Spinner";

const ContestsContainer = ({ haveMore, isFetching, children, loadMore }) => {
  const scrollHandler = () => {
    if (
      window.innerHeight + window.pageYOffset >=
        document.documentElement.offsetHeight - 20 &&
      haveMore
    ) {
      loadMore(children.length);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [haveMore, children.length, loadMore]);

  return (
    <>
      {children}
      {!isFetching && children.length === 0 && (
        <section className={styles.notFound}>Nothing not found</section>
      )}
      {isFetching && (
        <section className={styles.spinnerContainer}>
          <Spinner />
        </section>
      )}
    </>
  );
};

export default ContestsContainer;
