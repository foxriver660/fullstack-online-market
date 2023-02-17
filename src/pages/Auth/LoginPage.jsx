import React from "react";
import classes from "./Auth.module.scss";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import loginImg from "../../images/man-hold-registration-clipboard-checklist-man-hold-hand-clipboard-agreement-flat-design-vector-illustration-background-112434342.jpg";
const LoginPage = () => {
  return (
    <section className={`container ${classes.auth}`}>
      <div className={classes.img}>
        <img src={loginImg} alt="login" width="200px" />
      </div>
      <div className={classes.form}>
       
        <form>
          <input type="text" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button className="--btn --btn-primary --btn-block" type="submit">
            Войти
          </button>
          <div className={classes.links}>
            <Link to="/reset">Восстановить пароль</Link>
          </div>
        </form>
        <button className="--btn --btn-google --btn-block" type="submit">
          <FcGoogle /> Login with Google
        </button>
        <span className={classes.register}>
          Отсуствует аккаунт?<Link to="/register"> Регистрация</Link>

        </span>
        
      </div>
    </section>
  );
};

export default LoginPage;
