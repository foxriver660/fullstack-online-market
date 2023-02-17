import React from "react";
import classes from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";

const logo = (
  <div className={classes.logo}>
    <Link className={classes.logoLink} to="/">
      <h2 className={classes.logoTitle}>
        e <span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={classes.cart}>
    <Link className={classes.cartLink} to="/cart">
      Корзина <BsCart4 size={20} />
      <p>0</p>
    </Link>
  </span>
);
const activeLink = ({ isActive }) =>
  isActive ? classes.active : classes.navLink;
const Header = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };
  return (
    <header className={classes.header}>
      <div className={classes.mainWrapper}>
        {logo}
        <nav
          className={`${classes.nav} ${
            showMenu ? classes.showNav : classes.hideNav
          }`}
        >
          <div
            className={
              showMenu
                ? `${classes.navWrapper} ${classes.showNavWrapper}`
                : classes.navWrapper
            }
            onClick={hideMenu}
          ></div>
          <ul onClick={hideMenu} className={classes.navList}>
            <li className={`${classes.navItem} ${classes.logoMobile}`}>
              {logo} <VscChromeClose onClick={hideMenu} size={30} />
            </li>
            <li className={classes.navItem}>
              <NavLink className={activeLink} to="/">
                Главная страница
              </NavLink>
            </li>

            <li className={classes.navItem}>
              <NavLink className={activeLink} to="/contact">
                Контакты
              </NavLink>
            </li>
          </ul>
          <div className={classes.rigthNavBar} onClick={hideMenu}>
            <span className={classes.links}>
              <NavLink className={activeLink} to="/login">
                Войти
              </NavLink>
              <NavLink className={activeLink} to="/register">
                Регистрация
              </NavLink>
              <NavLink className={activeLink} to="/order-history">
                Мои заказы
              </NavLink>
            </span>
            {cart}
          </div>
        </nav>
        <div className={classes.menuIcon}>
          {cart}
          <GiHamburgerMenu size={26} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
