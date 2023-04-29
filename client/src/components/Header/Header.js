import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styles from "./Header.module.sass";
import CONSTANTS from "../../constants";
import { clearUserStore, headerRequest } from "../../actions/actionCreator";
import { isPathExcluded } from "../../utils/utils";
import Logo from "../Logo";
import LoginButtons from "./LoginButtons";
import NavPanel from "./NavPanel";

let isRenderHeader = true;

const { HEADER: nonRenderRoutes } = CONSTANTS.NON_RENDER_ROUTES_FOR;

function Header(props) {
  const { getUser, location, clearUserStore, history, data, isFetching } =
    props;

  useEffect(() => {
    if (!data) {
      getUser();
    }
  }, [location.pathname]);

  const logOut = () => {
    localStorage.clear();
    clearUserStore();
    history.replace("/login");
  };

  const startContests = () => {
    history.push("/startContest");
  };

  if (isFetching || isPathExcluded(location.pathname, nonRenderRoutes)) {
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
          <LoginButtons data={data} logOut={logOut} />
        </section>
      </section>
      {data?.role === CONSTANTS.MODER ? null : (
        <section className={styles.navContainer}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <article className={styles.leftNav}>
            <NavPanel />
            {data?.role === CONSTANTS.CUSTOMER && (
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
  if (isRenderHeader) {
    isRenderHeader = false;
    return false;
  } else if (prevProps.data !== nextProps.data) {
    return false;
  }

  const { pathname: prevPathname } = prevProps.location;
  const { pathname: nextPathname } = nextProps.location;

  return (
    isPathExcluded(nextPathname, nonRenderRoutes) ===
    isPathExcluded(prevPathname, nonRenderRoutes)
  );
}

const mapStateToProps = (state) => {
  return { ...state.userStore };
};

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(headerRequest()),
  clearUserStore: () => dispatch(clearUserStore()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(React.memo(Header, areEqual))
);
