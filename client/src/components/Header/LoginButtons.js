import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import styles from "./Header.module.sass";
import CONSTANTS from "../../constants";
import EventController from "../Event/EventController/EventController";
import { useNavigationDrawer } from "../../hook/";

function LoginButtons({ data, logOut }) {
  const [isMenuOpen, setIsMenuOpen, closeMenu] = useNavigationDrawer(false);

  if (data) {
    return (
      <>
        {data?.role === CONSTANTS.CUSTOMER && <EventController />}
        <section
          className={styles.userInfo}
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
          onTouchStart={() => setIsMenuOpen(true)}
        >
          <img
            src={`${CONSTANTS.PUBLIC_URL}images_avatar/${data.avatar}`}
            alt="user"
          />
          <span>{`Hi, ${data.displayName}`}</span>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
            alt="menu"
          />
          <ul
            className={classnames({
              [styles.menu]: isMenuOpen,
            })}
          >
            <li onClick={() => closeMenu(false)}>
              <Link to="/dashboard">
                <span>View Dashboard</span>
              </Link>
            </li>
            <li onClick={() => closeMenu(false)}>
              <Link to="/account">
                <span>My Account</span>
              </Link>
            </li>
            {data?.role === CONSTANTS.CUSTOMER && (
              <li onClick={() => closeMenu(false)}>
                <Link to="/events">
                  <span>Events</span>
                </Link>
              </li>
            )}
            <li onClick={() => closeMenu(false)}>
              <Link to="http:/www.google.com">
                <span>Messages</span>
              </Link>
            </li>
            <li onClick={() => closeMenu(false)}>
              <Link to="http:/www.google.com">
                <span>Affiliate Dashboard</span>
              </Link>
            </li>
            <li onClick={() => closeMenu(false)}>
              <span onClick={logOut}>Logout</span>
            </li>
          </ul>
        </section>
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
          className={styles.emailIcon}
          alt="email"
        />
      </>
    );
  }
  return (
    <>
      <Link to="/login">
        <span className={styles.btn}>LOGIN</span>
      </Link>
      <Link to="/registration">
        <span className={styles.btn}>SIGN UP</span>
      </Link>
    </>
  );
}

export default LoginButtons;
