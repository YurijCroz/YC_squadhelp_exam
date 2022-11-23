import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from '../../components/LoginForm/LoginForm';
import Logo from '../../components/Logo';
import styles from './LoginPage.module.sass';
import { clearErrorSignUpAndLogin } from '../../actions/actionCreator';
import CONSTANTS from '../../constants';

const LoginPage = (props) => (
  <main className={styles.mainContainer}>
    <section className={styles.loginContainer}>
      <section className={styles.headerSignUpPage}>
        <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
        <section className={styles.linkLoginContainer}>
          <Link
            to="/registration"
            style={{ textDecoration: 'none' }}
          >
            <span>Signup</span>
          </Link>
        </section>
      </section>
      <section className={styles.loginFormContainer}>
        <LoginForm history={props.history} />
      </section>
    </section>
  </main>
);

const mapDispatchToProps = (dispatch) => ({
  clearError: () => dispatch(clearErrorSignUpAndLogin()),
});

export default connect(null, mapDispatchToProps)(LoginPage);
