import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { isPathExcluded } from "../../utils/utils";
import styles from "./Footer.module.sass";
import CONSTANTS from "../../constants";

let isRenderFooter = true;

const { MODER, FOOTER_ITEMS, NON_RENDER_ROUTES_FOR } = CONSTANTS;
const { FOOTER: nonRenderRoutes } = NON_RENDER_ROUTES_FOR;

const Footer = (props) => {
  const {
    data,
    location: { pathname },
  } = props;

  const topFooterItemsRender = (item) => (
    <nav key={item.title}>
      <h4>{item.title}</h4>
      {item.items.map((i) => (
        <a key={i} href="https://google.com">
          {i}
        </a>
      ))}
    </nav>
  );

  const topFooterRender = () => {
    return FOOTER_ITEMS.map((item) => topFooterItemsRender(item));
  };

  if (data?.role === MODER || isPathExcluded(pathname, nonRenderRoutes)) {
    return null;
  }

  return (
    <footer className={styles.footerContainer}>
      <section className={styles.footerTop}>
        <section>{topFooterRender()}</section>
      </section>
    </footer>
  );
};

const mapStateToProps = (state) => state.userStore;

function areEqual(prevProps, nextProps) {
  if (isRenderFooter) {
    isRenderFooter = false;
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

export default withRouter(
  connect(mapStateToProps)(React.memo(Footer, areEqual))
);
