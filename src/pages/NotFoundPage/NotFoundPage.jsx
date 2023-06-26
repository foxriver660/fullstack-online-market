import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  return (
    <div className={styles["not-found"]}>
      <div>
        <h2>Ошибка 404</h2>
        <p>Запрашиваемая страница не найдена</p>
        <button className="--btn">
          <Link to="/">&larr; Вернуться на главшую страницу</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
