import React, { useEffect } from "react";
import classes from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import {FaUserCircle} from "react-icons/fa";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
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
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState("");

  /* const [user, setUser] = React.useState(null); */
  /*   React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);
      navigate("/");
    });
  }; */
  const [showMenu, setShowMenu] = React.useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user.displayName);
        setUserName(user.displayName);
      } else {
        setUserName("");
      }
    });
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Вы успешно вышли из системы");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
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
              <a href="#">
                <FaUserCircle size={16}/>
                Привет, {userName}

              </a>
              <NavLink className={activeLink} to="/register">
                Регистрация
              </NavLink>
              <NavLink className={activeLink} to="/order-history">
                Мои заказы
              </NavLink>
              <NavLink to="/" onClick={logoutUser}>
                Выйти
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
