import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import styles from "./Header.module.sass";
import CONSTANTS from "../../constants";
import {
  getUserAction,
  clearUserStore,
  headerRequest,
} from "../../actions/actionCreator";
import Logo from "../Logo";

class Header extends React.Component {
  componentDidMount() {
    if (!this.props.data) {
      this.props.getUser();
    }
  }

  logOut = () => {
    localStorage.removeItem(CONSTANTS.ACCESS_TOKEN);
    this.props.clearUserStore();
    this.props.history.replace("/login");
  };

  startContests = () => {
    this.props.history.push("/startContest");
  };

  renderLoginButtons = () => {
    if (this.props.data) {
      return (
        <>
          <section className={styles.userInfo}>
            <img
              src={
                this.props.data.avatar === "anon.png"
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicURL}${this.props.data.avatar}`
              }
              alt="user"
            />
            <span>{`Hi, ${this.props.data.displayName}`}</span>
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
              {this.props.data && this.props.data.role !== CONSTANTS.CREATOR && 
                (<li>
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
                <span onClick={this.logOut}>Logout</span>
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
        <Link to="/login" >
          <span className={styles.btn}>LOGIN</span>
        </Link>
        <Link to="/registration" >
          <span className={styles.btn}>SIGN UP</span>
        </Link>
      </>
    );
  };

  render() {
    if (this.props.isFetching) {
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
            <a href={`tel:${CONSTANTS.CONTACTS.TEL}`}>
              {CONSTANTS.CONTACTS.TEL}
            </a>
          </section>
          <section className={styles.userButtonsContainer}>
            {this.renderLoginButtons()}
          </section>
        </section>
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
                      <Link to="/how-it-works" >How It Works</Link>
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
            {this.props.data && this.props.data.role !== CONSTANTS.CREATOR && (
              <section
                className={styles.startContestBtn}
                onClick={this.startContests}
              >
                Start Contest
              </section>
            )}
          </article>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (state) => state.userStore;
const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(headerRequest()),
  clearUserStore: () => dispatch(clearUserStore()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
