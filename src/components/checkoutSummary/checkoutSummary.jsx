import React from "react";
import { useSelector } from "react-redux";
import styles from "./checkoutSummary.module.scss";
import { selectBasketItems, selectBasketTotalAmount, selectBasketTotalQuantity } from "../../redux/slice/basketSlice";
import Card from "../Card/Card";
import { Link } from "react-router-dom";

const CheckoutSummary = () => {
  const basketItems = useSelector(selectBasketItems);
  const basketTotalAmount = useSelector(selectBasketTotalAmount);
  const basketTotalQuantity = useSelector(selectBasketTotalQuantity);

  return (
    <div>
      <h3>Сумма заказа</h3>
      <div>
        {basketItems.lenght === 0 ? (
          <>
            <p>Товары отсуствуют в корзине</p>
            <button className="--btn">
              <Link to="/#products">Вернуться к покупкам</Link>
            </button>
          </>
        ) : (
          <div>
            <p>
              <b>{`Товаров в корзине: ${basketTotalQuantity}`}</b>
            </p>
            <div className={styles.text}>
              <h4>Всего:</h4>
              <h3>{basketTotalAmount.toFixed(2)}₽</h3>
            </div>
            {basketItems.map((item) => {
              const { id, name, price, basketQuantity } = item;
              return (
                <Card key={id} basketClass={styles.basket}>
                  <h4>Товар: {name}</h4>
                  <p>Количество: {basketQuantity}</p>
                  <p>Стоимость: {price}₽</p>
                  <p>Общая стоимость: {price * basketQuantity}₽</p>
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
