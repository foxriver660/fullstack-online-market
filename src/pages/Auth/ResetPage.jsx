import React, { useState } from "react";
import classes from "./Auth.module.scss";
import { Link } from "react-router-dom";
import { Card } from "../../components/index";
import resetImg from "../../images/man-hold-registration-clipboard-checklist-man-hold-hand-clipboard-agreement-flat-design-vector-illustration-background-112434342.jpg";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";

const ResetPage = () => {
  const [email, setEmail] = useState("");

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Ссылка для восстановления пароля направлена на почту!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      <section className={`container ${classes.auth}`}>
        <div className={classes.img}>
          <img src={resetImg} alt="register" width="200px" />
        </div>
        <Card>
          <div className={classes.form}>
            <h2 className={classes.title}>Восстановить пароль</h2>
            <form onSubmit={resetPassword}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button className="--btn --btn-primary --btn-block" type="submit">
                Восстановить
              </button>
            </form>

            <span className={classes.register}>
              Вспомнили пароль?<Link to="/login">Войти</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default ResetPage;
