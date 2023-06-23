import React, { useEffect, useState } from "react";
import classes from "./ProductsDetails.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CARD, CALCULATE_TOTAL_QUANTITY, DECREASE_CARD, selectCardItems } from "../../../redux/slice/cardSlice";
import useFetchDocument from "../../../hook/useFetchDocument";

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
      <div className={`container ${classes.product}`}>
        <h2>Описание товара</h2>
        <div onClick={goBack}>&larr; Вернуться назад</div>
        {product && (
          <>
            <div className={classes.details}>
              <div className={classes.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={classes.content}>
                <h3>{product.name}</h3>
                <p className={classes.price}>{product.price} &#8381;</p>
                <p>{product.desc}</p>
                <p>
                  <b>Индентификатор:</b> {product.id}
                </p>
                <p>
                  <b>Брэнд:</b> {product.brand}
                </p>
                <div className={classes.count}>
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
      </div>
    </section>
  );
};

export default ProductsDetails;
