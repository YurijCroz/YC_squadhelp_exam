import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import Header from "../../components/Header/Header";
import styles from "./UserProfile.module.sass";
import CONSTANTS from "../../constants";
import UserInfo from "../../components/UserInfo/UserInfo";
import PayForm from "../../components/PayForm/PayForm";
import {
  cashOut,
  changeProfileModeView,
  clearPaymentStore,
} from "../../actions/actionCreator";
import Error from "../../components/Error/Error";

const UserProfile = (props) => {
  const pay = (values) => {
    const { number, expiry, cvc, sum } = values;
    props.cashOut({
      number,
      expiry,
      cvc,
      sum,
    });
  };

  const {
    balance,
    role,
    profileModeView,
    changeProfileModeView,
    error,
    clearPaymentStore,
  } = props;
  return (
    <>
      <main className={styles.mainContainer}>
        <aside className={styles.aside}>
          <span className={styles.headerAside}>Select Option</span>
          <section className={styles.optionsContainer}>
            <button
              className={classNames(styles.optionButton, {
                [styles.currentOption]:
                  profileModeView === CONSTANTS.USER_INFO_MODE,
              })}
              onClick={() => changeProfileModeView(CONSTANTS.USER_INFO_MODE)}
            >
              UserInfo
            </button>
            {role === CONSTANTS.CREATOR && (
              <button
                className={classNames(styles.optionButton, {
                  [styles.currentOption]:
                    profileModeView === CONSTANTS.CASHOUT_MODE,
                })}
                onClick={() => changeProfileModeView(CONSTANTS.CASHOUT_MODE)}
              >
                Cashout
              </button>
            )}
          </section>
        </aside>
        {profileModeView === CONSTANTS.USER_INFO_MODE ? (
          <UserInfo />
        ) : (
          <section className={styles.container}>
            {parseInt(balance) === 0 ? (
              <span className={styles.notMoney}>
                There is no money on your balance
              </span>
            ) : (
              <section>
                {error && (
                  <Error
                    data={error.data}
                    status={error.status}
                    clearError={clearPaymentStore}
                  />
                )}
                <PayForm sendRequest={pay} />
              </section>
            )}
          </section>
        )}
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  const { balance, role } = state.userStore.data;
  const { profileModeView } = state.userProfile;
  const { error } = state.payment;
  return {
    balance,
    role,
    profileModeView,
    error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  cashOut: (data) => dispatch(cashOut(data)),
  changeProfileModeView: (data) => dispatch(changeProfileModeView(data)),
  clearPaymentStore: () => dispatch(clearPaymentStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
