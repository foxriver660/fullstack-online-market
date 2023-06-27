import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./Auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../../components/index";
import registerImg from "../../images/man-hold-registration-clipboard-checklist-man-hold-hand-clipboard-agreement-flat-design-vector-illustration-background-112434342.jpg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const registerUser = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Пароли не совпадают");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        toast.success("Регистрация прошла успешно");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <section className={`container ${classes.auth}`}>
        <Card>
          <div className={classes.form}>
            <h2 className={classes.title}>Регистрация</h2>
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
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
    </>
  );
};

export default RegisterPage;
