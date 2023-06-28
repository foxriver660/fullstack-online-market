import React from "react";
import classes from "./Footer.module.scss";
const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className={classes.footer}>
      <p className={classes.text}>&copy; {year} Safonov Ivan .</p>
    </footer>
  );
};

export default Footer;
