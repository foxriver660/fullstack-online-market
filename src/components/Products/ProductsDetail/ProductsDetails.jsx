import React, { useEffect, useState } from "react";
import styles from "./ProductsDetails.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CARD, CALCULATE_TOTAL_QUANTITY, DECREASE_CARD, selectCardItems } from "../../../redux/slice/cardSlice";
import useFetchDocument from "../../../hook/useFetchDocument";
import useFetchCollection from "../../../hook/useFetchCollection";
import Card from "../../Card/Card";
import StarsRating from "react-star-rate";

const ProductsDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const basketItems = useSelector(selectCardItems);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const card = basketItems.find((card) => card.id === id);
  const isBasketAdded = basketItems.findIndex((card) => {
    return card.id === id;
  });

  const { document } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");

  const filteredReviews = data.filter((review) => review.productID === id);

  console.log(data);
  const addToBasket = (product) => {
    dispatch(ADD_TO_CARD(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
  const decreaseBasket = (product) => {
    dispatch(DECREASE_CARD(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
  useEffect(() => {
    setProduct(document);
  }, [document]);

  const goBack = () => {
    navigate("/#product");
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Описание товара</h2>
        <div onClick={goBack}>&larr; Вернуться назад</div>
        {product && (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{product.price} &#8381;</p>
                <p>{product.desc}</p>
                <p>
                  <b>Индентификатор:</b> {product.id}
                </p>
                <p>
                  <b>Брэнд:</b> {product.brand}
                </p>
                <div className={styles.count}>
                  {isBasketAdded < 0 ? null : (
                    <>
                      <button className="--btn" onClick={() => decreaseBasket(product)}>
                        -
                      </button>
                      <p>
                        <b>{card.cardQuantity}</b>
                      </p>
                      <button className="--btn" onClick={() => addToBasket(product)}>
                        +
                      </button>
                    </>
                  )}
                </div>
                <button onClick={() => addToBasket(product)} className="--btn --btn-danger">
                  Добавить в корзину
                </button>
              </div>
            </div>
          </>
        )}
        <Card cardClass={styles.card}>
          <h3>Product Reviews</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>There are no reviews for this product yet.</p>
            ) : (
              <>
                {filteredReviews.map((item, index) => {
                  const { rate, review, reviewDate, userName } = item;
                  return (
                    <div key={index} className={styles.review}>
                      <StarsRating value={rate} />
                      <p>{review}</p>
                      <span>
                        <b>{reviewDate}</b>
                      </span>
                      <br />
                      <span>
                        <b>by: {userName}</b>
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProductsDetails;
