import React from "react";
import classes from "./Auth.module.scss";
import { Link } from "react-router-dom";
import { Card } from "../../components/index";
import registerImg from "../../images/man-hold-registration-clipboard-checklist-man-hold-hand-clipboard-agreement-flat-design-vector-illustration-background-112434342.jpg";

const RegisterPage = () => {
  return (
    <section className={`container ${classes.auth}`}>
      <Card>
        <div className={classes.form}>
          <h2 className={classes.title}>Регистрация</h2>
          <form>
            <input type="text" placeholder="Name" required />
            <input type="text" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
            <button className="--btn --btn-primary --btn-block" type="submit">
              Зарегистрироваться
            </button>
          </form>

          <span className={classes.register}>
            Уже есть аккаунт?<Link to="/login"> Войти</Link>
          </span>
        </div>
      </Card>
      <div className={classes.img}>
        <img src={registerImg} alt="register" width="200px" />
      </div>
    </section>
  );
};

export default RegisterPage;
