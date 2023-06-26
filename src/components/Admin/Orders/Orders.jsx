import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetchCollection from "../../../hook/useFetchCollection";
import { selectOrderHistory, STORE_ORDERS } from "../../../redux/slice/orderSlice";
import styles from "./Orders.module.scss";

const Orders = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector(selectOrderHistory);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const handleClick = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  return (
    <>
      <div className={styles.order}>
        <h2>История заказов</h2>
        <p>
          Отрыть заказ <b>для изменения статуса заказа</b>
        </p>
        <br />
        <>
          <div className={styles.table}>
            {orders.length === 0 ? (
              <p>Заказы отсуствуют</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Дата</th>
                    <th>ID заказа</th>
                    <th>Сумма заказа</th>
                    <th>Статус заказа</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    const { id, orderDate, orderTime, orderAmount, orderStatus } = order;
                    return (
                      <tr key={id} onClick={() => handleClick(id)}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} at {orderTime}
                        </td>
                        <td>{id}</td>
                        <td>
                          {"$"}
                          {orderAmount}
                        </td>
                        <td>
                          <p className={orderStatus !== "Delivered" ? `${styles.pending}` : `${styles.delivered}`}>
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default Orders;
