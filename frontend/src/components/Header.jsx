import React from "react";
import logo from "../images/svg/logo.svg";
import logo320 from "../images/svg/logo320.svg";

function Header({ children, emailText }) {
  return (
    <header className="header page__header">
      <picture>
        <source media="(min-width: 1280px)" srcSet={logo} />
        <source media="(max-width: 320px)" srcSet={logo320} />
        <img className="header__logo" src={logo} alt="Место" />
      </picture>
      <nav className="header__nav">
        <span className="header__span">{emailText ? emailText : ""}</span>
        {children}
      </nav>
    </header>
  );
}
export default Header;
