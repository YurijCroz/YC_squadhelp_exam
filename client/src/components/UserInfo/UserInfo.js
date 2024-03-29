import React from "react";
import { connect } from "react-redux";
import UpdateUserInfoForm from "../UpdateUserInfoForm/UpdateUserInfoForm";
import {
  updateUserData,
  changeEditModeOnUserProfile,
} from "../../actions/actionCreator";
import CONSTANTS from "../../constants";
import styles from "./UserInfo.module.sass";

const UserInfo = (props) => {
  const updateUserData = (values) => {
    const formData = new FormData();
    formData.append("file", values.file);
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("displayName", values.displayName);
    props.updateUser(formData);
  };

  const { isEdit, changeEditMode, data } = props;
  const { avatar, firstName, lastName, displayName, email, role, balance } =
    data;
  return (
    <section className={styles.mainContainer}>
      {isEdit ? (
        <UpdateUserInfoForm onSubmit={updateUserData} />
      ) : (
        <article className={styles.infoContainer}>
          <img
            src={`${CONSTANTS.PUBLIC_URL}images_avatar/${avatar}`}
            className={styles.avatar}
            alt="user"
          />
          <section className={styles.infoContainer}>
            <section className={styles.infoBlock}>
              <span className={styles.label}>First Name</span>
              <span className={styles.info}>{firstName}</span>
            </section>
            <section className={styles.infoBlock}>
              <span className={styles.label}>Last Name</span>
              <span className={styles.info}>{lastName}</span>
            </section>
            <section className={styles.infoBlock}>
              <span className={styles.label}>Display Name</span>
              <span className={styles.info}>{displayName}</span>
            </section>
            <section className={styles.infoBlock}>
              <span className={styles.label}>Email</span>
              <span className={styles.info}>{email}</span>
            </section>
            <section className={styles.infoBlock}>
              <span className={styles.label}>Role</span>
              <span className={styles.info}>{role}</span>
            </section>
            {role === CONSTANTS.CREATOR && (
              <section className={styles.infoBlock}>
                <span className={styles.label}>Balance</span>
                <span className={styles.info}>{`${balance}$`}</span>
              </section>
            )}
          </section>
        </article>
      )}
      <button
        onClick={() => changeEditMode(!isEdit)}
        className={styles.buttonEdit}
      >
        {isEdit ? "Cancel" : "Edit"}
      </button>
    </section>
  );
};

const mapStateToProps = (state) => {
  const { data } = state.userStore;
  const { isEdit } = state.userProfile;
  return { data, isEdit };
};

const mapDispatchToProps = (dispatch) => ({
  updateUser: (data) => dispatch(updateUserData(data)),
  changeEditMode: (data) => dispatch(changeEditModeOnUserProfile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
