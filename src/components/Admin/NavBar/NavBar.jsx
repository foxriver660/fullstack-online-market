import React from "react";
import classes from "./NavBar.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectUserName } from "../../../redux/slice/authSlice";
import { NavLink } from "react-router-dom";

const activeLink = ({ isActive }) => (isActive ? classes.active : classes.navLink);
const NavBar = () => {
  const userName = useSelector(selectUserName);

  return (
    <div className={classes.navbar}>
      <div className={classes.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4 className={classes.userName}>{userName}</h4>
      </div>
      <nav className={classes.nav}>
        <ul className={classes.navList}>
          <li className={classes.navItem}>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink to="/admin/viewproducts" className={activeLink}>
              View products
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink to="/admin/addproducts/ADD" className={activeLink}>
              Add products
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
