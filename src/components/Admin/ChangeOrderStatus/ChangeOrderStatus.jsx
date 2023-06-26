import { doc, setDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import Card from "../../Card/Card";
import styles from "./ChangeOrderStatus.module.scss";
const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const editOrder = (e, id) => {
    e.preventDefault();
    setIsLoading(true);

    const orderConfig = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };
    try {
      setDoc(doc(db, "orders", id), orderConfig);

      setIsLoading(false);
      toast.success("Order status changes successfully");
      navigate("/admin/orders");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <h4>Обновление статуса заказа</h4>
          <form onSubmit={(e) => editOrder(e, id)}>
            <span>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="" disabled>
                  -- Выбрать --
                </option>
                <option value="Order Placed...">Заказ размещен...</option>
                <option value="Processing...">В процессе...</option>
                <option value="Shipped...">В доставке...</option>
                <option value="Delivered">Доставлен</option>
              </select>
            </span>
            <span>
              <button type="submit" className="--btn --btn-primary">
                Обновить статус заказа
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ChangeOrderStatus;
