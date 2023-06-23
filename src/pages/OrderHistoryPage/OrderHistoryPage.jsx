import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../hook/useFetchCollection";
import { selectUserId } from "../../redux/slice/authSlice";
import { selectOrderHistory, STORE_ORDERS } from "../../redux/slice/orderSlice";
import styles from "./OrderHistoryPage.module.scss";
import { useNavigate } from "react-router-dom";

const OrderHistoryPage = () => {
  const { data, isLoading } = useFetchCollection("orders");

  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  const filteredOrders = orders.filter((order) => order.userID === userID);

  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2>Ваша история заказов</h2>
        <p>Откройте заказ, чтобы оставить отзыв о товаре</p>
        <br />
        <>
          <div className={styles.table}>
            {filteredOrders.length === 0 ? (
              <p>Заказы не найдены</p>
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
                  {filteredOrders.map((order, index) => {
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
    </section>
  );
};

export default OrderHistoryPage;
