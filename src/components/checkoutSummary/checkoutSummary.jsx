import React from "react";
import { useSelector } from "react-redux";
import styles from "./checkoutSummary.module.scss";
import { selectCardItems, selectCardTotalAmount, selectCardTotalQuantity } from "../../redux/slice/cardSlice";
import Card from "../Card/Card";
import { Link } from "react-router-dom";

const CheckoutSummary = () => {
  const cardItems = useSelector(selectCardItems);
  const cardTotalAmount = useSelector(selectCardTotalAmount);
  const cardTotalQuantity = useSelector(selectCardTotalQuantity);

  return (
    <div>
      <h3>Сумма заказа</h3>
      <div>
        {cardItems.lenght === 0 ? (
          <>
            <p>Товары отсуствуют в корзине</p>
            <button className="--btn">
              <Link to="/#products">Вернуться к покупкам</Link>
            </button>
          </>
        ) : (
          <div>
            <p>
              <b>{`Cart item(s): ${cardTotalQuantity}`}</b>
            </p>
            <div className={styles.text}>
              <h4>Всего:</h4>
              <h3>{cardTotalAmount.toFixed(2)}₽</h3>
            </div>
            {cardItems.map((item, index) => {
              const { id, name, price, cardQuantity } = item;
              return (
                <Card key={id} cardClass={styles.card}>
                  <h4>Товар: {name}</h4>
                  <p>Количество: {cardQuantity}</p>
                  <p>Стоимость: {price}₽</p>
                  <p>Общая стоимость: {price * cardQuantity}₽</p>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
