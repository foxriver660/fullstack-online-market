import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./ProductsItem.module.scss";
import { Card } from "../../index";
import { ADD_TO_BASKET, CALCULATE_TOTAL_QUANTITY } from "../../../redux/slice/basketSlice";
import { shortenText } from "../../../utils/cutText";

const ProductsItem = ({ grid, product, id, name, price, desc, imageURL }) => {
  const dispatch = useDispatch();

  const addToCard = (product) => {
    dispatch(ADD_TO_BASKET(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <Card className={grid ? styles.grid : styles.list}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img className={styles.img} src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{price} ₽</p>
          <h4>{shortenText(name, 15)}</h4>
        </div>
        {!grid && <p className={styles.desc}>{shortenText(desc, 200)}</p>}
        <button type="button" className="--btn --btn-primary" onClick={() => addToCard(product)}>
          Добавить в корзину
        </button>
      </div>
    </Card>
  );
};

export default ProductsItem;
