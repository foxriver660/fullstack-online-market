import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  ADD_TO_BASKET,
  DECREASE_BASKET,
  REMOVE_FROM_BASKET,
  CLEAR_BASKET,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  SAVE_URL,
  selectBasketItems,
  selectBasketTotalAmount,
  selectBasketTotalQuantity,
} from "../../redux/slice/basketSlice";
import { FaTrashAlt } from "react-icons/fa";
import Card from "../../components/card/Card";
import styles from "./BasketPage.module.scss";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";

const BasketPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const basketItems = useSelector(selectBasketItems);
  const basketTotalAmount = useSelector(selectBasketTotalAmount);
  const basketTotalQuantity = useSelector(selectBasketTotalQuantity);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const increaseItem = (item) => {
    dispatch(ADD_TO_BASKET(item));
  };

  const decreaseItem = (item) => {
    dispatch(DECREASE_BASKET(item));
  };

  const removeFromBasket = (item) => {
    dispatch(REMOVE_FROM_BASKET(item));
  };

  const clearBasket = () => {
    dispatch(CLEAR_BASKET());
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(""));
  }, [basketItems, dispatch]);

  const url = window.location.href;

  const checkout = () => {
    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      dispatch(SAVE_URL(url));
      navigate("/login");
    }
  };

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Корзина</h2>
        {basketItems.length === 0 ? (
          <>
            <p>Ваша корзина пуста</p>
            <br />
            <div>
              <Link to="/#products">&larr; Продолжить покупки</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Товар</th>
                  <th>Цена</th>
                  <th>Количество</th>
                  <th>Всего</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {basketItems.map((item, index) => {
                  const { id, name, price, imageURL, basketQuantity } = item;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img src={imageURL} alt={name} style={{ width: "100px" }} />
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button className="--btn" onClick={() => decreaseItem(item)}>
                            -
                          </button>
                          <p>
                            <b>{basketQuantity}</b>
                          </p>
                          <button className="--btn" onClick={() => increaseItem(item)}>
                            +
                          </button>
                        </div>
                      </td>
                      <td>{(price * basketQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt size={19} color="red" onClick={() => removeFromBasket(item)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button className="--btn --btn-primary" onClick={clearBasket}>
                Очистить корзину
              </button>
              <div className={styles.checkout}>
                <div>
                  <Link to="/#products">&larr; Продолжить покупки</Link>
                </div>
                <br />
                <Card cardClass={styles.card}>
                  <p>
                    <b> {`Товаров в корзине: ${basketTotalQuantity}`}</b>
                  </p>
                  <div className={styles.text}>
                    <h4>Всего на:</h4>
                    <h3>{`${basketTotalAmount.toFixed(2)}₽`}</h3>
                  </div>
                  <button className="--btn --btn-submit --btn-block" onClick={checkout}>
                    Купить
                  </button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
export default BasketPage;
