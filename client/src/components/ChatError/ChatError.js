import React from 'react';
import styles from './ChatError.module.sass';

const ChatError = (props) => {
  const { getData } = props;
  return (
    <section className={styles.errorContainer} onClick={() => getData()}>
      <section className={styles.container}>
        <span>Server Error</span>
        <i className="fas fa-redo" />
      </section>
    </section>
  );
};

export default ChatError;
