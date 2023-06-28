import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { FaUserCircle } from "react-icons/fa";
import Basket from "../Basket/Basket";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux/es/exports";
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from "../../redux/slice/authSlice";
import { ShowOnLogin, ShowOnLogOut } from "../HiddenLinks/HiddenLinks";
import { AdminOnlyLink } from "../AdminOnlyRoute/AdminOnlyRoute";

const logo = (
  <div className={styles.logo}>
    <Link className={styles.logoLink} to="/">
      <h2 className={styles.logoTitle}>
        Online<span>Market</span>.
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? styles.active : styles.navLink);

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  /* 
  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, []); */

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          const uName = user.email.split("@")[0];
          setUserName(uName);
        } else {
          setUserName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : userName,
            userId: user.uid,
          })
        );
      } else {
        setUserName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, userName]);

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
    <header className={styles.header}>
      <div className={styles.mainWrapper}>
        {logo}
        <nav className={`${styles.nav} ${showMenu ? styles.showNav : styles.hideNav}`}>
          <div
            className={showMenu ? `${styles.navWrapper} ${styles.showNavWrapper}` : styles.navWrapper}
            onClick={hideMenu}
          ></div>
          <ul onClick={hideMenu} className={styles.navList}>
            <li className={`${styles.navItem} ${styles.logoMobile}`}>
              {logo} <VscChromeClose onClick={hideMenu} size={30} />
            </li>
            <li>
              <AdminOnlyLink>
                <Link to="/admin" className="--btn --btn-admin">
                  admin
                </Link>
              </AdminOnlyLink>
            </li>
            <li className={styles.navItem}>
              <NavLink className={activeLink} to="/">
                Главная страница
              </NavLink>
            </li>

            <li className={styles.navItem}>
              <NavLink className={activeLink} to="/contact">
                Контакты
              </NavLink>
            </li>
          </ul>
          <div className={styles.rigthNavBar} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogOut>
                <NavLink className={activeLink} to="/login">
                  Войти
                </NavLink>
                <NavLink className={activeLink} to="/register">
                  Регистрация
                </NavLink>
              </ShowOnLogOut>

              <ShowOnLogin>
                <a href="#">
                  <FaUserCircle size={16} />
                  Привет, {userName}
                </a>
                <NavLink className={activeLink} to="/order-history">
                  Мои заказы
                </NavLink>

                <NavLink to="/" onClick={logoutUser}>
                  Выйти
                </NavLink>
              </ShowOnLogin>
            </span>
            <Basket />
          </div>
        </nav>
        <div className={styles.menuIcon}>
          <Basket />
          <GiHamburgerMenu size={30} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
