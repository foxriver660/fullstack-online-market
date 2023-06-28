import React, { useEffect, useState } from "react";
import StarsRating from "react-star-rate";
import styles from "./ProductsDetails.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_BASKET,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_BASKET,
  selectBasketItems,
} from "../../../redux/slice/basketSlice";
import useFetchDocument from "../../../hook/useFetchDocument";
import useFetchCollection from "../../../hook/useFetchCollection";
import { Card, Loader } from "../../index";

const ProductsDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const basketItems = useSelector(selectBasketItems);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const basket = basketItems.find((card) => card.id === id);
  const isBasketAdded = basketItems.findIndex((card) => {
    return card.id === id;
  });

  const { document } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");

  const filteredReviews = data.filter((review) => review.productID === id);

  const addToBasket = (product) => {
    dispatch(ADD_TO_BASKET(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
  const decreaseBasket = (product) => {
    dispatch(DECREASE_BASKET(product));
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
        <div onClick={goBack} className={styles.goBack}>
          &larr; Вернуться назад
        </div>
        {!product ? (
          <Loader />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>{product.price} &#8381;</p>
                <p>
                  <b>Описание:</b>
                  {product.desc}
                </p>
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
                        <b>{basket.cardQuantity}</b>
                      </p>
                      <button className="--btn" onClick={() => addToBasket(product)}>
                        +
                      </button>
                    </>
                  )}
                </div>
                <button onClick={() => addToBasket(product)} className="--btn --btn-primary">
                  Добавить
                </button>
              </div>
            </div>
          </>
        )}
        <Card cardClass={styles.card}>
          <h3>Отзывы о товаре:</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>О данном товаре отзывы на сайте отсуствуют</p>
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
