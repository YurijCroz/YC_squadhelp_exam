import React from "react";
import "./BurgerMenu.scss";

const BurgerMenu = ({ isOpen, handleClick }) => {
  return (
    <>
      <div className={`burger ${isOpen ? "open" : ""}`} onClick={handleClick}>
        <div className="burger__line"></div>
        <div className="burger__line"></div>
        <div className="burger__line"></div>
      </div>
    </>
  );
};

export default BurgerMenu;
