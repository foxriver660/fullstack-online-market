import React from "react";
import classes from "./Auth.module.scss";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {Card} from '../../components/index'
import loginImg from "../../images/kisspng-offer-and-acceptance-contract-of-sale-proposal-zak-inventory-management-software-5b1e5574946513.3219275815287146126079.jpg";
const LoginPage = () => {
  return (
    <section className={`container ${classes.auth}`}>
      <div className={classes.img}>
        <img src={loginImg} alt="login" width="200px" />
      </div>
      <Card>
      <div className={classes.form}>
       <h2 className={classes.title}>Войти в личный кабинет</h2>
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
      </Card>
    </section>
  );
};

export default LoginPage;