import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import styles from "./Header.module.sass";
import CONSTANTS from "../../constants";
import { clearUserStore, headerRequest } from "../../actions/actionCreator";
import Logo from "../Logo";
import EventVerification from "../Event/EventVerification/EventVerification";

function Header(props) {
  useEffect(() => {
    if (!props.data) {
      props.getUser();
    }
  },[]);

  const logOut = () => {
    localStorage.removeItem(CONSTANTS.ACCESS_TOKEN);
    localStorage.removeItem(CONSTANTS.REFRESH_TOKEN);
    props.clearUserStore();
    props.history.replace("/login");
  };

  const startContests = () => {
    props.history.push("/startContest");
  };

  const renderLoginButtons = () => {
    if (props.data) {
      return (
        <>
          <EventVerification />
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
            <nav className={styles.nav}>
              <ul>
                <li>
                  <span>Name Ideas</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul>
                    <li>
                      <a href="http://www.google.com">Beauty</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Consulting</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">E-Commerce</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Fashion & Clothing</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Finance</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Real Estate</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Tech</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">More Categories</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Contests</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul>
                    <li>
                      <Link to="/how-it-works">How It Works</Link>
                    </li>
                    <li>
                      <a href="http://www.google.com">Pricing</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Agency Service</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Active Contests</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Winners</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Leader Board</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">Become A Creative</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Our Work</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul>
                    <li>
                      <a href="http://www.google.com">Names</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Taglines</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Logos</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">Testimonials</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Names For Sale</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul>
                    <li>
                      <a href="http://www.google.com">Popular Names</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Short Names</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Intriguing Names</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Names By Category</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Visual Names Search</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">Sell Your Domains</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Blog</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul>
                    <li>
                      <a href="http://www.google.com">Ultimate Naming Guide</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">
                        Poetic Devices In Business Naming
                      </a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Crowded Bar Theory</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">All Articles</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
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

const mapStateToProps = (state) => state.userStore;
const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(headerRequest()),
  clearUserStore: () => dispatch(clearUserStore()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
