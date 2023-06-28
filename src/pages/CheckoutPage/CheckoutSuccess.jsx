import React from "react";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <section>
      <div className="container">
        <h2>Оплата успешно прошла</h2>
        <br />

        <Link to="/order-history" className="--btn --btn-primary">
          Проверить статус заказа
        </Link>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
