import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../hook/useFetchDocument";
import styles from "./OrderDetailsPage.module.scss";

const OrderDetailsPage = () => {
  const [order, setOrder] = useState();
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Детали заказа</h2>
        <div>
          <Link to="/order-history">&larr; Вернутся к заказам</Link>
        </div>
        <br />
        {!order ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>
              <b>ID заказа</b> {order.id}
            </p>
            <p>
              <b>Сумма заказа</b> {order.orderAmount}₽
            </p>
            <p>
              <b>Статус заказа</b> {order.orderStatus}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Товар</th>
                  <th>Цена</th>
                  <th>Количество</th>
                  <th>Стоимость</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cardQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img src={imageURL} alt={name} style={{ width: "100px" }} />
                      </td>
                      <td>{price}₽</td>
                      <td>{cardQuantity}</td>
                      <td>{(price * cardQuantity).toFixed(2)}₽</td>

                      <td className={styles.icons}>
                        <Link to={`/review-product/${id}`}>
                          <button className="--btn --btn-primary">Оставить отзыв</button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default OrderDetailsPage;
