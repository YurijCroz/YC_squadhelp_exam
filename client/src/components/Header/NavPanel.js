import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import styles from "./Header.module.sass";
import CONSTANTS from "../../constants";
import { useNavigationDrawer } from "../../hook/";

function NavPanel({ part: { section, links } }) {
  const [isMenuOpen, setIsMenuOpen, closeMenu] = useNavigationDrawer(false);

  return (
    <li
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
      onTouchStart={() => setIsMenuOpen(true)}
    >
      <span>{section}</span>
      <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
      <ul
        className={classnames({
          [styles.openLinks]: isMenuOpen,
        })}
      >
        {links.map((li, i) => (
          <li
            onClick={() => closeMenu(false)}
            className={classnames({
              [styles.last]: i === links.length - 1,
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
  );
}

export default NavPanel;
