import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter, useHistory, useLocation } from "react-router-dom";
import classnames from "classnames";
import styles from "./Header.module.sass";
import CONSTANTS from "../../constants";
import { clearUserStore, headerRequest } from "../../actions/actionCreator";
import Logo from "../Logo";
import EventController from "../Event/EventController/EventController";
import navElement from "./navElement.json";

let isTest = true;
const testLink = ["/login", "/registration", "/payment"];
const testIncludes = (pathname) => testLink.includes(pathname);

function Header(props) {
  console.log("RERENDER");
  console.log(props);
  useEffect(() => {
    if (!props.data) {
      props.getUser();
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem(CONSTANTS.ACCESS_TOKEN);
    localStorage.removeItem(CONSTANTS.REFRESH_TOKEN);
    props.clearUserStore();
    props.history.replace("/login");
  };

  const startContests = () => {
    props.history.push("/startContest");
  };

  const renderNavPanel = () => {
    return (
      <nav className={styles.nav}>
        <ul>
          {navElement.map((part) => (
            <li key={part.section}>
              <span>{part.section}</span>
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                alt="menu"
              />
              <ul>
                {part.links.map((li, i) => (
                  <li
                    className={classnames({
                      [styles.last]: i === part.links.length - 1,
                    })}
                    key={li.name}
                  >
                    {li.link ? (
                      <Link to={li.link}>{li.name}</Link>
                    ) : (
                      <a href="http://www.google.com">{li.name}</a>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  const renderLoginButtons = () => {
    if (props.data) {
      return (
        <>
          {props.data?.role === CONSTANTS.CUSTOMER && <EventController />}
          <section className={styles.userInfo}>
            <img
              src={`${CONSTANTS.PUBLIC_URL}images_avatar/${props.data.avatar}`}
              alt="user"
            />
            <span>{`Hi, ${props.data.displayName}`}</span>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
              alt="menu"
            />
            <ul>
              <li>
                <Link to="/dashboard">
                  <span>View Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/account">
                  <span>My Account</span>
                </Link>
              </li>
              {props.data?.role === CONSTANTS.CUSTOMER && (
                <li>
                  <Link to="/events">
                    <span>Events</span>
                  </Link>
                </li>
              )}
              <li>
                <Link to="http:/www.google.com">
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link to="http:/www.google.com">
                  <span>Affiliate Dashboard</span>
                </Link>
              </li>
              <li>
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
  };

  if (props.isFetching) {
    return null;
  }

  if (testIncludes(props.location.pathname)) {
    // isTest = true;
    return null;
  }

  return (
    <header className={styles.headerContainer}>
      <section className={styles.fixedHeader}>
        <span className={styles.info}>
          Squadhelp recognized as one of the Most Innovative Companies by Inc
          Magazine.
        </span>
        <a href="http://www.google.com">Read Announcement</a>
      </section>
      <section className={styles.loginSignnUpHeaders}>
        <section className={styles.numberContainer}>
          <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`} alt="phone" />
          <a href={`tel:${CONSTANTS.CONTACTS.TEL}`}>{CONSTANTS.CONTACTS.TEL}</a>
        </section>
        <section className={styles.userButtonsContainer}>
          {renderLoginButtons()}
        </section>
      </section>
      {props.data?.role === CONSTANTS.MODER ? null : (
        <section className={styles.navContainer}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <article className={styles.leftNav}>
            {renderNavPanel()}
            {props.data?.role === CONSTANTS.CUSTOMER && (
              <section
                className={styles.startContestBtn}
                onClick={startContests}
              >
                Start Contest
              </section>
            )}
          </article>
        </section>
      )}
    </header>
  );
}

function areEqual(prevProps, nextProps) {
  const prevPathname = prevProps.location.pathname;
  const nextPathname = nextProps.location.pathname;
  // console.log(!testIncludes(nextPathname));
  // console.log(nextProps);
  // if (isTest) {
  //   isTest = false;
  //   return false;
  // }
  // Проверяем, соответствует ли пропс условию
  // return !testIncludes(nextPathname);
  return false;
  // return prevProps.someProp === nextProps.someProp;
}

const mapStateToProps = (state) => state.userStore;
const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(headerRequest()),
  clearUserStore: () => dispatch(clearUserStore()),
});

// export default connect(mapStateToProps, mapDispatchToProps)(Header);

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(React.memo(Header, areEqual))
// );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
