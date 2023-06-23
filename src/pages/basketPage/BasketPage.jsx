import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  ADD_TO_CARD,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CARD,
  DECREASE_CARD,
  REMOVE_FROM_CARD,
  SAVE_URL,
  selectCardItems,
  selectCardTotalAmount,
  selectCardTotalQuantity,
} from "../../redux/slice/cardSlice";
import { FaTrashAlt } from "react-icons/fa";
import Card from "../../components/card/Card";
import styles from "./BasketPage.module.scss";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";

const BasketPage = () => {
  const cartItems = useSelector(selectCardItems);
  const cartTotalAmount = useSelector(selectCardTotalAmount);
  const cartTotalQuantity = useSelector(selectCardTotalQuantity);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const navigate = useNavigate();

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CARD(cart));
  };

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CARD(cart));
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CARD(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CARD());
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(""));
  }, [cartItems, dispatch]);

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
        <h2>Shopping Basket</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your basket is currently empty.</p>
            <br />
            <div>
              <Link to="/#products">&larr; Continue shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
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
                          <button className="--btn" onClick={() => decreaseCart(cart)}>
                            -
                          </button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button className="--btn" onClick={() => increaseCart(cart)}>
                            +
                          </button>
                        </div>
                      </td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt size={19} color="red" onClick={() => removeFromCart(cart)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button className="--btn --btn-danger" onClick={clearCart}>
                Clear basket
              </button>
              <div className={styles.checkout}>
                <div>
                  <Link to="/#products">&larr; Continue shopping</Link>
                </div>
                <br />
                <Card cardClass={styles.card}>
                  <p>
                    <b> {`Basket item(s): ${cartTotalQuantity}`}</b>
                  </p>
                  <div className={styles.text}>
                    <h4>Subtotal:</h4>
                    <h3>{`${cartTotalAmount.toFixed(2)}₽`}</h3>
                  </div>
                  <p>Tax an shipping calculated at checkout</p>
                  <button className="--btn --btn-primary --btn-block" onClick={checkout}>
                    Checkout
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
