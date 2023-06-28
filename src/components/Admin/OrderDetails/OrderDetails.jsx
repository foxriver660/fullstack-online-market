import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../../hook/useFetchDocument";
import { Loader } from "../../index";
import ChangeOrderStatus from "../ChangeOrderStatus/ChangeOrderStatus";
import styles from "./OrderDetails.module.scss";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <>
      <div className={styles.table}>
        <h2>Детали заказа</h2>
        <div>
          <Link to="/admin/orders">&larr; Назад к заказам</Link>
        </div>
        <br />
        {!order ? (
          <Loader />
        ) : (
          <>
            <p>
              <b>ID заказа</b> {order.id}
            </p>
            <p>
              <b>Сумма заказа</b> ${order.orderAmount}
            </p>
            <p>
              <b>Статус заказа</b> {order.orderStatus}
            </p>
            <p>
              <b>Адрес доставки</b>
              <br />
              Адрес: {order.shippingAddress.line1},{order.shippingAddress.line2}, {order.shippingAddress.city}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Товар</th>
                  <th>Стоимость</th>
                  <th>Количество</th>
                  <th>Всего</th>
                </tr>
              </thead>
              <tbody>
                {order.basketItems.map((cart, index) => {
                  const { id, name, price, imageURL, basketQuantity } = cart;
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
                      <td>{basketQuantity}</td>
                      <td>{(price * basketQuantity).toFixed(2)}₽</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
        <ChangeOrderStatus order={order} id={id} />
      </div>
    </>
  );
};

export default OrderDetails;
