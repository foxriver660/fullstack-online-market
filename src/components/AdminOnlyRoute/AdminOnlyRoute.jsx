import React from "react";
import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/slice/authSlice";
import "./AdminOnlyRoute.scss";
import { Link } from "react-router-dom";
const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === import.meta.env.VITE_ADMIN_USER || userEmail === import.meta.env.VITE_ADMIN_USER2) {
    return children;
  } else {
    return (
      <section className="section">
        <h1 className="title">У Вас нет прав для входа на эту страницу</h1>
        <Link to="/" className="--btn">
          &larr; Вернутся на главную страницу
        </Link>
      </section>
    );
  }
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === import.meta.env.VITE_ADMIN_USER || userEmail === import.meta.env.VITE_ADMIN_USER2) {
    return children;
  } else {
    return null;
  }
};

export default AdminOnlyRoute;
