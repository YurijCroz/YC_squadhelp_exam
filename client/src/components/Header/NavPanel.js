import React, { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import { useMediaQuery } from "@material-ui/core";
import navElement from "./navElement.json";
import NavPanelList from "./NavPanelList";
import BurgerMenu from "./BurgerMenu";
import styles from "./Header.module.sass";

function NavPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const matches = useMediaQuery('(min-width: 700px)');

  useEffect(() => {
    setIsOpen(matches);
  }, [matches]);

  return (
    <>
      <BurgerMenu isOpen={isOpen} handleClick={handleClick} />
      <Collapse isOpened={isOpen} theme={{ collapse: styles.collapse }}>
        <nav className={styles.nav}>
          <ul>
            {navElement.map((part) => (
              <NavPanelList key={part.section} part={part} />
            ))}
          </ul>
        </nav>
      </Collapse>
    </>
  );
}

export default NavPanel;
