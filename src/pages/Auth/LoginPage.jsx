import React, { useState } from "react";
import classes from "./Auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Card } from "../../components/index";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/basketSlice";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const url = useSelector(selectPreviousURL);

  // Redirect user
  const redirect = () => {
    if (url.includes("basket")) {
      return navigate("/basket");
    }
    navigate("/");
  };
  // Login
  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success(`Вы вошли!`);
        redirect();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Google Login
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = (e) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        /* const user = result.user; */
        toast.success(`Вы вошли!`);
        redirect();
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
            <h2 className={classes.title}>Войти в личный кабинет</h2>
            <form onSubmit={loginUser}>
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
              <button className="--btn --btn-primary --btn-block" type="submit">
                Войти
              </button>
              <span className={classes.register}>
                Забыли пароль?<Link to="/reset">Восстановить пароль</Link>
              </span>
            </form>
            <button className="--btn --btn-google --btn-block" type="submit" onClick={signInWithGoogle}>
              <FcGoogle /> Login with Google
            </button>
            <span className={classes.register}>
              Отсуствует аккаунт?<Link to="/register"> Регистрация</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default LoginPage;
