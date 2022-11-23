import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../../components/Logo";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import styles from "./RegistrationPage.module.sass";
import { clearErrorSignUpAndLogin } from "../../actions/actionCreator";
import CONSTANTS from "../../constants";
import ArticlesRegList from '../../components/ArticlesRegList/ArticlesRegList.jsx';

const RegistrationPage = (props) => {
  props.clearError();

  return (
    <main className={styles.signUpPage}>
      <section className={styles.signUpContainer}>
        <section className={styles.headerSignUpPage}>
          <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} />
          <section className={styles.linkLoginContainer}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <span>Login</span>
            </Link>
          </section>
        </section>
        <RegistrationForm history={props.history} />
      </section>
      <section className={styles.footer}>
        <ArticlesRegList />
      </section>
    </main>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearError: () => dispatch(clearErrorSignUpAndLogin()),
});

export default connect(null, mapDispatchToProps)(RegistrationPage);
